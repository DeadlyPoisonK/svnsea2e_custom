import { TEMPLATES } from '../enums.js';
import { readRollForm, rollDicePool } from './roll.js';

const { DialogV2 } = foundry.applications.api;
const renderTemplate = (path, data) => foundry.applications.handlebars.renderTemplate(path, data);

/**
 * Show a roll dialog and resolve with the submitted form, or null when it is closed.
 * @returns {Promise<{options: import('./roll.js').RollOptions, form: HTMLFormElement}|null>}
 */
async function promptRoll(title, template, data, { cancel = false } = {}) {
  const content = await renderTemplate(template, data);
  const buttons = [
    {
      action: 'roll',
      label: game.i18n.localize('SVNSEA2E.Roll'),
      icon: 'fa-solid fa-dice-d10',
      default: true,
      callback: (event, button) => ({ options: readRollForm(button.form), form: button.form }),
    },
  ];
  if (cancel) buttons.push({ action: 'cancel', label: game.i18n.localize('Cancel'), callback: () => null });
  return DialogV2.wait({
    window: { title },
    // Up to v23.3 these were Application V1 dialogs, always light.
    classes: ['svnsea2e', 'roll-dialog', 'themed', 'theme-light'],
    position: { width: 400 },
    content,
    buttons,
    rejectClose: false,
  });
}

/**
 * Defaults of the roll dialog set by the actor's active effects (`system.rollBonus`, see src/effects.js): extra dice
 * and options already checked, with the names of the effects, shown in the dialog.
 * @param {Actor} actor
 * @param {object} [options]
 * @param {string} [options.skill]   The skill rolled: its extra dice count too.
 * @param {boolean} [options.dice]   Whether the roll takes extra dice (the free roll does not).
 */
function effectDefaults(actor, { skill, dice = true } = {}) {
  const bonus = actor.system.rollBonus;
  if (!bonus) return { dice: 0 };
  const relevant = (key) => {
    if (!key?.startsWith('system.rollBonus.')) return false;
    if (key.startsWith('system.rollBonus.skills.')) return dice && key === `system.rollBonus.skills.${skill}`;
    return dice || key !== 'system.rollBonus.dice';
  };
  const names = new Set();
  for (const effect of actor.allApplicableEffects()) {
    if (effect.active && effect.system.changes.some((change) => relevant(change.key))) names.add(effect.name);
  }
  return {
    ...bonus,
    dice: dice ? bonus.dice + (skill ? (bonus.skills[skill] ?? 0) : 0) : 0,
    effects: [...names].sort((a, b) => a.localeCompare(b)).join(', '),
  };
}

/** Skill roll for heroes and player characters: choose the trait and the bonuses. */
export async function rollSkill(actor, skill) {
  const system = actor.system;
  const rank = system.skills[skill].value;
  const rolldata = {
    threshold: rank >= 4 ? 15 : 10,
    explode: rank === 5 || system.explodesTens,
    reroll: rank > 2,
    skilldice: rank,
    skillRank: rank,
  };
  const traits = {};
  for (const [key, trait] of Object.entries(system.traits)) traits[CONFIG.SVNSEA2E.traits[key]] = trait.value;
  const skillLabel = CONFIG.SVNSEA2E.skills[skill];

  const result = await promptRoll(
    game.i18n.format('SVNSEA2E.ApproachPromptTitle', { skill: skillLabel }),
    `${TEMPLATES}/chats/skill-roll-dialog.hbs`,
    { data: system, traits, bonus: effectDefaults(actor, { skill }) },
  );
  if (!result) return false;
  const traitSelect = result.form.elements.trait;
  return rollDicePool({
    actor,
    rolldata,
    options: result.options,
    title: game.i18n.format('SVNSEA2E.ApproachRollChatTitle', {
      trait: traitSelect.options[traitSelect.selectedIndex].text,
      skill: skillLabel,
    }),
  });
}

/** Trait-only roll, also used by villains, monsters and brutes. Joie de Vivre does not apply: there is no skill. */
export async function rollTrait(actor, trait) {
  const system = actor.system;
  const rolldata = {
    threshold: 10,
    explode: system.explodesTens ?? false,
    reroll: false,
    skilldice: 0,
    skillRank: 0,
  };
  const title = game.i18n.format('SVNSEA2E.TraitRollTitle', { trait: CONFIG.SVNSEA2E.traits[trait] });
  const result = await promptRoll(title, `${TEMPLATES}/chats/trait-roll-dialog.hbs`, {
    data: system,
    traitmax: system.traits[trait].value,
    bonus: effectDefaults(actor),
  });
  if (!result) return false;
  return rollDicePool({ actor, rolldata, options: result.options, title });
}

/** Free roll ("Roll Dice"): any number of dice, without skill, trait or wound bonus. */
export async function rollFreeDice(actor) {
  const result = await promptRoll(
    game.i18n.localize('SVNSEA2E.Roll'),
    `${TEMPLATES}/items/parts/roll-throw.hbs`,
    { bonus: effectDefaults(actor, { dice: false }) },
    { cancel: true },
  );
  if (!result) return false;
  const diceCount = Math.max(parseInt(result.form.elements.diceNumber?.value) || 1, 1);
  const { addOneToDice, joieDeVivre, joieRank, explodeDice, increaseThreshold } = result.options;
  return rollDicePool({
    actor,
    rolldata: {
      skilldice: diceCount,
      // Joie de Vivre needs the rank of the skill: the number of dice is not it.
      skillRank: Math.max(joieRank, 0),
      threshold: 10,
      explode: false,
      reroll: false,
      skipWoundBonus: true,
    },
    options: {
      trait: 0,
      bonusDice: 0,
      flairDice: false,
      interpretationDice: false,
      useForMe: 0,
      useForHelpMe: 0,
      addOneToDice,
      joieDeVivre,
      explodeDice,
      increaseThreshold,
    },
    title: game.i18n.localize('SVNSEA2E.GenericRoll'),
  });
}
