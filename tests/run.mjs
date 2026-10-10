/**
 * Runs the built system (svnsea2e.mjs) against a small mock of the Foundry v14 API (tests/foundry-mock.mjs)
 * and a jsdom DOM: init/setup/ready hooks, every sheet, the main actions, rolls, toolbox and combat tracker.
 * It checks this system's own logic; it cannot catch differences between the mock and the real Foundry.
 * Run with `npm test`.
 */
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { installMocks } from './foundry-mock.mjs';
const repo = path.resolve(import.meta.dirname, '..');
const { log, hooks, MockRoll, DialogV2, DocumentSheetConfig, settings, tokenActors } = installMocks(repo);
const renderTemplate = (...a) => foundry.applications.handlebars.renderTemplate(...a);
let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) failures++; };
// Let the async work started by document hooks (background bonuses) finish.
const settle = () => new Promise((r) => setTimeout(r, 0));
const raisesOf = (msg) => Number(/>\s*(\d+) raises? -/i.exec(msg.content)?.[1]);

await import(pathToFileURL(`${repo}/svnsea2e.mjs`).href);
await Hooks.callAll('init');
ok(DocumentSheetConfig.registered.length === 20, `20 sheets registered (${DocumentSheetConfig.registered.length})`);
await Hooks.callAll('setup');
ok(CONFIG.SVNSEA2E.skills.aim === 'Aim', 'config localized');
await Hooks.callAll('ready');
ok(settings.get('systemMigrationVersion') === '25.0', `newest migration version stored (${settings.get('systemMigrationVersion')})`);

const make = async (type, data = {}) => { const a = await Actor.create({ name: type, type, ...data }); game.actors.set(a.id, a); return a; };
const sheetClasses = {};
// Collect sheet classes by re-registering: patch registerSheet to keep class refs.
for (const [d, name, type] of DocumentSheetConfig.registered) sheetClasses[`${d}.${type}`] = name;
ok(sheetClasses['Actor.playercharacter'] === 'PlayerCharacterSheet', 'PC sheet class');

// Grab classes through a second registration pass.
const classes = {};
foundry.applications.apps.DocumentSheetConfig.registerSheet = (doc, scope, sheet, cfg) => {
  for (const type of cfg.types) classes[`${doc.name}.${type}`] = sheet;
};
await Hooks.callAll('init');

// ---------- Player character ----------
const pc = await make('playercharacter', { system: { heropts: 2 } });
ok(pc.img === 'systems/svnsea2e/icons/playercharacter.jpg', 'default actor icon');
ok(pc.system.wounds.max === 20 && pc.system.dwounds.max === 4, 'hero wounds 20/4');
const pcSheet = new classes['Actor.playercharacter']({ document: pc });
await pcSheet.render();
ok(pcSheet.element.querySelectorAll('[data-action="tab"]').length === 7, 'pc tabs rendered');
ok(pcSheet.element.querySelector('.tab.traits.active'), 'traits tab active');
ok([...pcSheet.element.querySelectorAll('[data-action="tab"]')].at(-1).dataset.tab === 'effects', 'effects tab last');

// Hard To Kill comes from an active effect: no toggle on the sheet. Saved in the "final" phase on purpose: the
// system keys always apply in the "initial" one, before the maxima are derived.
ok(!pcSheet.element.querySelector('[data-action="toggleHtk"]'), 'no Hard To Kill toggle');
const [htkEffect] = await pc.createEmbeddedDocuments('ActiveEffect', [{ name: 'HtK', system: { changes: [{ key: 'system.htk', type: 'override', value: 'true', phase: 'final' }] } }]);
ok(pc.system.htk && pc.system.wounds.max === 25 && pc.system.dwounds.max === 5 && pc._source.system.htk === false, 'HtK effect → 25/5');
await pcSheet.render();
ok(pcSheet.element.querySelectorAll('[data-type="dwounds"]').length === 5 && pcSheet.element.querySelector('.htk-badge'), '5 dramatic hearts and the HtK badge');

await pcSheet.click('[data-action="setWounds"][data-type="wounds"][data-value="12"]');
ok(pc.system.wounds.value === 12 && pc.system.dwounds.value === 2, 'wounds 12 → dramatic 2');
await pcSheet.render();
await pcSheet.click('[data-action="setWounds"][data-type="dwounds"][data-value="2"]');
ok(pc.system.dwounds.value === 1 && pc.system.wounds.value === 12, 'click current dramatic → -1, normal wounds untouched');
await htkEffect.update({ disabled: true });
ok(!pc.system.htk && pc.system.wounds.max === 20 && pc.system.dwounds.max === 4, 'HtK effect disabled → 20/4');
await htkEffect.delete();

await pcSheet.render();
await pcSheet.click('[data-action="setRank"][data-key="brawn"][data-value="4"]');
ok(pc.system.traits.brawn.value === 4, 'trait set to 4');
await pcSheet.render();
await pcSheet.click('[data-action="setRank"][data-key="brawn"][data-value="1"]');
ok(pc.system.traits.brawn.value === 2, 'hero trait first circle → 2');
await pcSheet.render();
await pcSheet.click('[data-action="setRank"][data-key="aim"][data-value="1"]');
ok(pc.system.skills.aim.value === 1, 'skill aim 1');
await pcSheet.render();
await pcSheet.click('[data-action="setRank"][data-key="aim"][data-value="1"]');
ok(pc.system.skills.aim.value === 0, 'skill aim back to 0');

// Initiative (raises) is not edited from the sheet any more.
ok(!pcSheet.element.querySelector('[data-action^="initiative"], .initiative-input'), 'no initiative controls on the sheet');

// Bounds kept by the data model, whatever writes the value.
await pc.update({ 'system.traits.wits.value': 0, 'system.skills.hide.value': 7 });
ok(pc.system.traits.wits.value === 2 && pc.system.skills.hide.value === 5, 'hero trait never below 2, skill never above 5');
ok(pc.system.traits.wits.max === 5 && pc.system.skills.hide.min === 0 && !('max' in pc._source.system.skills.hide), 'rank bounds are derived, not stored');
await pc.update({ 'system.skills.hide.value': 0 });

