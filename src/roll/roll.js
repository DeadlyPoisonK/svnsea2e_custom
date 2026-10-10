import { TEMPLATES } from '../enums.js';

export const ROLL_CARD = `${TEMPLATES}/chats/roll-card.hbs`;

/**
 * @typedef {object} RollData
 * @property {number} skilldice      Dice from the skill rank (or the free roll dice count).
 * @property {number} [skillRank]    Rank of the skill rolled, for Joie de Vivre (0 for trait rolls).
 * @property {number} threshold      Target for each raise: 10, 15 or 20.
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

/** Raises earned by one combination: 2 for a 15 (or a 20 when the GM raised the threshold), 1 otherwise. */
function raisesPerCombo(threshold = 10, increased = false) {
  return (threshold === 15 && !increased) || (threshold === 20 && increased) ? 2 : 1;
}

/** Indices of the values of `combo` inside `dice`, each one a different die, or null when a value is missing. */
function findComboIndices(dice, combo) {
  const indices = [];
  for (const value of combo) {
    const index = dice.findIndex((die, i) => die === value && !indices.includes(i));
    if (index === -1) return null;
    indices.push(index);
  }
  return indices;
}

/**
 * Group the remaining dice into combinations reaching `target`: first every exact sum, then the
 * combinations that overshoot the least. Removes the used dice from `dice` (in place).
 * @returns {{rolls: number[], combos: string[], raises: number}} rolls are the unused dice.
 */
function groupDice(dice, target = 10, increased = false) {
  const pool = [...dice].map(Number).sort((a, b) => b - a);
  const result = { rolls: [], combos: [], raises: 0 };

  const findCombo = (exactOnly) => {
    let bestOvershoot = Infinity;
    let found = null;
    const dfs = (index, sum, combo, used) => {
      if (sum === target) {
        found = { combo, used };
        return true;
      }
      if (!exactOnly && sum > target && sum < bestOvershoot) {
        bestOvershoot = sum;
        found = { combo, used };
        return false;
      }
      if (sum >= target || index >= pool.length) return false;
      if (dfs(index + 1, sum + pool[index], [...combo, pool[index]], [...used, index])) return true;
      return dfs(index + 1, sum, combo, used);
    };
    dfs(0, 0, [], []);
    if (!found) return null;
    for (let j = found.used.length - 1; j >= 0; j--) pool.splice(found.used[j], 1);
    return found.combo;
  };

  for (const exactOnly of [true, false]) {
    let combo;
    while ((combo = findCombo(exactOnly)) !== null) {
      result.combos.push(combo.sort((a, b) => a - b).join(' + '));
      result.raises += raisesPerCombo(target, increased);
    }
  }

  dice.length = 0;
  dice.push(...pool);
  result.rolls = pool;
  return result;
}

const ascending = (a, b) => a - b;
const diceResults = (roll) => roll.dice[0].results.map((r) => r.result).sort(ascending);

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
 * Roll a dice pool, sort it into raises and post the result card to the chat.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {RollData} params.rolldata
 * @param {RollOptions} params.options
 * @param {string} params.title   Flavor text of the chat message.
 * @returns {Promise<Roll|false>}
 */
