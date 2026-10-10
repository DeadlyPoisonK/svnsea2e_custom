import { ItemTypes, TEMPLATES } from '../enums.js';
import { enrichHTML, getAllAdvantageNames } from '../helpers.js';
import { ChoiceSelector } from '../apps/choice-selector.js';
import { EFFECT_ACTIONS, prepareEffects, withEffectsTab } from '../effects.js';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

const ITEM_TEMPLATES = `${TEMPLATES}/items`;

/**
 * Layout of each item type on the sheet (templates/items/item.hbs):
 * - `tabs`: rich text fields, or partials templates/items/parts/tab-<id>.hbs for the ids in PARTIAL_TABS
 *   (description only by default). The "Effects" tab is always added at the end;
 * - `header`: whether the type has more header fields, in templates/items/parts/header-<type>.hbs;
 * - `width` of the window, when wider than the default.
 */
const ITEM_LAYOUTS = {
  [ItemTypes.ADVANTAGE]: { tabs: ['description', 'attributes'] },
  [ItemTypes.ARTIFACT]: { header: true },
  [ItemTypes.BACKGROUND]: { header: true, tabs: ['description', 'quirk', 'details'] },
  [ItemTypes.DUEL_STYLE]: { tabs: ['description', 'bonus'] },
  [ItemTypes.SCHEME]: { header: true },
  [ItemTypes.SECRET_SOCIETY]: { header: true, tabs: ['description', 'concern', 'earnfavor', 'callupon'], width: 800 },
  [ItemTypes.SORCERY]: { header: true, width: 750 },
  [ItemTypes.STORY]: { header: true, tabs: ['description', 'reward', 'endings', 'steps'] },
};
// Their templates are preloaded in src/templates.js, like the header ones.
const PARTIAL_TABS = new Set(['attributes', 'details']);
const TAB_LABELS = { earnfavor: 'SVNSEA2E.EarnFavor', callupon: 'SVNSEA2E.UseFavor' };
const tabLabel = (id) => TAB_LABELS[id] ?? `SVNSEA2E.${id[0].toUpperCase()}${id.slice(1)}`;

/** The sheet of every item type, laid out by ITEM_LAYOUTS. */
export class SvnSea2EItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ['svnsea2e', 'sheet', 'item', 'themed', 'theme-light'],
    position: { width: 600, height: 700 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      selectSkills: SvnSea2EItemSheet.#onSelectSkills,
      selectAdvantages: SvnSea2EItemSheet.#onSelectAdvantages,
      ...EFFECT_ACTIONS,
    },
  };

  static PARTS = { sheet: { template: `${ITEM_TEMPLATES}/item.hbs`, scrollable: ['.sheet-body .tab'] } };

  get layout() {
    return ITEM_LAYOUTS[this.item.type] ?? {};
  }

  /** @override */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    const width = ITEM_LAYOUTS[options.document?.type]?.width;
    if (width) options.position.width = width;
    return options;
  }

  /** @override */
  _getTabsConfig(group) {
    if (group !== 'primary') return null;
    const tabs = (this.layout.tabs ?? ['description']).map((id) => ({ id, label: tabLabel(id) }));
    return withEffectsTab({ tabs, initial: 'description' });
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.item;
    const system = item.system;
    const tabs = this._prepareTabs('primary');
    Object.assign(context, {
      item,
      system,
      editable: this.isEditable,
      cssClass: item.isOwner ? 'editable' : 'locked',
      config: CONFIG.SVNSEA2E,
      tabs,
      itemType: CONFIG.SVNSEA2E.itemTypes[item.type],
      name: item.name,
      img: item.img,
      headerPartial: this.layout.header ? `${ITEM_TEMPLATES}/parts/header-${item.type}.hbs` : null,
      bodyTabs: Object.values(tabs)
        .filter((tab) => tab.id !== 'effects')
        .map((tab) => ({ ...tab, editor: !PARTIAL_TABS.has(tab.id), partial: `${ITEM_TEMPLATES}/parts/tab-${tab.id}.hbs` })),
      effects: prepareEffects(item),
      enriched: {},
    });

    const enrichOptions = { secrets: item.isOwner, relativeTo: item, rollData: item.actor?.getRollData() };
    for (const tab of context.bodyTabs.filter((t) => t.editor)) {
      context.enriched[tab.id] = await enrichHTML(system[tab.id], enrichOptions);
    }

    if (item.type === ItemTypes.BACKGROUND) context.selectedskills = system.skills.map((s) => CONFIG.SVNSEA2E.skills[s]);
    return context;
  }

  static #onSelectSkills(event, target) {
    if (!this.isEditable) return;
    new ChoiceSelector({
      document: this.item,
      field: 'system.skills',
      choices: CONFIG.SVNSEA2E.skills,
      title: game.i18n.localize('SVNSEA2E.BackgroundSkillSelect'),
    }).render(true);
  }

  static async #onSelectAdvantages(event, target) {
    if (!this.isEditable) return;
    const names = await getAllAdvantageNames();
    new ChoiceSelector({
      document: this.item,
      field: 'system.advantages',
      choices: Object.fromEntries(names.map((name) => [name, name])),
      title: game.i18n.localize('SVNSEA2E.BackgroundAdvantageSelect'),
    }).render(true);
  }
}