// Items
await pcSheet.click('[data-action="createItem"][data-type="advantage"]');
const adv = pc.items.find((i) => i.type === 'advantage');
ok(adv && adv.name === 'New Advantage', `item created (${adv?.name})`);
await pcSheet.render();
await pcSheet.click('[data-action="toggleUsed"]');
ok(adv.system.used === true, 'used toggled');
await pcSheet.render();
await pcSheet.click('[data-action="itemSummary"]');
ok(pcSheet.element.querySelector('.item-summary enriched'), 'summary expanded with enriched description');
await pcSheet.click('[data-action="throwItem"]');
ok(log.chat.at(-1)?.content.includes('New Advantage'), 'item sent to chat');
await pcSheet.click('[data-action="toggleSection"]');
ok(pcSheet.element.querySelector('li.item[data-item-id]').classList.contains('hidden'), 'section collapsed');
await pcSheet.render();
ok(pcSheet.element.querySelector('li.item[data-item-id]').classList.contains('hidden'), 'collapse kept after re-render');

// Dragging an item row
{
  const row = pcSheet.element.querySelector('li.item.draggable');
  let payload;
  const dragEvent = new window.Event('dragstart');
  dragEvent.dataTransfer = { setData: (type, data) => (payload = JSON.parse(data)) };
  row.dispatchEvent(dragEvent);
  ok(row.getAttribute('draggable') === 'true' && payload?.type === 'Item' && payload.uuid.includes(row.dataset.itemId), 'item row drag data');
}

// Background drop with advantages from world items and skills
const worldAdv = await Item.create({ name: 'Linguist', type: 'advantage' }); game.items.set(worldAdv.id, worldAdv);
const bg = await Item.create({ name: 'Sailor', type: 'background', system: { skills: ['sailing', 'athletics'], advantages: ['Linguist', 'Missing One'], nation: 'none' } });
await pcSheet._onDropItem({}, bg);
await settle();
ok(pc.items.some((i) => i.name === 'Linguist'), 'background advantage added');
ok(pc.system.skills.sailing.value === 1 && pc.system.skills.athletics.value === 1, 'background skills +1');
ok(log.notifications.some(([, m]) => m.includes('Missing One')), 'missing advantage notified');
await pcSheet._onDropItem({}, bg);
ok(log.notifications.at(-1)[1].includes('already'), 'duplicate background rejected');
await pcSheet.render();
await pcSheet.click('[data-action="toggleBackground"]');
const pcBg = pc.items.find((i) => i.type === 'background');
ok(!pcBg.system.active && pc.system.skills.sailing.value === 0 && !pc.items.some((i) => i.name === 'Linguist'), 'background deactivated removes bonuses');
await pcSheet.render();
await pcSheet.click('[data-action="toggleBackground"]');
ok(pcBg.system.active && pc.system.skills.sailing.value === 1, 'background reactivated');
await pcSheet.render();
const delIndex = [...pcSheet.element.querySelectorAll('[data-action="deleteItem"]')].findIndex((el) => el.closest('[data-item-id]').dataset.itemId === pcBg.id);
await pcSheet.click('[data-action="deleteItem"]', delIndex);
await settle();
ok(!pc.items.has(pcBg.id) && pc.system.skills.sailing.value === 0 && !pc.items.some((i) => i.name === 'Linguist'), 'deleting an active background removes its bonuses');

// A background only takes back the advantages it created, however it is added or removed.
{
  const [own] = await pc.createEmbeddedDocuments('Item', [{ name: 'Linguist', type: 'advantage' }]);
  const [viaMacro] = await pc.createEmbeddedDocuments('Item', [bg.toObject()]);
  await settle();
  ok(pc.system.skills.sailing.value === 1 && viaMacro.getFlag('svnsea2e', 'tracksGrants'), 'background added by a macro applies its bonuses');
  await viaMacro.delete();
  await settle();
  ok(pc.items.has(own.id) && pc.system.skills.sailing.value === 0, 'the advantage the hero already had is kept');
  // A background applied by v24 has no marks: its advantages go by name, as before.
  const [legacy] = await pc.createEmbeddedDocuments('Item', [{ ...bg.toObject(), system: { ...bg.toObject().system, active: false } }]);
  await legacy.update({ 'system.active': true });
  await pc.deleteEmbeddedDocuments('Item', [legacy.id]);
  await settle();
  ok(!pc.items.has(own.id), 'legacy background removes its advantages by name');
}

// Wrong nation background
pc._source.system.nation = 'castille'; pc.prepareData();
const eisenBg = await Item.create({ name: 'Eisen BG', type: 'background', system: { nation: 'eisen' } });
await pcSheet._onDropItem({}, eisenBg);
ok(log.notifications.at(-1)[1].includes("doesn't match"), 'wrong nation rejected');

// Skill roll: 3 dice of trait + aim 0... set aim to 3 to get reroll
await pc.update({ 'system.skills.aim.value': 3, 'system.traits.brawn.value': 3 });
DialogV2.prefill = (form) => { form.querySelector('[name="useForMe"]').value = '1'; };
MockRoll.next = [10, 4, 6, 3, 2, 9, 1];
await pcSheet.render();
await pcSheet.click('[data-action="rollSkill"][data-label="aim"]');
const msg = log.chat.at(-1);
ok(msg?.rolls?.length === 1 && msg.mode === 'applied', 'roll message with roll attached and message mode applied');
ok(pc.system.heropts === 1, 'hero point spent');
ok(/Aim/.test(msg.flavor), `flavor: ${msg.flavor}`);
DialogV2.prefill = (form) => { form.querySelector('[name="useForMe"]').value = '5'; };
const before = log.chat.length;
await pcSheet.click('[data-action="rollSkill"][data-label="aim"]');
ok(log.chat.length === before && log.notifications.at(-1)[1].includes('hero'), 'not enough hero points blocks roll');
DialogV2.prefill = null;

// Roll engine: a triple [a, b, b] needs two dice of b (it used to count one die twice and drop the last one).
await pc.update({ 'system.skills.aim.value': 4, 'system.traits.brawn.value': 2, 'system.dwounds.value': 0, 'system.wounds.value': 0 });
DialogV2.prefill = (form) => { form.querySelector('[name="trait"]').value = '2'; };
MockRoll.next = [1, 7, 1, 1, 1, 1, 1]; // 6 dice + the rank 3 reroll of a leftover 1
await pcSheet.click('[data-action="rollSkill"][data-label="aim"]');
ok(raisesOf(log.chat.at(-1)) === 1, `1 + 7 alone is no 15 (threshold 15): ${raisesOf(log.chat.at(-1))} raise(s), expected 1 from 7 + 1 + 1 + 1`);
MockRoll.next = [1, 7, 7, 2, 2, 2, 3];
await pcSheet.click('[data-action="rollSkill"][data-label="aim"]');
ok(raisesOf(log.chat.at(-1)) === 2 && log.chat.at(-1).content.includes('1 + 7 + 7'), 'a real 1 + 7 + 7 still counts');