export async function rollDicePool({ actor, rolldata, options, title }) {
  const system = actor.system;
  const skillDice = parseInt(rolldata.skilldice) || 0;
  // Every character with at least one dramatic wound gets one extra die.
  const woundBonus = rolldata.skipWoundBonus ? 0 : (system.woundBonusDice ?? 0);
  const bonusDice =
    options.bonusDice +
    (options.flairDice ? 1 : 0) +
    (options.interpretationDice ? 1 : 0) +
    options.useForMe +
    options.useForHelpMe * 3;
  const poolSize = skillDice + options.trait + bonusDice + woundBonus;
  if (poolSize < 1) {
    ui.notifications.warn(game.i18n.localize('SVNSEA2E.NoDiceToRoll'));
    return false;
  }
  if (!system.isVillain && !(await spendHeroPoints(actor, options))) return false;

  const increased = options.increaseThreshold;
  const addOne = options.addOneToDice;
  const exploded = rolldata.explode || options.explodeDice;
  const roll = await new foundry.dice.Roll(`${poolSize}d10${exploded ? 'x' : ''}`).evaluate();

  // Joie de Vivre: the dice equal to or lower than the skill rank (before the +1) count as 10s.
  const joieRank = options.joieDeVivre ? (rolldata.skillRank ?? 0) : 0;
  const dice = diceResults(roll)
    .map((d) => (d <= joieRank ? 10 : addOne ? d + 1 : d))
    .sort(ascending);
  let threshold = rolldata.threshold + (increased ? 5 : 0);
  const matches =
    threshold === 15 ? CONFIG.SVNSEA2E.match15 : threshold === 20 ? CONFIG.SVNSEA2E.match20 : CONFIG.SVNSEA2E.match10;

  let raises = 0;
  const combos = [];

  // Each die of 10 or more is a raise on its own when the threshold is 10.
  const takeTens = () => {
    if (threshold !== 10) return;
    for (let i = dice.length - 1; i >= 0 && dice[i] >= 10; i--) {
      raises++;
      combos.push(dice[i]);
      dice.splice(i, 1);
    }
  };

  takeTens();

  // Exact pairs, then exact triples, from the match tables.
  for (const combo of [...matches.two, ...matches.three]) {
    let indices;
    while ((indices = findComboIndices(dice, combo))) {
      raises += raisesPerCombo(threshold, increased);
      combos.push(indices.map((i) => dice[i]).join(' + '));
      for (const i of indices.sort((a, b) => b - a)) dice.splice(i, 1);
    }
  }

  // Skill rank 3+: reroll the lowest leftover die.
  const shownRolls = diceResults(roll);
  let rerolled = false;
  let rerollText = '';
  if (dice.length > 0 && rolldata.reroll) {
    const original = addOne ? dice[0] - 1 : dice[0];
    const [newResult] = await rollD10s(1);
    dice[0] = newResult;
    rerollText = game.i18n.format('SVNSEA2E.Reroll', { roll1: original, roll2: newResult });
    rerolled = true;
    const shownIndex = shownRolls.indexOf(original);
    if (shownIndex > -1) shownRolls[shownIndex] = newResult;
    if (newResult <= joieRank) dice[0] = 10;
    else if (addOne) dice[0] += 1;
    shownRolls.sort(ascending);
    dice.sort(ascending);
  }

  takeTens();

  // Whatever is left is grouped as efficiently as possible.
  let grouped = groupDice(dice, threshold, increased);
  combos.push(...grouped.combos);
  raises += grouped.raises;
  if (grouped.rolls.length > 0 && ((!increased && threshold === 15) || (increased && threshold === 20))) {
    const lower = groupDice(grouped.rolls, threshold - 5, increased);
    combos.push(...lower.combos);
    raises += lower.raises;
    grouped = lower;
  }

  let thresholdText = threshold.toString();
  if (increased) thresholdText += ` ${game.i18n.localize('SVNSEA2E.GMIncreasedThreshold')}`;
  const unusedDice = grouped.rolls.length;

  const content = await foundry.applications.handlebars.renderTemplate(ROLL_CARD, {
    actor,
    raisetxt: raises > 1 ? game.i18n.localize('SVNSEA2E.Raises') : game.i18n.localize('SVNSEA2E.Raise'),
    unusedDiceTxt: unusedDice > 1 ? game.i18n.localize('SVNSEA2E.UnusedDice') : game.i18n.localize('SVNSEA2E.UnusedDie'),
    data: system,
    exploded,
    explosions: game.i18n.localize('SVNSEA2E.RollsExploded'),
    extraDice: shownRolls.length - poolSize,
    hasAddOneToDice: addOne,
    addOneToDiced: game.i18n.localize('SVNSEA2E.AddOneToDiced'),
    rolls: shownRolls,
    raises,
    rCombos: game.i18n.localize('SVNSEA2E.RaiseCombos'),
    combos: combos.map(String),
    rerolled,
    reroll: rerollText,
    unusedDice,
    unusedRolls: grouped.rolls,
    dicesNumber: poolSize,
    threshold: game.i18n.format('SVNSEA2E.RollThreshold', { threshold: thresholdText }),
  });

  // Attaching the roll lets the message visibility mode and Dice So Nice handle it like any other roll.
  const chatData = ChatMessage.implementation.applyMode({
    author: game.user.id,
    speaker: ChatMessage.implementation.getSpeaker({ actor }),
    flavor: title,
    content,
    rolls: [roll],
  });
  await ChatMessage.implementation.create(chatData);
  return roll;
}

/** Roll some d10s with Foundry's dice engine and return their results. */
async function rollD10s(count) {
  const roll = await new foundry.dice.Roll(`${count}d10`).evaluate();
  return roll.dice[0].results.map((r) => r.result);
}
