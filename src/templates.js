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
  'actors/parts/item-section.hbs',
  'actors/parts/item-row.hbs',
  'actors/parts/rank-circles.hbs',
  'parts/sheet-tabs.hbs',
  'items/parts/item-header.hbs',
  'items/parts/item-editor.hbs',
];

export function preloadHandlebarsTemplates() {
  return foundry.applications.handlebars.loadTemplates(PARTIALS.map((p) => `${TEMPLATES}/${p}`));
}

export function registerHandlebarsHelpers() {
  /**
   * {{#for start count step}} — iterates `count` times starting at `start`.
   * Exposes @index, @first, @last and, for the wound track, @mod (dramatic wound number) and
   * @remain (position inside the current dramatic wound group).
   * The group size is wounds.max / dwounds.max when the current context has wounds, 5 otherwise.
   */
  Handlebars.registerHelper('for', function (from, count, step, options) {
    const start = parseInt(from);
    const end = start + parseInt(count);
    let groupSize = 5;
    if (this.wounds?.max && this.dwounds?.max > 0) groupSize = Math.floor(this.wounds.max / this.dwounds.max);

    const data = Handlebars.createFrame(options.data);
    let out = '';
    for (let i = start; i < end; i += step) {
      data.index = i;
      data.first = i === 0;
      data.last = i === count;
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

  Handlebars.registerHelper('toLowerCase', (str) => String(str ?? '').toLowerCase());
  Handlebars.registerHelper('capitalize', (str) => {
    str = String(str ?? '');
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
}