// Joie de Vivre: dice up to the skill rank, before the +1, count as 10s.
await pc.update({ 'system.skills.aim.value': 2 });
DialogV2.prefill = (form) => { form.querySelector('[name="trait"]').value = '2'; form.querySelector('[name="joieDeVivreAdvantage"]').checked = true; form.querySelector('[name="addOneToDice"]').checked = true; };
MockRoll.next = [1, 2, 3, 4];
await pcSheet.click('[data-action="rollSkill"][data-label="aim"]');
ok(raisesOf(log.chat.at(-1)) === 2, `Joie de Vivre with +1: the 1 and the 2 count as 10s (${raisesOf(log.chat.at(-1))})`);
DialogV2.prefill = (form) => { form.querySelector('[name="diceNumber"]').value = '5'; form.querySelector('[name="joieDeVivreAdvantage"]').checked = true; form.querySelector('[name="joieRank"]').value = '1'; };
MockRoll.next = [2, 2, 2, 2, 2];
await pcSheet.click('[data-action="freeRoll"]');
ok(raisesOf(log.chat.at(-1)) === 1, `free roll Joie uses the skill rank asked, not the number of dice (${raisesOf(log.chat.at(-1))})`);
DialogV2.prefill = null;
ok(!(await renderTemplate('systems/svnsea2e/templates/chats/trait-roll-dialog.hbs', { traitmax: 2 })).includes('joieDeVivre'), 'no Joie de Vivre on trait rolls');

// Hero points are only spent when there is something to roll.
await pc.update({ 'system.heropts': 1 });
DialogV2.prefill = (form) => { form.querySelector('[name="trait"]').value = '2'; form.querySelector('[name="bonusDice"]').value = '-10'; form.querySelector('[name="useForMe"]').value = '1'; };
await pcSheet.click('[data-action="rollSkill"][data-label="aim"]');
ok(pc.system.heropts === 1 && log.notifications.at(-1)[1].includes('no dice'), 'no hero point spent on an empty pool');
DialogV2.prefill = null;

// Trait rolls of heroes explode from the third dramatic wound too.
await pc.update({ 'system.dwounds.value': 3 });
MockRoll.next = [1, 1, 1];
await pcSheet.click('[data-action="rollTrait"][data-label="panache"]');
ok(log.chat.at(-1).rolls[0].formula === '3d10x', `hero trait roll explodes at 3 dramatic wounds (${log.chat.at(-1).rolls[0].formula})`);
await pc.update({ 'system.dwounds.value': 1, 'system.traits.brawn.value': 3 });

// Trait roll & free roll
MockRoll.next = [5, 5, 5];
await pcSheet.click('[data-action="rollTrait"][data-label="brawn"]');
ok(/>\s*2 raises - 0 unused/.test(log.chat.at(-1).content) && log.chat.at(-1).rolls[0].formula === '4d10', 'trait roll: 3 trait + 1 wound die = 4×5 → 2 raises, 0 unused');
DialogV2.prefill = (form) => { form.querySelector('[name="diceNumber"]').value = '2'; };
MockRoll.next = [10, 10, 3];
await pcSheet.click('[data-action="freeRoll"]');
ok(log.chat.at(-1).flavor === 'Generic Roll', 'free roll title');
DialogV2.prefill = null;

// Chat "add to initiative" button
const card = document.createElement('div'); card.innerHTML = log.chat.at(-1).content; document.body.append(card);
card.querySelector('.initiative-tracker-add').click();
await new Promise((r) => setTimeout(r, 10));
ok(pc.system.initiative === Number(card.querySelector('.initiative-tracker-add').dataset.raise), 'chat button sets initiative');

