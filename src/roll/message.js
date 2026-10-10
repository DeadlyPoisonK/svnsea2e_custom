import { TEMPLATES } from '../enums.js';
import { updateRaisesFromEdit } from '../combat.js';
import { explosionDice, resolveDice } from './engine.js';

export const ROLL_MESSAGE = 'roll';
export const ROLL_CARD = `${TEMPLATES}/chats/roll-card.hbs`;
const EDIT_DIALOG = `${TEMPLATES}/chats/edit-roll-dialog.hbs`;

const { ArrayField, BooleanField, NumberField, SchemaField, StringField } = foundry.data.fields;
const count = (options = {}) => new NumberField({ required: true, nullable: false, integer: true, min: 0, initial: 0, ...options });
const face = () => new NumberField({ required: true, nullable: false, integer: true, min: 1, max: 10 });

/**
 * A roll of the system in the chat (ChatMessage type "roll"): the pool, the options and the dice rolled. The card in
 * `content` is drawn from these data when the roll is made and every time it is edited. Messages of v24 and before
 * are plain messages with only the card: they are shown as they are and cannot be edited.
 */
export class RollMessageModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      kind: new StringField({ required: true, choices: ['skill', 'trait', 'free'], initial: 'free' }),
      pool: new SchemaField({
        skill: count(),
        trait: count(),
        // The free roll keeps its number of dice here. Negative to take dice away.
        bonus: new NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
        flair: new BooleanField(),
        interpretation: new BooleanField(),
        heroPoints: count(),
        // Hero points given by other heroes: 3 dice each.
        helpers: count(),
        wound: count(),
      }),
      threshold: new NumberField({ required: true, nullable: false, integer: true, choices: [10, 15], initial: 10 }),
      increaseThreshold: new BooleanField(),
      addOne: new BooleanField(),
      explode: new BooleanField(),
      reroll: new BooleanField(),
      joieDeVivre: new BooleanField(),
      joieRank: count({ max: 5 }),
      // Faces in the order they were rolled. Explosions apart: they only count while `explode` is on.
      dice: new ArrayField(face()),
      explosions: new ArrayField(face()),
      rerollFace: new NumberField({ required: true, nullable: true, integer: true, min: 1, max: 10, initial: null }),
      edited: new BooleanField(),
    };
  }

  /** Number of dice of the pool, without explosions. */
  get poolSize() {
    return poolSize(this);
  }

  /** The raises, sets and leftover dice of the roll. */
  resolve() {
    return resolveRoll(this);
  }
}

/** Number of dice of a pool, without explosions. */
export function poolSize({ pool }) {
  return (
    pool.skill + pool.trait + pool.bonus + pool.wound + (pool.flair ? 1 : 0) + (pool.interpretation ? 1 : 0) +
    pool.heroPoints + pool.helpers * 3
  );
}

function resolveRoll(data) {
  return resolveDice({
    faces: [...data.dice, ...(data.explode ? explosionDice(data.dice, data.explosions).used : [])],
    threshold: data.threshold,
    increaseThreshold: data.increaseThreshold,
    addOne: data.addOne,
    joieRank: data.joieDeVivre ? data.joieRank : 0,
    reroll: data.reroll,
    rerollFace: data.rerollFace,
  });
}

/** Roll `count` d10s with Foundry's dice engine. */
async function rollD10s(count) {
  const roll = await new foundry.dice.Roll(`${count}d10`).evaluate();
  return { roll, faces: roll.dice[0].results.map((r) => r.result) };
}

/**
 * Roll whatever the data still lack: dice up to the pool size (or drop the last ones), explosions for the 10s and
 * the rank 3 reroll. The dice already rolled are kept.
 * @param {object} data   System data of a roll message; changed in place.
 * @returns {Promise<Roll[]>} The new rolls, to show them with Dice So Nice.
 */
export async function completeDice(data) {
  const rolls = [];
  const roll = async (count) => {
    const result = await rollD10s(count);
    rolls.push(result.roll);
    return result.faces;
  };
  const size = poolSize(data);
  if (data.dice.length > size) data.dice = data.dice.slice(0, size);
  else if (data.dice.length < size) data.dice = [...data.dice, ...(await roll(size - data.dice.length))];

  if (data.explode) {
    let missing;
    while ((missing = explosionDice(data.dice, data.explosions).missing) > 0) data.explosions = [...data.explosions, ...(await roll(missing))];
    data.explosions = explosionDice(data.dice, data.explosions).used;
  } else data.explosions = [];

  // The reroll face is kept only while some die is rerolled.
  const needs = resolveRoll({ ...data, rerollFace: null }).needsReroll;
  if (!needs) data.rerollFace = null;
  else if (data.rerollFace === null) [data.rerollFace] = await roll(1);
  return rolls;
}

/**
 * The card of a roll message, drawn from its system data.
 * @param {object} data      System data of the message.
 * @param {string} actorUuid   Actor that rolled (the token's actor when unlinked), for the initiative button.
 */
