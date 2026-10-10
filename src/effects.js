/**
 * Active effects: the keys the system offers, when they apply, and what the "Effects" tab of the sheets shows.
 *
 * Every system key applies in the "initial" phase, whatever phase the change was saved with. That phase runs after
 * the data models set the base values and bounds (prepareBaseData) and before they derive the maxima and clamp the
 * ranks (prepareDerivedData), so that:
 * - `system.htk = true` and `+1 system.dwounds.max` reach the wound maxima;
 * - `+1` to a trait or skill is kept within the rank bounds (a skill never goes above 5).
 *
 * `system.rollBonus.*` changes nothing on the sheet: the roll dialogs read it to fill in their options.
 */
import { ItemTypes, SYSTEM_ID } from './enums.js';

const SYSTEM_KEY = /^system\.(?:(?:traits|skills)\.\w+\.value|fear\.value|dwounds\.max|htk|rollBonus\.[\w.]+)$/;

/** The phase in which a change applies: "initial" for the system keys, its own phase for anything else. */
export const changePhase = (change) => (SYSTEM_KEY.test(change.key ?? '') ? 'initial' : change.phase);

/** Hero traits; villains and monsters use Strength and Influence (`CONFIG.SVNSEA2E.traits` has both). */
const HERO_TRAITS = ['brawn', 'finesse', 'resolve', 'wits', 'panache'];

/** Options of the roll dialogs that an effect can switch on. */
const ROLL_OPTIONS = {
  addOne: 'SVNSEA2E.AddOneToDice',
  explode: 'SVNSEA2E.ExplodeTens',
  joieDeVivre: 'SVNSEA2E.JoieDeVivre',
  increaseThreshold: 'SVNSEA2E.IncreaseThreshold',
};

/** Read by the roll dialogs: extra dice and options switched on by effects. Set again on every data preparation. */
export function rollBonusData() {
  return {
    dice: 0,
    skills: Object.fromEntries(Object.keys(CONFIG.SVNSEA2E.skills).map((skill) => [skill, 0])),
    ...Object.fromEntries(Object.keys(ROLL_OPTIONS).map((option) => [option, false])),
  };
}

let effectKeys = null;

/**
 * The keys offered in the effect configuration, as {key: label}, once the configuration lists are localized.
 * Any other key still works: these are only the ones the system knows.
 */
export function getEffectKeys() {
  if (effectKeys) return effectKeys;
  const { traits, skills } = CONFIG.SVNSEA2E;
  const format = (key, name) => game.i18n.format(`SVNSEA2E.EffectKey${key}`, { name });
  const keys = {};
  for (const trait of [...HERO_TRAITS, 'strength', 'influence']) keys[`system.traits.${trait}.value`] = format('Trait', traits[trait]);
  keys['system.fear.value'] = format('Trait', game.i18n.localize('SVNSEA2E.Fear'));
  for (const [skill, label] of Object.entries(skills)) keys[`system.skills.${skill}.value`] = format('Skill', label);
  keys['system.dwounds.max'] = game.i18n.localize('SVNSEA2E.EffectKeyDramaticWounds');
  keys['system.htk'] = game.i18n.localize('SVNSEA2E.HardToKill');
  keys['system.rollBonus.dice'] = game.i18n.localize('SVNSEA2E.EffectKeyDice');
  for (const [skill, label] of Object.entries(skills)) keys[`system.rollBonus.skills.${skill}`] = format('SkillDice', label);
  for (const [option, label] of Object.entries(ROLL_OPTIONS)) {
    keys[`system.rollBonus.${option}`] = format('Roll', game.i18n.localize(label));
  }
  return (effectKeys = keys);
}

/** The effect that makes a character Hard To Kill, as created by the v25 migration. */
export function hardToKillEffectData() {
  return {
    name: game.i18n.localize('SVNSEA2E.HardToKill'),
    img: 'icons/svg/regen.svg',
    description: game.i18n.localize('SVNSEA2E.HardToKillDescription'),
    system: { changes: [{ key: 'system.htk', type: 'override', value: 'true', phase: 'initial' }] },
    flags: { [SYSTEM_ID]: { hardToKill: true } },
  };
}

export class SvnSea2EActiveEffect extends ActiveEffect {
  /** The effects of an inactive background do not apply: like its skills and advantages, they need it active. */
  get isSuppressed() {
    if (this.parent?.type === ItemTypes.BACKGROUND && !this.parent.system.active) return true;
    return super.isSuppressed;
  }

  /** @override */
  shouldApplyChange(change, options) {
    return changePhase(change) === options?.phase;
  }
}

/* -------------------------------------------- */
/*  The "Effects" tab                           */
/* -------------------------------------------- */

const CHANGE_SIGNS = { add: '+', subtract: '−', multiply: '×', override: '=', upgrade: '≥', downgrade: '≤' };