// ---------- Roll messages (v25): the roll is kept in the message and "Edit Roll" counts it again ----------
{
  await pc.update({ 'system.skills.aim.value': 2, 'system.traits.brawn.value': 3, 'system.dwounds.value': 1, 'system.heropts': 1 });
  const D = [9, 4, 6, 3, 2, 5];
  const roll = async (prefill) => {
    DialogV2.prefill = (form) => { form.querySelector('[name="trait"]').value = '3'; prefill?.(form); };
    MockRoll.next = [...D];
    await pcSheet.click('[data-action="rollSkill"][data-label="aim"]');
    DialogV2.prefill = null;
    return log.chat.at(-1);
  };
  const edit = async (message, prefill, next = []) => {
    MockRoll.next = [...next];
    DialogV2.prefill = prefill;
    const result = await game.svnsea2e.rolls.editRoll(message);
    DialogV2.prefill = null;
    return result;
  };
  const summary = (m) => { const r = m.system.resolve(); return `${r.raises}|${r.combos.join(',')}|${r.unused.join(',')}`; };
  const msg = await roll();
  const s = msg.system;
  ok(msg.type === 'roll' && s.kind === 'skill' && s.pool.trait === 3 && s.pool.skill === 2 && s.pool.wound === 1 && s.threshold === 10, 'roll message keeps the pool');
  ok(s.dice.join() === D.join() && s.explosions.length === 0 && s.rerollFace === null && s.joieRank === 2, `roll message keeps the dice (${s.dice})`);
  ok(raisesOf(msg) === 2 && summary(msg) === '2|4 + 6,2 + 3 + 5|9', `card drawn from the data (${summary(msg)})`);

  // +1 after the roll: the same raises as a roll made with +1.
  const withOne = await roll((form) => { form.querySelector('[name="addOneToDice"]').checked = true; });
  await edit(msg, (form) => { form.elements.addOne.checked = true; });
  ok(msg.system.addOne && summary(msg) === summary(withOne) && raisesOf(msg) === raisesOf(withOne), `edited +1 = rolled with +1 (${summary(msg)})`);
  ok(msg.rolls.length === 1 && msg.system.dice.join() === D.join() && msg.system.edited && msg.content.includes('Roll edited'), 'nothing rolled again, marked as edited');
  ok(!log.updates.at(-1)[1].rolls, 'no rolls added: Dice So Nice does not animate');

  // Threshold 15: 6 + 9 (2 raises), then 2 + 3 + 5 at 10 (1 raise), 4 left.
  await edit(msg, (form) => { form.elements.addOne.checked = false; form.elements.threshold.value = '15'; });
  ok(summary(msg) === '3|6 + 9,2 + 3 + 5|4' && msg.content.includes('Raise threshold: 15'), `edited threshold 15 (${summary(msg)})`);
  await edit(msg, (form) => { form.elements.threshold.value = '10'; });

  // Adding dice rolls only the new ones and keeps the others.
  await edit(msg, (form) => { form.elements.bonus.value = '2'; }, [10, 1]);
  ok(msg.system.dice.join() === [...D, 10, 1].join() && msg.rolls.length === 2 && JSON.parse(msg.rolls[1]).formula === '2d10', 'two dice added, only they are rolled and attached');
  ok(summary(msg) === '4|10,1 + 9,4 + 6,2 + 3 + 5|', `added dice counted (${summary(msg)})`);
  await edit(msg, (form) => { form.elements.bonus.value = '0'; form.elements.trait.value = '2'; });
  ok(msg.system.dice.join() === D.slice(0, 5).join() && msg.rolls.length === 2, 'fewer dice: the last ones are dropped, nothing rolled');

  // Explosions: a 10 explodes once 10s explode; the explosion is dropped when they stop exploding.
  await edit(msg, (form) => { form.elements.trait.value = '3'; form.elements.bonus.value = '1'; }, [10]);
  await edit(msg, (form) => { form.elements.explode.checked = true; }, [10, 7]);
  ok(msg.system.explosions.join() === '10,7' && msg.content.includes('+2 exploded dice'), `10s explode, explosions roll on (${msg.system.explosions})`);
  await edit(msg, (form) => { form.elements.explode.checked = false; });
  ok(msg.system.explosions.length === 0 && !msg.content.includes('exploded'), 'no explosions once 10s do not explode');

  // Rank 3 reroll: the lowest leftover die is rolled again once, and the face is kept by later edits.
  await edit(msg, (form) => { form.elements.bonus.value = '0'; form.elements.reroll.checked = true; }, [8]);
  ok(msg.system.rerollFace === 8 && msg.content.includes('Rerolled 2 and got 8'), `reroll rolled (${msg.system.rerollFace})`);
  const rollsBefore = msg.rolls.length;
  await edit(msg, (form) => { form.elements.addOne.checked = true; });
  ok(msg.system.rerollFace === 8 && msg.rolls.length === rollsBefore, 'reroll kept, nothing rolled');
  await edit(msg, (form) => { form.elements.addOne.checked = false; form.elements.reroll.checked = false; });
  ok(msg.system.rerollFace === null, 'reroll dropped');

  // Joie de Vivre: the dice that counted as 10 are marked on the card.
  await edit(msg, (form) => { form.elements.joieDeVivre.checked = true; });
  const joieCard = document.createElement('div'); joieCard.innerHTML = msg.content;
  ok([...joieCard.querySelectorAll('.die.joie')].map((li) => li.textContent.trim()).join() === '2' && msg.content.includes('dice of 2 or less count as 10'), 'Joie de Vivre dice marked on the card');
  ok(raisesOf(msg) === msg.system.resolve().raises, 'card and data agree');

  // Hero points for the hero's own dice are spent or given back.
  await edit(msg, (form) => { form.elements.heroPoints.value = '1'; }, [3]);
  ok(pc.system.heropts === 0 && msg.system.pool.heroPoints === 1 && msg.system.dice.length === 7, 'hero point spent by the edit, its die rolled');
  const before = msg.system.toObject();
  await edit(msg, (form) => { form.elements.heroPoints.value = '2'; });
  ok(pc.system.heropts === 0 && msg.system.pool.heroPoints === 1 && log.notifications.at(-1)[1].includes('hero'), 'not enough hero points: nothing changes');
  await edit(msg, (form) => { form.elements.heroPoints.value = '0'; });
  ok(pc.system.heropts === 1 && msg.system.dice.length === 6, 'hero point given back');
  await edit(msg, (form) => { form.elements.trait.value = '0'; form.elements.skill.value = '0'; form.elements.wound.value = '0'; });
  ok(log.notifications.at(-1)[1].includes('no dice') && msg.system.pool.trait === before.pool.trait, 'an empty pool is refused');

  // "Edit Roll" in the context menu: author and GM only, and only for v25 roll messages.
  const menu = [];
  await Hooks.callAll('getChatMessageContextOptions', {}, menu);
  const option = menu.find((o) => o.label === 'SVNSEA2E.EditRoll');
  const li = (m) => ({ dataset: { messageId: m.id } });
  const oldMessage = await ChatMessage.create({ author: game.user.id, content: '<div>v24 card</div>', rolls: [{}] });
  ok(option?.visible(li(msg)) && !option.visible(li(oldMessage)), 'Edit Roll shown for roll messages only');
  const gm = game.user;
  game.user = { id: 'player2', isGM: false };
  ok(!option.visible(li(msg)) && (await game.svnsea2e.rolls.editRoll(msg)) === false, 'another player cannot edit the roll');
  game.user = { id: gm.id, isGM: false };
  ok(option.visible(li(msg)), 'its author can');
  msg.blind = true;
  ok(!option.visible(li(msg)), 'not while the author cannot see it (blind roll)');
  msg.blind = false;
  game.user = gm;

  // Free roll: its dice are bonus dice, without wound die.
  DialogV2.prefill = (form) => { form.querySelector('[name="diceNumber"]').value = '3'; };
  MockRoll.next = [1, 2, 3];
  await pcSheet.click('[data-action="freeRoll"]');
  DialogV2.prefill = null;
  const free = log.chat.at(-1);
  ok(free.system.kind === 'free' && free.system.pool.bonus === 3 && free.system.pool.wound === 0, 'free roll stored');
  await edit(free, (form) => { form.elements.bonus.value = '4'; }, [4]);
  ok(free.system.dice.join() === '1,2,3,4' && raisesOf(free) === 1, `free roll edited with one more die (${raisesOf(free)})`);
}

// Languages selector
await pcSheet.click('[data-action="selectLanguages"]');

// ---------- Villain ----------
const villain = await make('villain');
ok(villain.system.wounds.max === 24 && villain.system.villainy === 10, `villain derived (${villain.system.wounds.max}, ${villain.system.villainy})`);
const vSheet = new classes['Actor.villain']({ document: villain });
await villain.createEmbeddedDocuments('ActiveEffect', [{ name: 'HtK', system: { changes: [{ key: 'system.htk', type: 'override', value: 'true' }] } }]);
ok(villain.system.dwounds.max === 5 && villain.system.wounds.max === 30, 'villain HtK effect 30/5');
await vSheet.render();
await vSheet.render();
await vSheet.click('[data-action="setWounds"][data-type="wounds"][data-value="13"]');
ok(villain.system.dwounds.value === 2, 'villain group size 6');
await vSheet.render();
MockRoll.next = [10, 10, 10, 10, 10, 1, 1, 1, 1, 1, 1];
await vSheet.click('[data-action="rollTrait"][data-label="strength"]');
ok(log.chat.at(-1).rolls[0].formula === '6d10', `villain roll formula ${log.chat.at(-1).rolls[0].formula} (5 strength + 1 wound die, no explode below 3 dramatic)`);