export async function renderRollCard(data, actorUuid) {
  const i18n = game.i18n;
  const result = resolveRoll(data);
  const joieRank = data.joieDeVivre ? data.joieRank : 0;
  const explosions = data.explode ? explosionDice(data.dice, data.explosions).used.length : 0;
  let threshold = String(result.target);
  if (data.increaseThreshold) threshold += ` ${i18n.localize('SVNSEA2E.GMIncreasedThreshold')}`;
  return foundry.applications.handlebars.renderTemplate(ROLL_CARD, {
    actorUuid,
    raises: result.raises,
    raisetxt: i18n.localize(result.raises > 1 ? 'SVNSEA2E.Raises' : 'SVNSEA2E.Raise'),
    unusedDice: result.unused.length,
    unusedDiceTxt: i18n.localize(result.unused.length > 1 ? 'SVNSEA2E.UnusedDice' : 'SVNSEA2E.UnusedDie'),
    dice: result.faces.map((face) => ({ face, joie: face <= joieRank })),
    combos: result.combos,
    unusedRolls: result.unused,
    reroll: result.rerolled && i18n.format('SVNSEA2E.Reroll', { roll1: result.rerolled.from, roll2: result.rerolled.to }),
    exploded: data.explode,
    extraDice: explosions,
    addOne: data.addOne,
    joie: joieRank > 0 && i18n.format('SVNSEA2E.JoieDiceCount', { rank: joieRank }),
    threshold: i18n.format('SVNSEA2E.RollThreshold', { threshold }),
    edited: data.edited,
  });
}

/** Whether the user may edit this message: rolls of v25 and later, by their author or the GM, when they see them. */
export function canEditRoll(message, user = game.user) {
  return message?.type === ROLL_MESSAGE && (user.isGM || message.isAuthor) && message.isContentVisible;
}

/**
 * "Edit Roll": change the pool and the options of a roll already made and count it again. Only the dice added are
 * rolled (and shown by Dice So Nice); the ones rolled before are kept. Hero points for the hero's own dice are spent
 * or given back.
 */
export async function editRoll(message) {
  if (!canEditRoll(message)) return false;
  const source = message.system.toObject();
  const content = await foundry.applications.handlebars.renderTemplate(EDIT_DIALOG, {
    data: source,
    free: source.kind === 'free',
    thresholds: { 10: '10', 15: '15' },
    threshold: String(source.threshold),
  });
  const form = await foundry.applications.api.DialogV2.wait({
    window: { title: game.i18n.localize('SVNSEA2E.EditRoll'), icon: 'fa-solid fa-pen-to-square' },
    classes: ['svnsea2e', 'roll-dialog', 'themed', 'theme-light'],
    position: { width: 420 },
    content,
    buttons: [
      { action: 'save', label: game.i18n.localize('Save'), icon: 'fa-solid fa-floppy-disk', default: true, callback: (event, button) => button.form },
      { action: 'cancel', label: game.i18n.localize('Cancel'), callback: () => null },
    ],
    rejectClose: false,
  });
  if (!form) return false;

  const data = { ...source, ...readEditForm(form), edited: true };
  if (poolSize(data) < 1) {
    ui.notifications.warn(game.i18n.localize('SVNSEA2E.NoDiceToRoll'));
    return false;
  }
  const actor = ChatMessage.implementation.getSpeakerActor(message.speaker);
  if (!(await settleHeroPoints(actor, data.pool.heroPoints - source.pool.heroPoints))) return false;

  const rolls = await completeDice(data);
  await message.update({
    system: data,
    content: await renderRollCard(data, actor?.uuid ?? message.speaker.actor),
    // Dice So Nice (6.x) shows only the rolls added to a message, and hides the card until they land.
    ...(rolls.length ? { rolls: [...message.rolls, ...rolls].map((roll) => JSON.stringify(roll)) } : {}),
  });
  // The raises this roll set in the action sequence change by the difference.
  await updateRaisesFromEdit(actor, message);
  return message;
}

/** Hero points spent (or given back, when negative) by an edit. False when the hero does not have them. */
async function settleHeroPoints(actor, spent) {
  if (!spent || !actor || actor.system.isVillain || !('heropts' in actor.system)) return true;
  const available = actor.system.heropts || 0;
  if (spent > available) {
    ui.notifications.error(game.i18n.localize('SVNSEA2E.NotEnoughHero'));
    return false;
  }
  await actor.update({ 'system.heropts': available - spent });
  return true;
}

/** Read the "Edit Roll" form. */
function readEditForm(form) {
  const el = form.elements;
  const num = (name, min = 0) => Math.max(parseInt(el[name]?.value) || 0, min);
  const bool = (name) => !!el[name]?.checked;
  return {
    pool: {
      skill: num('skill'),
      trait: num('trait'),
      bonus: num('bonus', -Infinity),
      flair: bool('flair'),
      interpretation: bool('interpretation'),
      heroPoints: num('heroPoints'),
      helpers: num('helpers'),
      wound: num('wound'),
    },
    threshold: num('threshold') === 15 ? 15 : 10,
    increaseThreshold: bool('increaseThreshold'),
    addOne: bool('addOne'),
    explode: bool('explode'),
    reroll: bool('reroll'),
    joieDeVivre: bool('joieDeVivre'),
    joieRank: Math.min(num('joieRank'), 5),
  };
}

/** "Edit Roll" in the context menu of the chat messages. */
export function onGetChatMessageContextOptions(app, options) {
  options.push({
    label: 'SVNSEA2E.EditRoll',
    icon: 'fa-solid fa-pen-to-square',
    visible: (li) => canEditRoll(game.messages.get(li.dataset.messageId)),
    onClick: (event, li) => editRoll(game.messages.get(li.dataset.messageId)),
  });
}
