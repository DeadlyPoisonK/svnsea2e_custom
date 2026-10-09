import { ItemTypes } from './enums.js';

export const clamp = (value, min, max) => Math.min(Math.max(Number(value) || 0, Number(min) || 0), Number(max));

export const enrichHTML = (html, options = {}) =>
  foundry.applications.ux.TextEditor.implementation.enrichHTML(html ?? '', options);

/** Skills as a list sorted by their localized label, ready for the sheet. */
export const skillsToSheetData = (system) =>
  Object.entries(system.skills)
    .map(([name, skill]) => ({ ...skill, name, label: CONFIG.SVNSEA2E.skills[name] }))
    .sort((a, b) => a.label.localeCompare(b.label));

/** The actor's items of one type, sorted by name. */
export const itemsOfType = (actor, type) =>
  actor.items.filter((item) => item.type === type).sort((a, b) => a.name.localeCompare(b.name));

// Backgrounds from the Glamour Isles apply to these nations.
export const GLAMOR_NATIONS = ['highland', 'avalon', 'inismore'];
export const isValidGlamorIsles = (actor) => GLAMOR_NATIONS.includes(actor.system.nation);

/* -------------------------------------------- */
/*  Advantage lookup (world + compendiums)      */
/* -------------------------------------------- */

let packAdvantages = null;

/**
 * Index entries ({name, uuid}) of every advantage in the Item compendiums.
 * Built once from the lightweight compendium indexes instead of loading every document.
 */
async function getPackAdvantages() {
  if (!packAdvantages) {
    const found = [];
    for (const pack of game.packs) {
      if (pack.documentName !== 'Item') continue;
      const index = await pack.getIndex({ fields: ['type'] });
      for (const entry of index) {
        if (entry.type === ItemTypes.ADVANTAGE) found.push({ name: entry.name, uuid: entry.uuid });
      }
    }
    packAdvantages = found;
  }
  return packAdvantages;
}

/** Forget the cached compendium index after compendium items change. */
export function invalidateAdvantageCache(item) {
  if (item.pack) packAdvantages = null;
}

/** Sorted, unique names of every advantage in the world and in the compendiums. */
export async function getAllAdvantageNames() {
  const names = new Set(game.items.filter((i) => i.type === ItemTypes.ADVANTAGE).map((i) => i.name));
  for (const entry of await getPackAdvantages()) names.add(entry.name);
  return [...names].sort((a, b) => a.localeCompare(b));
}

/**
 * Find an advantage by name: an exact match among world items first, then a case-insensitive match in the compendiums.
 * @returns {Promise<Item|null>}
 */
export async function findAdvantage(name) {
  const worldItem = game.items.find((i) => i.type === ItemTypes.ADVANTAGE && i.name === name);
  if (worldItem) return worldItem;
  const lower = name.toLowerCase();
  const entry = (await getPackAdvantages()).find((e) => e.name.toLowerCase() === lower);
  return entry ? fromUuid(entry.uuid) : null;
}