ok(vSheet.element.querySelector('[name="system.servants"]') && 'redemption' in villain.system, 'villain servants shown, redemption kept');

// ---------- Monster, Brute, Hero, Ship, Danger points ----------
const monster = await make('monster');
ok(!('influence' in monster.system.traits) && monster.system.villainy === 5 && monster.system.wounds.max === 24, 'monster: no influence, villainy = strength, 6 × 4 wounds');
ok('concept' in monster.system && 'nation' in monster.system, 'monster keeps its concept tab data');
const mSheet = new classes['Actor.monster']({ document: monster }); await mSheet.render();
await mSheet.click('[data-action="setRank"][data-key="fear"][data-value="3"]');
ok(monster.system.fear.value === 3, 'monster fear');
const brute = await make('brute');
const bSheet = new classes['Actor.brute']({ document: brute }); await bSheet.render();
ok(bSheet.element.querySelectorAll('[data-action="setWounds"]').length === 5, 'brute 5 wounds');
await bSheet.click('[data-action="setWounds"][data-value="3"]');
ok(brute.system.wounds.value === 3, 'brute wounds');
const hero = await make('hero');
const hSheet = new classes['Actor.hero']({ document: hero }); await hSheet.render();
ok(hSheet.element.querySelectorAll('[data-action="rollSkill"]').length === 16, 'hero skills');
const dp = await make('dangerpts');
const dSheet = new classes['Actor.dangerpts']({ document: dp }); await dSheet.render();
await dSheet.click('[data-action="adjustPoints"][data-delta="2"]');
ok(dp.system.points === 7, 'danger points +2');
await dSheet.click('[data-action="adjustPoints"][data-delta="-2"]');
await dSheet.click('[data-action="adjustPoints"][data-delta="-2"]');
await dSheet.click('[data-action="adjustPoints"][data-delta="-2"]');
await dSheet.click('[data-action="adjustPoints"][data-delta="-2"]');
ok(dp.system.points === 0, 'danger points floor 0');

const ship = await make('ship');
const sSheet = new classes['Actor.ship']({ document: ship }); await sSheet.render();
const header = sSheet.element.querySelector('[data-role="captain"] h3');
ok(ship.system.wounds.max === 20 && ship.system.dwounds.max === 4 && !('htk' in ship.system), 'ship wounds 20/4, never Hard To Kill');
await sSheet._onDropActor({ target: header }, pc);
ok(ship.system.crew.length === 1 && ship.system.crew[0].actorId === pc.id && ship.system.crew[0].role === 'captain', 'crew added as captain');
await sSheet._onDropActor({ target: sSheet.element.querySelector('[data-role="cook"] h3') }, pc);
ok(ship.system.crew.length === 1 && ship.system.crew[0].role === 'cook', 'dropping again changes the role');
await sSheet.render();
ok(sSheet.element.querySelector(`[data-role="cook"] ~ [data-actor-id="${pc.id}"]`), 'crew row rendered');
ok([...sSheet.element.querySelectorAll('[data-role]')].map((e) => e.dataset.role).join() === Object.keys(CONFIG.SVNSEA2E.crewRoles).join(), 'roster in role order');
await sSheet.click('[data-action="removeCrew"]');
ok(ship.system.crew.length === 0, 'crew removed');

// ---------- Items ----------
const itemFields = { artifact: 'system.artifactType', background: 'system.nation', scheme: 'system.influence.value', secretsociety: 'system.favor', sorcery: 'system.sorcsubcat', story: 'system.status' };
const itemTabs = { advantage: 3, background: 4, duelstyle: 3, secretsociety: 5, story: 5 };
for (const type of ['advantage', 'artifact', 'background', 'duelstyle', 'monsterquality', 'scheme', 'secretsociety', 'shipadventure', 'shipbackground', 'sorcery', 'story', 'virtue', 'hubris']) {
  const item = await Item.create({ name: type, type });
  const sheet = new classes[`Item.${type}`]({ document: item });
  await sheet.render();
  ok(sheet.element.querySelector('prose-mirror[name="system.description"]') && sheet.element.querySelector('.tab.description.active'), `item sheet ${type}`);
  const tabs = [...sheet.element.querySelectorAll('[data-action="tab"]')].map((t) => t.dataset.tab);
  ok(tabs.length === (itemTabs[type] ?? 2) && tabs.at(-1) === 'effects' && sheet.element.querySelector('.tab.effects[data-tab="effects"]'), `item sheet ${type}: ${tabs.join(', ')}`);
  if (itemFields[type]) ok(sheet.element.querySelector(`.header-fields [name="${itemFields[type]}"]`), `item sheet ${type}: header fields`);
  const data = await item.getChatData();
  ok(typeof data.metadatahtml === 'string', `chat data ${type}`);
}
const scheme = await Item.create({ name: 's', type: 'scheme', system: { influence: { value: 7, min: 0, max: 40 } } });
ok((await scheme.getChatData()).metadatahtml.includes('7'), 'scheme influence in chat');
ok((await Item.create({ name: 's2', type: 'scheme', system: { influence: { value: 55 } } })).system.influence.value === 40, 'scheme influence up to 40');
const society = await Item.create({ name: 'ss', type: 'secretsociety', system: { favor: '<p>2</p>', callupon: '<p>call</p>' } });
ok(society.system.favor === 2 && (await Item.create({ name: 'ss2', type: 'secretsociety', system: { favor: '' } })).system.favor === 0, 'favor text becomes a number');
ok((await society.getChatData()).callupon.startsWith('<enriched>'), 'use favor is enriched in chat');
ok((await Item.create({ name: 'a', type: 'advantage', system: { cost: { normal: 1.6, reducecost: -1 } } })).system.cost.normal === 2, 'advantage cost is a whole number');
{
  const sheet = new classes['Item.advantage']({ document: await Item.create({ name: 'adv', type: 'advantage' }) });
  await sheet.render();
  ok(sheet.element.querySelector('.tab.attributes [name="system.cost.normal"]'), 'advantage attributes tab');
  const bgSheet = new classes['Item.background']({ document: await Item.create({ name: 'bg', type: 'background' }) });
  await bgSheet.render();
  ok(bgSheet.element.querySelector('.tab.details [data-action="selectSkills"]') && bgSheet.element.querySelector('.tab.quirk prose-mirror[name="system.quirk"]'), 'background details and quirk tabs');
  const wide = new classes['Item.secretsociety']({ document: await Item.create({ name: 'ss3', type: 'secretsociety' }) });
  ok(wide.options.position.width === 800 && sheet.options.position.width === 600, 'secret society sheet is wider');
}

