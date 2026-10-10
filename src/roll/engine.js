import { SVNSEA2E } from '../config.js';

/**
 * The roll engine as pure functions: from the dice rolled and the options of the roll to the raises. Used by a new
 * roll and by "Edit Roll" (src/roll/message.js), so both count the same way. Nothing here rolls dice: when a die is
 * missing (an explosion, the rank 3 reroll) the result says so and the caller rolls it and asks again.
 */

/**
 * @typedef {object} DiceInput
 * @property {number[]} faces           Faces of every die of the pool, explosions included, as rolled (1 to 10).
 * @property {number} threshold          Threshold of the skill: 10, or 15 from rank 4.
 * @property {boolean} increaseThreshold The GM raised the threshold by 5.
 * @property {boolean} addOne            +1 to every die.
 * @property {number} joieRank           Joie de Vivre: faces up to this count as 10s (0 without it).
 * @property {boolean} reroll            Skill rank 3+: the lowest leftover die is rolled again.
 * @property {number|null} rerollFace    The new face of that die, once rolled.
 */

/**
 * @typedef {object} DiceResult
 * @property {boolean} needsReroll   A die must be rerolled and `rerollFace` is missing: roll one and ask again.
 * @property {number} target         Value of each set: the threshold, +5 when the GM raised it.
 * @property {number} raises
 * @property {string[]} combos       Sets that made raises, as shown on the card.
 * @property {number[]} unused       Values of the dice left over.
 * @property {number[]} faces        Faces of the pool after the reroll, sorted.
 * @property {{from: number, to: number}|null} rerolled  Faces of the rerolled die.
 */

/** Raises earned by one set: 2 for a 15 (or a 20 when the GM raised the threshold), 1 otherwise. */
function raisesPerCombo(threshold, increased) {
  return (threshold === 15 && !increased) || (threshold === 20 && increased) ? 2 : 1;
}

/** Indices of the values of `combo` inside `dice`, each one a different die, or null when a value is missing. */
function findComboIndices(dice, combo) {
  const indices = [];
  for (const value of combo) {
    const index = dice.findIndex((die, i) => die.value === value && !indices.includes(i));
    if (index === -1) return null;
    indices.push(index);
  }
  return indices;
}

/**
 * Group the dice into sets reaching `target`: first every exact sum, then the sets that overshoot the least.
 * @returns {{left: object[], combos: string[], raises: number}} left are the dice not used.
 */
function groupDice(dice, target, increased) {
  const pool = [...dice].sort((a, b) => b.value - a.value);
  const result = { left: pool, combos: [], raises: 0 };

  const findCombo = (exactOnly) => {
    let bestOvershoot = Infinity;
    let found = null;
    const dfs = (index, sum, used) => {
      if (sum === target) {
        found = used;
        return true;
      }
      if (!exactOnly && sum > target && sum < bestOvershoot) {
        bestOvershoot = sum;
        found = used;
        return false;
      }
      if (sum >= target || index >= pool.length) return false;
      if (dfs(index + 1, sum + pool[index].value, [...used, index])) return true;
      return dfs(index + 1, sum, used);
    };
    dfs(0, 0, []);
    if (!found) return null;
    const combo = found.map((i) => pool[i].value);
    for (let j = found.length - 1; j >= 0; j--) pool.splice(found[j], 1);
    return combo;
  };

  for (const exactOnly of [true, false]) {
    let combo;
    while ((combo = findCombo(exactOnly)) !== null) {
      result.combos.push(combo.sort((a, b) => a - b).join(' + '));
      result.raises += raisesPerCombo(target, increased);
    }
  }
  return result;
}

const byValue = (a, b) => a.value - b.value;

/**
 * Count the raises of a pool.
 * @param {DiceInput} input
 * @param {object} [tables]   Sets for each threshold (`match10`, `match15`, `match20`), CONFIG.SVNSEA2E by default.
 * @returns {DiceResult}
 */
export function resolveDice(input, tables = SVNSEA2E) {
  const { addOne, joieRank = 0, reroll, rerollFace = null } = input;
  const increased = !!input.increaseThreshold;
  // Joie de Vivre: the dice equal to or lower than the skill rank (before the +1) count as 10s.
  const valueOf = (face) => (face <= joieRank ? 10 : addOne ? face + 1 : face);
  const dice = input.faces.map((face) => ({ face, value: valueOf(face) })).sort(byValue);
  const target = input.threshold + (increased ? 5 : 0);
  const matches = target === 15 ? tables.match15 : target === 20 ? tables.match20 : tables.match10;

  let raises = 0;
  const combos = [];

  // Each die of 10 or more is a raise on its own when the threshold is 10.
  const takeTens = () => {
    if (target !== 10) return;
    for (let i = dice.length - 1; i >= 0 && dice[i].value >= 10; i--) {
      raises++;
      combos.push(String(dice[i].value));
      dice.splice(i, 1);
    }
  };

  takeTens();

  // Exact pairs, then exact triples, from the match tables.
  for (const combo of [...matches.two, ...matches.three]) {
    let indices;
    while ((indices = findComboIndices(dice, combo))) {
      raises += raisesPerCombo(target, increased);
      combos.push(indices.map((i) => dice[i].value).join(' + '));
      for (const i of indices.sort((a, b) => b - a)) dice.splice(i, 1);
    }
  }

  // Skill rank 3+: reroll the lowest leftover die.
  let rerolled = null;
  if (dice.length > 0 && reroll) {
    if (rerollFace === null) return { needsReroll: true, target };
    rerolled = { from: dice[0].face, to: rerollFace };
    dice[0] = { face: rerollFace, value: valueOf(rerollFace) };
    dice.sort(byValue);
  }

  takeTens();

  // Whatever is left is grouped as efficiently as possible.
  let grouped = groupDice(dice, target, increased);
  combos.push(...grouped.combos);
  raises += grouped.raises;
  if (grouped.left.length > 0 && ((!increased && target === 15) || (increased && target === 20))) {
    const lower = groupDice(grouped.left, target - 5, increased);
    combos.push(...lower.combos);
    raises += lower.raises;
    grouped = lower;
  }

  const faces = [...input.faces];
  if (rerolled) faces[faces.indexOf(rerolled.from)] = rerolled.to;
  return {
    needsReroll: false,
    target,
    raises,
    combos,
    unused: grouped.left.map((die) => die.value),
    faces: faces.sort((a, b) => a - b),
    rerolled,
  };
}

/**
 * The explosion dice a pool uses: one for each 10 rolled, explosions included, taken in order from `explosions`.
 * @param {number[]} dice         Faces of the dice of the pool, without explosions.
 * @param {number[]} explosions   Faces of the explosion dice rolled so far, in order.
 * @returns {{used: number[], missing: number}}  missing: how many more must be rolled.
 */
export function explosionDice(dice, explosions) {
  let pending = dice.filter((face) => face === 10).length;
  const used = [];
  for (const face of explosions) {
    if (pending === 0) break;
    used.push(face);
    pending += face === 10 ? 0 : -1;
  }
  return { used, missing: pending };
}
