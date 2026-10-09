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
const { log, hooks, MockRoll, DialogV2, DocumentSheetConfig, settings } = installMocks(repo);
let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? '✓' : '✗'} ${msg}`); if (!cond) failures++; };

await import(pathToFileURL(`${repo}/svnsea2e.mjs`).href);
await Hooks.callAll('init');
ok(DocumentSheetConfig.registered.length === 20, `20 sheets registered (${DocumentSheetConfig.registered.length})`);
await Hooks.callAll('setup');
ok(CONFIG.SVNSEA2E.skills.aim === 'Aim', 'config localized');
await Hooks.callAll('ready');
ok(settings.get('systemMigrationVersion') === '24.0', 'migration version stored');

const make = async (type, data = {}) => { const a = await Actor.create({ name: type, type, ...data }); game.actors.set(a.id, a); return a; };
const sheetClasses = {};
// Collect sheet classes by re-registering: patch registerSheet to keep class refs.
for (const [d, name, type] of DocumentSheetConfig.registered) sheetClasses[`${d}.${type}`] = name;
ok(sheetClasses['Actor.playercharacter'] === 'PlayerCharacterSheet', 'PC sheet class');

// Grab classes through a second registration pass.
const classes = {};
foundry.applications.apps.DocumentSheetConfig.registerSheet = (doc, scope, sheet, cfg) => (classes[`${doc.name}.${cfg.types[0]}`] = sheet);
await Hooks.callAll('init');

// ---------- Player character ----------
const pc = await make('playercharacter', { system: { heropts: 2 } });
ok(pc.img === 'systems/svnsea2e/icons/playercharacter.jpg', 'default actor icon');
ok(pc.system.wounds.max === 20 && pc.system.dwounds.max === 4, 'hero wounds 20/4');
const pcSheet = new classes['Actor.playercharacter']({ document: pc });
await pcSheet.render();
ok(pcSheet.element.querySelectorAll('[data-action="tab"]').length === 6, 'pc tabs rendered');
ok(pcSheet.element.querySelector('.tab.traits.active'), 'traits tab active');

await pcSheet.click('[data-action="toggleHtk"]');
ok(pc.system.htk && pc.system.wounds.max === 25 && pc.system.dwounds.max === 5, 'HtK on → 25/5');
await pcSheet.render();
ok(pcSheet.element.querySelectorAll('[data-type="dwounds"]').length === 5, '5 dramatic hearts after HtK');

await pcSheet.click('[data-action="setWounds"][data-type="wounds"][data-value="12"]');
ok(pc.system.wounds.value === 12 && pc.system.dwounds.value === 2, 'wounds 12 → dramatic 2');
await pcSheet.render();
await pcSheet.click('[data-action="setWounds"][data-type="dwounds"][data-value="2"]');
ok(pc.system.dwounds.value === 1 && pc.system.wounds.value === 12, 'click current dramatic → -1, normal wounds untouched');
await pcSheet.click('[data-action="toggleHtk"]');
ok(!pc.system.htk && pc.system.wounds.max === 20, 'HtK off');

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

// Initiative
await pcSheet.click('[data-action="initiativeUp"]');
ok(pc.system.initiative === 1, 'initiative +1');
await pcSheet.render();
await pcSheet.click('[data-action="initiativeDown"]');
await pcSheet.click('[data-action="initiativeDown"]');
ok(pc.system.initiative === 0, 'initiative clamped at 0');
const input = pcSheet.element.querySelector('.initiative-input');
input.value = '4'; input.dispatchEvent(new window.Event('change'));
await new Promise((r) => setTimeout(r, 10));
ok(pc.system.initiative === 4, 'initiative input change');

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
ok(!pc.items.has(pcBg.id) && pc.system.skills.sailing.value === 0, 'deleting an active background removes its bonuses');

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

// Languages selector
await pcSheet.click('[data-action="selectLanguages"]');

// ---------- Villain ----------
const villain = await make('villain');
ok(villain.system.wounds.max === 24 && villain.system.villainy === 10, `villain derived (${villain.system.wounds.max}, ${villain.system.villainy})`);
const vSheet = new classes['Actor.villain']({ document: villain });
await vSheet.render();
await vSheet.click('[data-action="toggleHtk"]');
ok(villain.system.dwounds.max === 5 && villain.system.wounds.max === 30, 'villain HtK 30/5');
await vSheet.render();
await vSheet.click('[data-action="setWounds"][data-type="wounds"][data-value="13"]');
ok(villain.system.dwounds.value === 2, 'villain group size 6');
await vSheet.render();
MockRoll.next = [10, 10, 10, 10, 10, 1, 1, 1, 1, 1, 1];
await vSheet.click('[data-action="rollTrait"][data-label="strength"]');
ok(log.chat.at(-1).rolls[0].formula === '6d10', `villain roll formula ${log.chat.at(-1).rolls[0].formula} (5 strength + 1 wound die, no explode below 3 dramatic)`);

// ---------- Monster, Brute, Hero, Ship, Danger points ----------
const monster = await make('monster');
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
await sSheet._onDropActor({ target: header }, pc);
ok(ship.getFlag('svnsea2e', 'shipsCrew').members.includes(pc.id) && pc.getFlag('svnsea2e', 'crewMember').role === 'captain', 'crew added as captain');
await sSheet.render();
ok(sSheet.element.querySelector(`[data-actor-id="${pc.id}"]`), 'crew row rendered');
await sSheet.click('[data-action="removeCrew"]');
ok(ship.getFlag('svnsea2e', 'shipsCrew').members.length === 0, 'crew removed');

// ---------- Items ----------
for (const type of ['advantage', 'artifact', 'background', 'duelstyle', 'monsterquality', 'scheme', 'secretsociety', 'shipadventure', 'shipbackground', 'sorcery', 'story', 'virtue', 'hubris']) {
  const item = await Item.create({ name: type, type });
  const sheet = new classes[`Item.${type}`]({ document: item });
  await sheet.render();
  ok(sheet.element.querySelector('prose-mirror[name="system.description"]') && sheet.element.querySelector('.tab.active'), `item sheet ${type}`);
  const data = await item.getChatData();
  ok(typeof data.metadatahtml === 'string', `chat data ${type}`);
}
const scheme = await Item.create({ name: 's', type: 'scheme', system: { influence: { value: 7, min: 0, max: 40 } } });
ok((await scheme.getChatData()).metadatahtml.includes('7'), 'scheme influence in chat');

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

// ---------- Combat tracker hook ----------
const combatant = { id: 'c1', actor: pc, actorId: pc.id, initiative: 2, isOwner: true };
const combat = { active: true, combatants: Object.assign(new Map([['c1', combatant]]), { filter(fn) { return [...this.values()].filter(fn); } }), updateEmbeddedDocuments: async (n, u) => { combatant.initiative = u[0].initiative; } };
game.combats.set('cb', combat);
const trackerHtml = document.createElement('div');
trackerHtml.innerHTML = '<li class="combatant" data-combatant-id="c1"><div class="token-initiative"><span>2</span></div></li>';
await Hooks.callAll('renderCombatTracker', { viewed: combat }, trackerHtml);
ok(trackerHtml.querySelectorAll('.combat-btn').length === 2, 'combat buttons added');
trackerHtml.querySelector('.combat-btn.add').click();
await new Promise((r) => setTimeout(r, 10));
ok(combatant.initiative === 3 && pc.system.initiative === 3, 'combat +1 updates combatant and actor');

// Actor directory button
const dir = document.createElement('div'); dir.innerHTML = '<div class="directory-header"><search></search></div>';
await Hooks.callAll('renderActorDirectory', {}, dir);
await Hooks.callAll('renderActorDirectory', {}, dir);
ok(dir.querySelectorAll('.svnsea2e-toolbox-button').length === 1, 'toolbox button added once');

console.log(failures ? `\n${failures} FAILURES` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