// ---------- Active effects ----------
{
  const fx = await make('playercharacter', { name: 'Effects' });
  const fxSheet = new classes['Actor.playercharacter']({ document: fx });
  await fxSheet.render();
  ok(fxSheet.element.querySelectorAll('.tab.effects .item-header').length === 4, 'effects tab: temporary, passive, inactive, from items');

  // Effects of the actor: created from each section, toggled, deleted.
  await fxSheet.click('[data-action="createEffect"][data-section="temporary"]');
  await fxSheet.click('[data-action="createEffect"][data-section="inactive"]');
  const [temporary, inactive] = fx.effects.contents;
  ok(temporary.isTemporary && temporary.active && inactive.disabled && log.updates.some(([k, n]) => k === 'effectSheet' && n === 'New Effect'), 'effects created from the sections, sheet opened');
  await fxSheet.render();
  ok(fxSheet.element.querySelector(`[data-section="temporary"] ~ [data-effect-id="${temporary.id}"]`), 'temporary effect listed');
  await fxSheet.click(`[data-effect-id="${inactive.id}"] [data-action="toggleEffect"]`);
  ok(!inactive.disabled, 'effect enabled from the sheet');
  await fxSheet.click(`[data-effect-id="${temporary.id}"] [data-action="deleteEffect"]`);
  await fxSheet.click(`[data-effect-id="${inactive.id}"] [data-action="deleteEffect"]`);
  ok(fx.effects.size === 0, 'effects deleted from the sheet');

  // An advantage transfers its effects: +1 Aim (the rank stays within its bounds) and 2 extra dice on Aim rolls.
  await fx.update({ 'system.skills.aim.value': 2 });
  const advantage = await Item.create({ name: 'Sharpshooter', type: 'advantage' });
  await advantage.createEmbeddedDocuments('ActiveEffect', [{ name: 'Keen eye', system: { changes: [
    { key: 'system.skills.aim.value', type: 'add', value: '1' },
    { key: 'system.rollBonus.skills.aim', type: 'add', value: '2' },
    { key: 'system.rollBonus.addOne', type: 'override', value: 'true' },
  ] } }]);
  await fxSheet._onDropItem({}, advantage);
  const owned = fx.items.find((i) => i.name === 'Sharpshooter');
  ok(owned.effects.size === 1 && fx.system.skills.aim.value === 3 && fx._source.system.skills.aim.value === 2, 'item effect transferred: Aim 2 + 1');
  ok(fx.system.rollBonus.skills.aim === 2 && fx.system.rollBonus.addOne && fx.system.rollBonus.dice === 0, 'roll bonuses from the effect');
  await fxSheet.render();
  const aimCircles = fxSheet.element.querySelector('[data-key="aim"]').closest('.rank-circles');
  ok(aimCircles.classList.contains('locked') && !aimCircles.querySelector('[data-action]'), 'a rank changed by an effect is shown but not clickable');
  const inherited = fxSheet.element.querySelector(`.effect.inherited[data-item-id="${owned.id}"]`);
  ok(inherited?.textContent.includes('Sharpshooter') && inherited.textContent.includes('Skill: Aim +1') && !inherited.querySelector('[data-action="deleteEffect"], [data-action="toggleEffect"]'), 'inherited effect: source item, changes, no delete');
  await fxSheet.click(`.effect.inherited [data-action="openEffectSource"]`);
  ok(owned.sheet.tabGroups.primary === 'effects' && log.updates.at(-1)[0] === 'sheet', 'inherited effect opens its item on the effects tab');

  // The roll dialog starts with the extra dice and options of the effects.
  MockRoll.next = [1, 1, 1, 1, 1, 1, 1, 1];
  await fxSheet.click('[data-action="rollSkill"][data-label="aim"]');
  const dialog = log.dialogs.at(-1).content;
  ok(/name="bonusDice" value="2"/.test(dialog) && /name="addOneToDice" value="1" checked/.test(dialog) && dialog.includes('From effects: Keen eye'), 'skill dialog filled by the effects');
  ok(log.chat.at(-1).rolls[0].formula === '7d10', `Aim 3 + Brawn 2 + 2 extra dice (${log.chat.at(-1).rolls[0].formula})`);
  await fxSheet.click('[data-action="rollTrait"][data-label="wits"]');
  ok(/name="bonusDice" value="0"/.test(log.dialogs.at(-1).content), 'Aim dice are not added to other rolls');

  // A background adds +1 to the stored rank, not to the one raised by the effect.
  const sailor = await Item.create({ name: 'Marksman', type: 'background', system: { skills: ['aim'], nation: 'none' } });
  await fxSheet._onDropItem({}, sailor);
  await settle();
  ok(fx._source.system.skills.aim.value === 3 && fx.system.skills.aim.value === 4, 'background +1 on the stored rank');

  // Effects of an inactive background are suppressed.
  const fxBg = fx.items.find((i) => i.type === 'background');
  await fxBg.createEmbeddedDocuments('ActiveEffect', [{ name: 'Sea legs', system: { changes: [{ key: 'system.rollBonus.dice', type: 'add', value: '1' }] } }]);
  ok(fx.system.rollBonus.dice === 1, 'active background effect applies');
  await fx.toggleBackground(fxBg);
  ok(fx.system.rollBonus.dice === 0 && fxBg.effects.contents[0].isSuppressed, 'inactive background effect suppressed');

  // Deleting the advantage takes its effect away.
  await owned.delete();
  ok(fx.system.skills.aim.value === 2 && !fx.system.rollBonus.addOne, 'effect gone with its item');
}

// ---------- Toolbox ----------
const tb = game.svnsea2e.toolbox;
await tb.render();
const dropZone = tb.element.querySelector('.items');
const ev = new window.Event('drop', { cancelable: true }); ev._data = { type: 'Actor', uuid: pc.uuid };
dropZone.dispatchEvent(ev);
await new Promise((r) => setTimeout(r, 20));
ok(settings.get('toolboxActors').includes(pc.uuid), 'toolbox stores dropped actor');
await tb.render();
ok(tb.element.textContent.includes(pc.name), 'toolbox lists actor');
const pcWounds = pc.system.wounds.value;
await tb.click('[data-action="adjust"][data-key="wounds"][data-delta="1"]');
ok(pc.system.wounds.value === pcWounds + 1, 'toolbox +1 wound');
await tb.click('[data-action="adjust"][data-key="heropts"][data-delta="-1"]');
ok(pc.system.heropts >= 0, 'toolbox -1 never below 0');
DialogV2.prefill = (form) => { form.elements.raises.checked = false; };
await tb.options.actions.configure.call(tb); // a window header control, not in the rendered part
DialogV2.prefill = null;
await tb.render();
ok(settings.get('toolboxColumns').raises === false && !tb.element.querySelector('[data-key="raises"]'), 'toolbox hides a column');
await tb.click('[data-action="removeActor"]');
ok(settings.get('toolboxActors').length === 0, 'toolbox remove');