/** One line per change, like "Skill: Aim +1" or "Hard To Kill = true". */
function describeChanges(effect) {
  const keys = getEffectKeys();
  return effect.system.changes
    .filter((change) => change.key)
    .map((change) => {
      const value = String(change.value ?? '');
      const sign = CHANGE_SIGNS[change.type] ?? change.type;
      // "+1", "−1", "-1" for numbers; "= true", "× 2"... for the rest.
      if (change.type === 'add') return `${keys[change.key] ?? change.key} ${value.startsWith('-') ? '' : sign}${value}`;
      return `${keys[change.key] ?? change.key} ${sign}${change.type === 'subtract' ? '' : ' '}${value}`;
    })
    .join(', ');
}

function effectRow(effect) {
  return {
    id: effect.id,
    name: effect.name,
    img: effect.img,
    disabled: effect.disabled,
    suppressed: effect.isSuppressed,
    active: effect.active,
    duration: effect.isTemporary ? effect.duration.label : '',
    changes: describeChanges(effect),
  };
}

/**
 * Context of the "Effects" tab. The document's own effects, split like Foundry does: temporary (with a duration),
 * passive and inactive (disabled or suppressed). An actor also lists the effects its items transfer to it.
 */
export function prepareEffects(document) {
  const sections = { temporary: [], passive: [], inactive: [] };
  for (const effect of document.effects) {
    const section = !effect.active ? 'inactive' : effect.isTemporary ? 'temporary' : 'passive';
    sections[section].push(effectRow(effect));
  }
  const labels = { temporary: 'SVNSEA2E.EffectsTemporary', passive: 'SVNSEA2E.EffectsPassive', inactive: 'SVNSEA2E.EffectsInactive' };
  const context = {
    sections: Object.entries(sections).map(([id, effects]) => ({ id, label: labels[id], effects })),
  };
  if (document.documentName === 'Actor') {
    context.isActor = true;
    context.inherited = [];
    for (const item of document.items) {
      for (const effect of item.effects) {
        if (effect.transfer) context.inherited.push({ ...effectRow(effect), itemId: item.id, itemName: item.name });
      }
    }
    context.inherited.sort((a, b) => a.name.localeCompare(b.name));
  }
  return context;
}

/* -------------------------------------------- */
/*  Actions of the "Effects" tab                */
/* -------------------------------------------- */

/** The effect of the row containing `target`: the document's own, or one of its item's when the row has an item. */
function getEffect(sheet, target) {
  const row = target.closest('[data-effect-id]');
  if (!row) return null;
  const parent = row.dataset.itemId ? sheet.document.items.get(row.dataset.itemId) : sheet.document;
  return parent?.effects.get(row.dataset.effectId) ?? null;
}

/** "Add" in a section: a new effect already temporary (1 round) or disabled, depending on the section. */
async function onCreateEffect(event, target) {
  if (!this.isEditable) return;
  const document = this.document;
  const data = { name: game.i18n.localize('SVNSEA2E.NewEffect'), origin: document.uuid };
  if (target.dataset.section === 'temporary') data.duration = { value: 1, units: 'rounds' };
  if (target.dataset.section === 'inactive') data.disabled = true;
  const [effect] = await document.createEmbeddedDocuments('ActiveEffect', [data]);
  effect?.sheet.render(true);
}

function onEditEffect(event, target) {
  getEffect(this, target)?.sheet.render(true);
}

async function onToggleEffect(event, target) {
  if (!this.isEditable) return;
  const effect = getEffect(this, target);
  if (effect) await effect.update({ disabled: !effect.disabled });
}

async function onDeleteEffect(event, target) {
  if (!this.isEditable) return;
  await getEffect(this, target)?.delete();
}

/** An effect transferred by an item is edited from the item: open its sheet on the "Effects" tab. */
async function onOpenEffectSource(event, target) {
  const item = this.document.items.get(target.closest('[data-item-id]')?.dataset.itemId);
  if (!item) return;
  item.sheet.tabGroups.primary = 'effects';
  await item.sheet.render(true);
}

/** Actions shared by the actor and item sheets. */
export const EFFECT_ACTIONS = {
  createEffect: onCreateEffect,
  editEffect: onEditEffect,
  toggleEffect: onToggleEffect,
  deleteEffect: onDeleteEffect,
  openEffectSource: onOpenEffectSource,
};

/** The "Effects" tab, added at the end of every sheet with tabs. */
export const EFFECTS_TAB = { id: 'effects', label: 'SVNSEA2E.Effects' };

/** Add the tab to a tab configuration, without changing the static one. */
export function withEffectsTab(config) {
  return config ? { ...config, tabs: [...config.tabs, EFFECTS_TAB] } : config;
}

/* -------------------------------------------- */
/*  Effect configuration                        */
/* -------------------------------------------- */

/** Suggest the system keys in the "Attribute Key" fields of the effect configuration. */
export function onRenderActiveEffectConfig(app, html) {
  const inputs = html.querySelectorAll('input[name^="system.changes."][name$=".key"]');
  if (!inputs.length) return;
  const id = `${SYSTEM_ID}-effect-keys-${app.id}`;
  if (!html.querySelector(`#${CSS.escape(id)}`)) {
    const list = document.createElement('datalist');
    list.id = id;
    for (const [key, label] of Object.entries(getEffectKeys())) list.append(new Option(label, key));
    html.append(list);
  }
  for (const input of inputs) input.setAttribute('list', id);
}
