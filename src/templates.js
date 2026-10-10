import { TEMPLATES } from './enums.js';

/** Partials used through `{{> "systems/svnsea2e/templates/..."}}`. Loading them also registers them as partials. */
const PARTIALS = [
  'actors/parts/actor-name.hbs',
  'actors/parts/actor-traits.hbs',
  'actors/parts/actor-concept.hbs',
  'actors/parts/actor-advantages.hbs',
  'actors/parts/actor-sorcery.hbs',
  'actors/parts/actor-inventory.hbs',
  'actors/parts/actor-fate.hbs',
  'actors/parts/actor-villainy.hbs',
  'actors/parts/actor-vtraits.hbs',
  'actors/parts/actor-wounds.hbs',
  'actors/parts/actor-languages.hbs',
  'actors/parts/item-list.hbs',
  'actors/parts/item-row.hbs',
  'actors/parts/rank-circles.hbs',
  'parts/sheet-tabs.hbs',
  'parts/effects-tab.hbs',
  'items/parts/item-header.hbs',
  'items/parts/item-editor.hbs',
  // Chosen by item type in templates/items/item.hbs.
  'items/parts/header-artifact.hbs',
  'items/parts/header-background.hbs',
  'items/parts/header-scheme.hbs',
  'items/parts/header-secretsociety.hbs',
  'items/parts/header-sorcery.hbs',
  'items/parts/header-story.hbs',
  'items/parts/tab-attributes.hbs',
  'items/parts/tab-details.hbs',
];

export function preloadHandlebarsTemplates() {
  return foundry.applications.handlebars.loadTemplates(PARTIALS.map((p) => `${TEMPLATES}/${p}`));
}

export function registerHandlebarsHelpers() {
  /**
   * {{#for start count step group=n}} — iterates `count` times starting at `start`.
   * Exposes @index and, for the wound track (`group` = wounds per dramatic wound, 5 by default),
   * @mod (dramatic wound number) and @remain (position inside the current dramatic wound group).
   */
  Handlebars.registerHelper('for', function (from, count, step, options) {
    const start = parseInt(from);
    const end = start + parseInt(count);
    const groupSize = parseInt(options.hash.group) || 5;

    const data = Handlebars.createFrame(options.data);
    let out = '';
    for (let i = start; i < end; i += step) {
      data.index = i;
      data.mod = Math.trunc(i / groupSize);
      data.remain = i % groupSize;
      out += options.fn(this, { data });
    }
    return out;
  });

  /** {{#iff a 'op' b}} … {{else}} … {{/iff}} */
  Handlebars.registerHelper('iff', function (a, operator, b, options) {
    const ops = {
      '==': () => a == b,
      '!=': () => a != b,
      '>=': () => a >= b,
      '<=': () => a <= b,
      '>': () => a > b,
      '<': () => a < b,
    };
    if (!(operator in ops)) throw new Error(`Unknown operator ${operator}`);
    return ops[operator]() ? options.fn(this) : options.inverse(this);
  });
}