// ---------- Action sequence: raises in the combat tracker ----------
{
  const boss = await make('villain', { name: 'Boss' });
  // Two unlinked tokens of the same villain: same actor id, an actor and a combatant each.
  const tokenOf = (tokenId) => {
    const actor = new CONFIG.Actor.documentClass({ ...boss.toObject(), _id: boss.id });
    actor._token = { id: tokenId };
    actor.prepareData();
    tokenActors.set(tokenId, actor);
    return actor;
  };
  const t1 = tokenOf('tok1');
  const t2 = tokenOf('tok2');
  const ana = await make('hero', { name: 'Ana' });
  await pc.update({ 'system.initiative': 0, 'system.dwounds.value': 0, 'system.heropts': 0 });
  game.combats.clear();
  const combat = new CONFIG.Combat.documentClass({ combatants: [{ actor: pc }, { actor: t1 }, { actor: t2 }, { actor: ana }] });
  game.combats.set(combat.id, combat);
  const of = (actor) => combat.combatants.find((c) => c.actor === actor);
  const free = async (actor, faces) => {
    MockRoll.next = [...faces];
    await game.svnsea2e.rolls.rollDicePool({ actor, rolldata: { skilldice: faces.length, threshold: 10 }, options: {}, title: 'Test', kind: 'skill' });
    return log.chat.at(-1);
  };
  const edit = async (message, extra, next) => {
    MockRoll.next = [...next];
    DialogV2.prefill = (form) => { form.elements.skill.value = String(Number(form.elements.skill.value) + extra); };
    await game.svnsea2e.rolls.editRoll(message);
    DialogV2.prefill = null;
  };

  // The approaches are rolled before the GM begins the combat (round 0).
  const pcRoll = await free(pc, [5, 5, 5, 5]);
  ok(of(pc).initiative === 2 && pc.system.initiative === 2, 'first roll fills the tracker and the actor');
  await free(t1, [10, 10, 10]);
  const t2Roll = await free(t2, [5, 5]);
  ok(of(t1).initiative === 3 && of(t2).initiative === 1, `unlinked tokens keep their own raises (${of(t1).initiative}, ${of(t2).initiative})`);
  ok(t1.system.initiative === 3 && t2.system.initiative === 1 && boss.system.initiative === 0, 'each token actor mirrors its raises, the base actor untouched');
  ok(pcRoll.content.includes(`data-actor="${pc.uuid}"`) && t2Roll.content.includes(`data-actor="${t2.uuid}"`), 'cards keep the actor UUID');

  await combat.update({ round: 1, turn: 0 });
  const pcSecond = await free(pc, [10, 10]);
  ok(of(pc).initiative === 2, 'a second roll in the round does not overwrite the raises');

  // Villains act first on ties.
  await free(ana, [5, 5, 5, 5, 5, 5]);
  ok(combat.turns.map((c) => c.name).join() === 'Boss,Ana,playercharacter,Boss', `tie: villain first (${combat.turns.map((c) => `${c.name}:${c.initiative}`)})`);
  ok(combat.combatant === of(t1), 'turn on the first combatant');

  // Tracker: +1 / -1 buttons, no d20 buttons, a dash without raises.
  const tracker = document.createElement('div');
  tracker.innerHTML = '<div class="control-buttons"><button data-action="rollAll"></button><button data-action="rollNPC"></button></div>' +
    combat.turns.map((c) => `<li class="combatant" data-combatant-id="${c.id}"><div class="token-initiative"><input class="initiative-input" value="${c.initiative}"></div></li>`).join('') +
    '<li class="combatant" data-combatant-id="none"><div class="token-initiative"><button data-action="rollInitiative"></button></div></li>';
  await Hooks.callAll('renderCombatTracker', { viewed: combat }, tracker);
  ok(!tracker.querySelector('[data-action="rollAll"], [data-action="rollNPC"], [data-action="rollInitiative"]') && tracker.querySelectorAll('.spacer').length === 2, 'd20 initiative buttons removed');
  ok(tracker.querySelectorAll('.combat-btn').length === 8 && tracker.querySelectorAll('.no-raises').length === 1, 'raise buttons added, dash without raises');
  const button = (actor, kind) => tracker.querySelector(`[data-combatant-id="${of(actor).id}"] .combat-btn.${kind}`);
  button(t1, 'sub').click(); await settle();
  button(t1, 'sub').click(); await settle();
  ok(of(t1).initiative === 1 && t1.system.initiative === 1 && of(t2).initiative === 1, 'tracker -1 changes that token only');
  ok(combat.combatant === of(t1) && combat.turns.indexOf(of(t1)) === combat.turn && combat.turn !== 0, `the turn stays on the combatant spending raises (turn ${combat.turn})`);
  button(pc, 'add').click(); await settle();
  ok(of(pc).initiative === 3 && pc.system.initiative === 3, 'tracker +1 updates combatant and actor');
  await of(ana).update({ initiative: 0 }); // the tracker's own field, as the GM types in it
  ok(combat.combatant === of(t1) && ana.system.initiative === 0, `a change from the tracker field keeps the turn and the copy (turn ${combat.turn})`);
  const options = [{ label: 'COMBATANT.ACTIONS.Update' }, { label: 'COMBATANT.ACTIONS.Reroll' }];
  await Hooks.callAll('getCombatTrackerContextOptions', {}, options);
  ok(options.length === 1 && options[0].label === 'COMBATANT.ACTIONS.Update', 'no "Reroll Initiative" in the context menu');
  ok((await combat.rollInitiative(['x'])) === combat, 'd20 initiative never rolled');

  // Editing the roll that set the raises adds the difference; editing another roll changes nothing.
  await edit(pcRoll, 2, [5, 5]);
  ok(pcRoll.system.resolve().raises === 3 && of(pc).initiative === 4 && pc.system.initiative === 4, `edit adds the new raises to what is left (${of(pc).initiative})`);
  await edit(pcSecond, 2, [10, 10]);
  ok(of(pc).initiative === 4, 'editing a later roll does not touch the tracker');
  await edit(t2Roll, 2, [5, 5]);
  ok(of(t2).initiative === 2 && of(t1).initiative === 1 && t2.system.initiative === 2, 'edit of an unlinked token roll changes that token only');

  // The card button sets the raises on purpose, and its later edits are followed.
  const card = document.createElement('div');
  card.dataset.messageId = pcSecond.id;
  card.innerHTML = pcSecond.content;
  document.body.append(card);
  card.querySelector('.initiative-tracker-add').click(); await settle();
  ok(of(pc).initiative === 4 && of(pc).raisesRoll.message === pcSecond.id, `card button sets the raises of that roll (${of(pc).initiative})`);
  card.remove();
  await game.svnsea2e.updateInitiative(t1, 5);
  ok(of(t1).initiative === 5 && of(t2).initiative === 2, 'toolbox raises of a token actor');

  // A new round clears the raises; the first roll sets them again.
  await combat.nextRound();
  await settle();
  ok(combat.combatants.contents.every((c) => c.initiative === null) && pc.system.initiative === 0 && t1.system.initiative === 0, 'new round clears the raises');
  await free(t2, [5, 5]);
  await free(pc, [5, 5, 5, 5]);
  ok(of(pc).initiative === 2 && combat.combatant === of(pc), `first roll of the new round sets them again, the turn on the most raises (${combat.combatant?.name})`);
  await combat.previousRound();
  ok(of(pc).initiative === 2, 'going back a round clears nothing');
  game.combats.clear();
  tokenActors.clear();
}

