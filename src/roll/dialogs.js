import { TEMPLATES, VILLAIN_TYPES } from '../enums.js';
import { readRollForm, rollDicePool } from './roll.js';

const { DialogV2 } = foundry.applications.api;
const renderTemplate = (path, data) => foundry.applications.handlebars.renderTemplate(path, data);

/**
 * Show a roll dialog and resolve with the submitted form, or null when it is closed.
 * @returns {Promise<{options: import('./roll.js').RollOptions, form: HTMLFormElement}|null>}
 */
async function promptRoll(title, template, data) {
  const content = await renderTemplate(template, data);
  return DialogV2.wait({
    window: { title },
    classes: ['svnsea2e', 'roll-dialog'],
    position: { width: 400 },
    content,
    buttons: [
      {
        action: 'roll',
        label: game.i18n.localize('SVNSEA2E.Roll'),
        icon: 'fa-solid fa-dice-d10',
        default: true,
        callback: (event, button) => ({ options: readRollForm(button.form), form: button.form }),
      },
    ],
    rejectClose: false,
  });
}

/** Skill roll for heroes and player characters: choose the trait and the bonuses. */
export async function rollSkill(actor, skill) {
  const system = actor.system;
  const rank = system.skills[skill].value;
  const rolldata = {
    threshold: rank >= 4 ? 15 : 10,
    explode: rank === 5 || system.dwounds.value >= 3,
    reroll: rank > 2,
    skilldice: rank,
  };
  const traits = {};
  for (const [key, trait] of Object.entries(system.traits)) traits[CONFIG.SVNSEA2E.traits[key]] = trait.value;
  const skillLabel = CONFIG.SVNSEA2E.skills[skill];

  const result = await promptRoll(
    game.i18n.format('SVNSEA2E.ApproachPromptTitle', { skill: skillLabel }),
    `${TEMPLATES}/chats/skill-roll-dialog.hbs`,
    { data: system, traits },
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

/**
 * Trait-only roll. Villains and monsters roll their traits this way too; their 10s explode
 * from the third dramatic wound.
 */
export async function rollTrait(actor, trait) {
  const system = actor.system;
  const rolldata = {
    threshold: 10,
    explode: VILLAIN_TYPES.includes(actor.type) && system.dwounds?.value >= 3,
    reroll: false,
    skilldice: 0,
  };
  const title = game.i18n.format('SVNSEA2E.TraitRollTitle', { trait: CONFIG.SVNSEA2E.traits[trait] });
  const result = await promptRoll(title, `${TEMPLATES}/chats/trait-roll-dialog.hbs`, {
    data: system,
    traitmax: system.traits[trait].value,
  });
  if (!result) return false;
  return rollDicePool({ actor, rolldata, options: result.options, title });
}

/** Free roll ("Roll Dice"): any number of dice, without skill, trait or wound bonus. */
export async function rollFreeDice(actor) {
  const result = await promptRoll(game.i18n.localize('SVNSEA2E.Roll'), `${TEMPLATES}/items/parts/roll-throw.hbs`, {});
  if (!result) return false;
  const diceCount = Math.max(parseInt(result.form.elements.diceNumber?.value) || 1, 1);
  const { addOneToDice, joieDeVivre, explodeDice, increaseThreshold } = result.options;
  return rollDicePool({
    actor,
    rolldata: { skilldice: diceCount, threshold: 10, explode: false, reroll: false, skipWoundBonus: true },
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
