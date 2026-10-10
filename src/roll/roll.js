import { completeDice, poolSize as sizeOf, renderRollCard, ROLL_MESSAGE } from './message.js';

/**
 * @typedef {object} RollData
 * @property {number} skilldice      Dice from the skill rank.
 * @property {number} [skillRank]    Rank of the skill rolled, for Joie de Vivre (0 for trait rolls).
 * @property {number} threshold      Target for each raise: 10, or 15 from skill rank 4.
 * @property {boolean} explode       Whether 10s explode.
 * @property {boolean} reroll        Whether the lowest leftover die may be rerolled (skill rank 3+).
 * @property {boolean} [skipWoundBonus]  Do not add the dramatic wound bonus die.
 */

/**
 * @typedef {object} RollOptions   Choices made in the roll dialog.
 * @property {number} trait              Dice from the trait.
 * @property {number} bonusDice
 * @property {boolean} flairDice
 * @property {boolean} interpretationDice
 * @property {number} useForMe           Hero points spent for bonus dice.
 * @property {number} useForHelpMe       Hero points given by other heroes (3 dice each).
 * @property {boolean} addOneToDice
 * @property {boolean} joieDeVivre
 * @property {number} joieRank           Skill rank for Joie de Vivre, asked by the free roll dialog.
 * @property {boolean} explodeDice
 * @property {boolean} increaseThreshold
 */

/** Read the roll dialog form into {@link RollOptions}. Missing fields default to 0/false. */
export function readRollForm(form) {
  const el = form.elements;
  const num = (name) => parseInt(el[name]?.value) || 0;
  const bool = (name) => !!el[name]?.checked;
  return {
    trait: num('trait'),
    bonusDice: num('bonusDice'),
    flairDice: bool('flairDice'),
    interpretationDice: bool('interpretationDice'),
    useForMe: num('useForMe'),
    useForHelpMe: num('useForHelpMe'),
    addOneToDice: bool('addOneToDice'),
    joieDeVivre: bool('joieDeVivreAdvantage'),
    joieRank: num('joieRank'),
    explodeDice: bool('explodeDice'),
    increaseThreshold: bool('increaseThreshold'),
  };
}

/** Hero points spent on the roll. Returns false when the hero does not have enough of them. */
async function spendHeroPoints(actor, options) {
  const spent = options.useForMe;
  const available = actor.system.heropts || 0;
  if (spent > available) {
    ui.notifications.error(game.i18n.localize('SVNSEA2E.NotEnoughHero'));
    return false;
  }
  if (spent > 0) await actor.update({ 'system.heropts': available - spent });
  return true;
}

/**
 * Roll a dice pool, sort it into raises and post the result card to the chat, as a "roll" message that keeps the
 * pool, the options and the dice (see src/roll/message.js), so it can be edited later.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {RollData} params.rolldata
 * @param {RollOptions} params.options
 * @param {string} params.title   Flavor text of the chat message.
 * @param {'skill'|'trait'|'free'} [params.kind]
 * @returns {Promise<Roll|false>}
 */
export async function rollDicePool({ actor, rolldata, options, title, kind = 'free' }) {
  const system = actor.system;
  const data = {
    kind,
    pool: {
      skill: parseInt(rolldata.skilldice) || 0,
      trait: options.trait || 0,
      bonus: options.bonusDice || 0,
      flair: !!options.flairDice,
      interpretation: !!options.interpretationDice,
      heroPoints: options.useForMe || 0,
      helpers: options.useForHelpMe || 0,
      // Every character with at least one dramatic wound gets one extra die.
      wound: rolldata.skipWoundBonus ? 0 : (system.woundBonusDice ?? 0),
    },
    threshold: rolldata.threshold === 15 ? 15 : 10,
    increaseThreshold: !!options.increaseThreshold,
    addOne: !!options.addOneToDice,
    explode: !!(rolldata.explode || options.explodeDice),
    reroll: !!rolldata.reroll,
    joieDeVivre: !!options.joieDeVivre,
    // Joie de Vivre: the dice up to the skill rank count as 10s. Kept without it too, for "Edit Roll".
    joieRank: Math.min(Math.max(rolldata.skillRank ?? 0, 0), 5),
    dice: [],
    explosions: [],
    rerollFace: null,
  };
  const poolSize = sizeOf(data);
  if (poolSize < 1) {
    ui.notifications.warn(game.i18n.localize('SVNSEA2E.NoDiceToRoll'));
    return false;
  }
  if (!system.isVillain && !(await spendHeroPoints(actor, options))) return false;

  // One roll for the whole pool, attached to the message: the message visibility mode and Dice So Nice handle it
  // like any other roll. Foundry rolls the explosions after the dice of the pool.
  const roll = await new foundry.dice.Roll(`${poolSize}d10${data.explode ? 'x' : ''}`).evaluate();
  const faces = roll.dice[0].results.map((r) => r.result);
  data.dice = faces.slice(0, poolSize);
  data.explosions = faces.slice(poolSize);
  // Only the rank 3 reroll may be missing. It is not attached to the message, as up to v24.
  await completeDice(data);

  const chatData = ChatMessage.implementation.applyMode({
    type: ROLL_MESSAGE,
    author: game.user.id,
    speaker: ChatMessage.implementation.getSpeaker({ actor }),
    flavor: title,
    content: await renderRollCard(data, actor.id),
    system: data,
    rolls: [roll],
  });
  await ChatMessage.implementation.create(chatData);
  return roll;
}