// ---------- Migration to v25: ship crew flags → system.crew ----------
{
  const oldShip = await make('ship', { flags: { svnsea2e: { shipsCrew: { members: [pc.id, villain.id, 'gone'] } } } });
  await pc.setFlag('svnsea2e', 'crewMember', { shipId: oldShip.id, role: 'surgeon' });
  await villain.setFlag('svnsea2e', 'crewMember', { shipId: oldShip.id, role: 'seaman' });
  await settings.set('systemMigrationVersion', '24.0');
  await game.svnsea2e.migrations.migrateWorldIfNeeded();
  const crew = oldShip.system.crew.map((m) => `${m.actorId}:${m.role}`).join();
  ok(crew === `${pc.id}:surgeon,${villain.id}:seaman`, `crew migrated (${crew})`);
  ok(!oldShip.getFlag('svnsea2e', 'shipsCrew') && !pc.getFlag('svnsea2e', 'crewMember'), 'old crew flags removed');
  ok(settings.get('systemMigrationVersion') === '25.0', 'migration recorded');
  await oldShip.update({ 'system.crew': [] });
  await game.svnsea2e.migrations.migrateWorldIfNeeded();
  ok(oldShip.system.crew.length === 0, 'migration runs once');
}

// ---------- Migration to v25: Hard To Kill toggle → active effect ----------
{
  const htkEffects = (doc) => doc.effects.filter((e) => e.system.changes.some((c) => c.key === 'system.htk'));
  const withAdvantage = await make('playercharacter', { name: 'Tough', system: { htk: true } });
  await withAdvantage.createEmbeddedDocuments('Item', [{ name: 'Duro de Matar', type: 'advantage' }]);
  const withoutAdvantage = await make('villain', { name: 'Brute force', system: { htk: true } });
  const toggleOff = await make('hero', { name: 'Unsure' });
  await toggleOff.createEmbeddedDocuments('Item', [{ name: 'Hard To Kill', type: 'advantage' }]);
  const worldAdvantage = await Item.create({ name: 'Hard to kill ', type: 'advantage' }); game.items.set(worldAdvantage.id, worldAdvantage);
  // An unlinked token whose own data turned Hard To Kill on.
  const tokenActor = await make('villain', { name: 'Token' });
  tokenActor._token = { delta: { _source: { system: { htk: true } } } };
  tokenActor._source.system.htk = true; tokenActor.prepareData();
  game.actors.delete(tokenActor.id);
  game.scenes.set('scene', { tokens: [{ actorLink: false, actor: tokenActor }] });
  ok(withAdvantage.system.dwounds.max === 5 && withoutAdvantage.system.wounds.max === 30, 'v24 Hard To Kill toggles on');

  await settings.set('systemMigrationVersion', '24.0');
  await game.svnsea2e.migrations.migrateWorldIfNeeded();
  const advantage = withAdvantage.items.find((i) => i.type === 'advantage');
  ok(htkEffects(advantage).length === 1 && htkEffects(withAdvantage).length === 0 && withAdvantage._source.system.htk === false, 'effect on the Hard To Kill advantage, stored htk false');
  ok(withAdvantage.system.dwounds.max === 5 && withAdvantage.system.wounds.max === 25, 'hero keeps 5 dramatic wounds');
  ok(htkEffects(withoutAdvantage).length === 1 && withoutAdvantage.system.wounds.max === 30 && withoutAdvantage.system.dwounds.max === 5, 'villain without the advantage: effect on the actor, still 30/5');
  ok(htkEffects(withoutAdvantage)[0].name === 'Hard To Kill', 'effect named after the advantage');
  await htkEffects(withoutAdvantage)[0].update({ disabled: true });
  ok(withoutAdvantage.system.dwounds.max === 4 && withoutAdvantage.system.wounds.max === 24, 'effect disabled → back to 4 dramatic wounds');
  const offEffect = htkEffects(toggleOff.items.contents[0])[0];
  ok(offEffect?.disabled && toggleOff.system.dwounds.max === 4, 'advantage without the toggle on: disabled effect, wounds unchanged');
  ok(htkEffects(worldAdvantage).length === 1 && !htkEffects(worldAdvantage)[0].disabled, 'world advantage gets the effect');
  ok(htkEffects(tokenActor).length === 1 && tokenActor._source.system.htk === false && tokenActor.system.dwounds.max === 5, 'unlinked token actor migrated');
  await settings.set('systemMigrationVersion', '24.0');
  await game.svnsea2e.migrations.migrateWorldIfNeeded();
  ok(htkEffects(advantage).length === 1 && htkEffects(worldAdvantage).length === 1 && htkEffects(toggleOff.items.contents[0]).length === 1, 'running it again adds nothing');
  game.scenes.clear();
}

// Actor directory button
const dir = document.createElement('div'); dir.innerHTML = '<div class="directory-header"><search></search></div>';
await Hooks.callAll('renderActorDirectory', {}, dir);
await Hooks.callAll('renderActorDirectory', {}, dir);
ok(dir.querySelectorAll('.svnsea2e-toolbox-button').length === 1, 'toolbox button added once');

console.log(failures ? `\n${failures} FAILURES` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
