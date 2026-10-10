import { ActorType, ItemTypes, TEMPLATES } from '../../enums.js';
import { enrichHTML, isValidGlamorIsles, itemsOfType } from '../../helpers.js';
import { ChoiceSelector } from '../../apps/choice-selector.js';
import { rollFreeDice, rollSkill, rollTrait } from '../../roll/dialogs.js';
import { EFFECT_ACTIONS, prepareEffects, withEffectsTab } from '../../effects.js';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/**
 * How each item type is listed on the actor sheets (see templates/actors/parts/item-list.hbs): the section label,
 * the tooltip of its "Add" button, CSS classes, and whether the rows show the "used" checkbox, the background toggle,
 * the favor, or an image that does not send the item to chat.
 */
const ITEM_SECTIONS = {
  [ItemTypes.ADVANTAGE]: { label: 'SVNSEA2E.Advantage', addTitle: 'SVNSEA2E.AddAdvantage', cssClass: 'advantage', used: true },
  [ItemTypes.DUEL_STYLE]: { label: 'SVNSEA2E.DuelingStyles', addTitle: 'SVNSEA2E.AddDuelStyle', cssClass: 'duelingstyle', used: true },
  [ItemTypes.BACKGROUND]: { label: 'SVNSEA2E.Backgrounds', addTitle: 'SVNSEA2E.AddBackground', cssClass: 'background', used: true, toggle: true },
  [ItemTypes.SECRET_SOCIETY]: { label: 'SVNSEA2E.SecretSociety', addTitle: 'SVNSEA2E.AddSecretSociety', cssClass: 'secretsociety', favor: true },
  [ItemTypes.MONSTER_QUALITY]: { label: 'SVNSEA2E.MonsterQualities', addTitle: 'SVNSEA2E.AddMonsterQuality', used: true },
  [ItemTypes.SCHEME]: { label: 'SVNSEA2E.Schemes', addTitle: 'SVNSEA2E.AddScheme', used: true },
  [ItemTypes.VIRTUE]: { label: 'SVNSEA2E.Virtue', addTitle: 'SVNSEA2E.AddVirtue', cssClass: 'story', used: true },
  [ItemTypes.HUBRIS]: { label: 'SVNSEA2E.Hubris', addTitle: 'SVNSEA2E.AddHubris', cssClass: 'story', used: true },
  [ItemTypes.STORY]: { label: 'SVNSEA2E.Stories', addTitle: 'SVNSEA2E.AddStory', cssClass: 'story' },
  [ItemTypes.ARTIFACT]: { label: 'SVNSEA2E.Artifacts', addTitle: 'SVNSEA2E.AddArtifact', cssClass: 'artifacts', used: true },
  [ItemTypes.SORCERY]: { addTitle: 'SVNSEA2E.Sorcery', cssClass: 'sorcery', used: true },
  [ItemTypes.SHIP_ADVENTURE]: { label: 'SVNSEA2E.Adventures', addTitle: 'SVNSEA2E.AddShipAdventure', cssClass: 'story', rowClass: 'adventure', noThrow: true },
  [ItemTypes.SHIP_BACKGROUND]: { label: 'SVNSEA2E.Backgrounds', addTitle: 'SVNSEA2E.AddShipBackground', cssClass: 'story', rowClass: 'background', noThrow: true },
};

/**
 * The sections of an item list, each one with the actor's items of its type sorted by name.
 * @param {Actor} actor
 * @param {(string|[string, object])[]} types  Item types, or [type, options that replace the defaults].
 */
export function itemSections(actor, types) {
  return types.map((entry) => {
    const [type, options] = Array.isArray(entry) ? entry : [entry, {}];
    const section = { type, ...ITEM_SECTIONS[type], ...options, items: itemsOfType(actor, type) };
    section.rowClass ??= section.cssClass;
    return section;
  });
}

/**
 * Base sheet shared by every actor type.
 * Subclasses define PARTS (one template), TABS and `_prepareItems(context)`. Sheets with tabs get an "Effects" tab
 * at the end (templates/parts/effects-tab.hbs).
 */
export class SvnSea2EActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    // The sheets are designed for a light background; keep them light whatever the user's theme.
    classes: ['svnsea2e', 'sheet', 'actor', 'themed', 'theme-light'],
    position: { width: 1050, height: 750 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      createItem: SvnSea2EActorSheet.#onCreateItem,
      editItem: SvnSea2EActorSheet.#onEditItem,
      deleteItem: SvnSea2EActorSheet.#onDeleteItem,
      throwItem: SvnSea2EActorSheet.#onThrowItem,
      itemSummary: SvnSea2EActorSheet.#onItemSummary,
      toggleUsed: SvnSea2EActorSheet.#onToggleUsed,
      toggleBackground: SvnSea2EActorSheet.#onToggleBackground,
      toggleSection: SvnSea2EActorSheet.#onToggleSection,
      selectLanguages: SvnSea2EActorSheet.#onSelectLanguages,
      setRank: SvnSea2EActorSheet.#onSetRank,
      setWounds: SvnSea2EActorSheet.#onSetWounds,
      rollSkill: SvnSea2EActorSheet.#onRollSkill,
      rollTrait: SvnSea2EActorSheet.#onRollTrait,
      freeRoll: SvnSea2EActorSheet.#onFreeRoll,
      ...EFFECT_ACTIONS,
    },
  };

  /** Item list sections collapsed by the user, kept across re-renders. */
  #collapsedSections = new Set();

  /* -------------------------------------------- */
  /*  Context                                     */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const system = actor.system;
    // The templates read the stored and derived values from `system`; the context only adds what is computed for display.
    Object.assign(context, {
      actor,
      system,
      editable: this.isEditable,
      cssClass: actor.isOwner ? 'editable' : 'locked',
      config: CONFIG.SVNSEA2E,
      tabs: this._prepareTabs('primary'),
      isCorrupt: system.corruptionpts > 0,
      isPlayerCharacter: actor.type === ActorType.PLAYER,
      isVillain: actor.type === ActorType.VILLAIN,
      isMonster: actor.type === ActorType.MONSTER,
      hasSkills: system.skills !== undefined,
      hasLanguages: system.languages !== undefined,
      name: actor.name,
      img: actor.img,
      traits: this._prepareTraits(),
      selectedlangs: this._prepareLanguages(),
      effects: prepareEffects(actor),
    });
    if (system.fear) context.fearLocked = this._isModified('system.fear.value');
    if (typeof system.concept === 'string') {
      context.enrichedConcept = await enrichHTML(system.concept, { secrets: actor.isOwner, relativeTo: actor });
    }
    this._prepareItems(context);
    return context;
  }

  /** @override */
  _getTabsConfig(group) {
    return withEffectsTab(super._getTabsConfig(group));
  }

  /** @override */
  _prepareTabs(group) {
    return this._getTabsConfig(group) ? super._prepareTabs(group) : {};
  }

  /** Add the actor's items, grouped by type, to the context. */
  _prepareItems(context) {}

  /** Whether an active effect changes this value: the sheet shows the result, but cannot edit it. */
  _isModified(path) {
    return foundry.utils.hasProperty(this.actor.overrides ?? {}, path);
  }

  /** Traits with their localized label. */
  _prepareTraits() {
    if (!this.actor.system.traits) return [];
    return Object.entries(this.actor.system.traits).map(([name, trait]) => ({
      ...trait,
      name,
      label: CONFIG.SVNSEA2E.traits[name],
      locked: this._isModified(`system.traits.${name}.value`),
    }));
  }

  /** Selected languages as {key: label}. */
  _prepareLanguages() {
    const languages = this.actor.system.languages;
    if (!languages) return {};
    return Object.fromEntries(languages.map((lang) => [lang, CONFIG.SVNSEA2E.languages[lang]]));
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @override */
  async _onRender(context, options) {
    await super._onRender(context, options);
    // Item rows (and ship crew rows) can be dragged to other sheets, the hotbar or the canvas.
    if (this.isEditable) {
      for (const row of this.element.querySelectorAll('li.draggable')) {
        row.setAttribute('draggable', 'true');
        row.addEventListener('dragstart', this.#onDragRow.bind(this));
      }
    }
    for (const section of this.#collapsedSections) {
      const header = this.element.querySelector(`.item-header[data-section="${section}"]`);
      if (header) this.#setSectionCollapsed(header, true);
    }
  }

  /** Rows of items, effects (of the actor or of one of its items) and ship crew members. */
  #onDragRow(event) {
    const { itemId, effectId, actorId } = event.currentTarget.dataset;
    const item = itemId ? this.actor.items.get(itemId) : null;
    const dragged = effectId ? (item ?? this.actor).effects.get(effectId) : (item ?? game.actors.get(actorId));
    if (dragged) event.dataTransfer.setData('text/plain', JSON.stringify(dragged.toDragData()));
  }

  /** Hide or show the item rows that follow a section header, up to the next header. */
  #setSectionCollapsed(header, collapsed) {
    header.classList.toggle('collapsed', collapsed);
    let row = header.nextElementSibling;
    while (row && !row.classList.contains('item-header')) {
      row.classList.toggle('hidden', collapsed);
      row = row.nextElementSibling;
    }
  }

  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */

  /** The embedded item of the row containing `target`. */
  _getItem(target) {
    const row = target.closest('[data-item-id]');
    return row ? this.actor.items.get(row.dataset.itemId) : null;
  }

  static async #onCreateItem(event, target) {
    if (!this.isEditable) return;
    const type = target.dataset.type;
    await this.actor.createEmbeddedDocuments('Item', [{ name: game.i18n.localize(`SVNSEA2E.New${type}`), type }]);
  }

  static #onEditItem(event, target) {
    this._getItem(target)?.sheet.render(true);
  }

  static async #onDeleteItem(event, target) {
    if (!this.isEditable) return;
    // Deleting an active background also takes back what it granted (see SvnSea2EActor).
    await this._getItem(target)?.delete();
  }

  static #onThrowItem(event, target) {
    return this._getItem(target)?.sendToChat();
  }

  /** Expand or collapse the item description below its row. */
  static async #onItemSummary(event, target) {
    const row = target.closest('.item');
    const item = this._getItem(target);
    if (!row || !item) return;
    if (row.classList.contains('expanded')) {
      row.querySelector('.item-summary')?.remove();
    } else {
      const data = await item.getChatData({ secrets: this.actor.isOwner });
      const summary = document.createElement('div');
      summary.className = 'item-summary';
      summary.innerHTML = `${data.description}<div class="item-metdata">${data.metadatahtml}</div>`;
      row.append(summary);
    }
    row.classList.toggle('expanded');
  }

  /** "Used this session" checkbox of advantages, virtues, hubris... */
  static async #onToggleUsed(event, target) {
    event.preventDefault();
    if (!this.isEditable) return;
    const item = this._getItem(target);
    if (item) await item.update({ 'system.used': !item.system.used });
  }

  /** Activate or deactivate a background, adding or removing the skills and advantages it grants. */
  static async #onToggleBackground(event, target) {
    if (!this.isEditable) return;
    const item = this._getItem(target);
    if (item) await this.actor.toggleBackground(item);
  }

  static #onToggleSection(event, target) {
    const section = target.dataset.section;
    const collapsed = !this.#collapsedSections.has(section);
    if (collapsed) this.#collapsedSections.add(section);
    else this.#collapsedSections.delete(section);
    this.#setSectionCollapsed(target, collapsed);
  }

  static #onSelectLanguages(event, target) {
    if (!this.isEditable) return;
    new ChoiceSelector({
      document: this.actor,
      field: 'system.languages',
      choices: CONFIG.SVNSEA2E.languages,
      title: game.i18n.localize('SVNSEA2E.ActorLangSelect'),
    }).render(true);
  }

  /**
   * Click on a rank circle (trait, skill, corruption, fear). Clicking the first circle of a rank already at 1 clears
   * it; a rank never goes below its minimum (2 for hero traits, 1 for Strength).
   */
  static async #onSetRank(event, target) {
    const name = target.dataset.name;
    if (!this.isEditable || this._isModified(name)) return;
    let value = parseInt(target.dataset.value);
    // `name` is the stored value: a rank's `value`, or a plain number like the corruption points.
    const rank = foundry.utils.getProperty(this.actor, name.replace(/\.value$/, ''));
    const current = typeof rank === 'object' ? rank.value : rank;
    if (value === 1 && current === 1) value = 0;
    value = Math.max(value, rank?.min ?? 0);
    if (value !== current) await this.actor.update({ [name]: value });
  }

  /** Click on a wound heart. */
  static async #onSetWounds(event, target) {
    if (!this.isEditable) return;
    const clicked = parseInt(target.dataset.value);
    if (Number.isNaN(clicked)) return;
    const system = this.actor.system;
    if (target.dataset.type === 'dwounds') {
      // Dramatic wounds never change normal wounds: some abilities heal or inflict one without the other.
      const dwounds = clicked === system.dwounds.value ? clicked - 1 : clicked;
      return this.actor.update({ 'system.dwounds.value': dwounds });
    }
    const value = system.wounds.value === 1 && clicked === 1 ? 0 : clicked;
    await this.actor.update(system.woundUpdate(value));
  }

  static #onRollSkill(event, target) {
    if (!this.isEditable) return;
    return rollSkill(this.actor, target.dataset.label);
  }

  static #onRollTrait(event, target) {
    if (!this.isEditable) return;
    return rollTrait(this.actor, target.dataset.label);
  }

  static #onFreeRoll(event, target) {
    if (!this.isEditable) return;
    return rollFreeDice(this.actor);
  }

  /* -------------------------------------------- */
  /*  Drag and drop                               */
  /* -------------------------------------------- */

  /** @override */
  async _onDropItem(event, item) {
    if (!this.actor.isOwner) return null;
    if (item.parent?.uuid === this.actor.uuid) {
      const sorted = await this._onSortItem(event, item);
      return sorted?.length ? item : null;
    }

    if (item.type !== ItemTypes.SORCERY && this.actor.hasItem(item.type, item.name)) {
      ui.notifications.error(game.i18n.format('SVNSEA2E.ItemExists', { type: item.type, name: item.name }));
      return null;
    }

    if (item.type === ItemTypes.BACKGROUND) {
      const nation = item.system.nation;
      const wrongNation =
        nation === 'gisles' ? !isValidGlamorIsles(this.actor) : nation && nation !== 'none' && nation !== this.actor.system.nation;
      if (wrongNation) {
        ui.notifications.error(
          game.i18n.format('SVNSEA2E.WrongNation', {
            bgnation: game.i18n.localize(CONFIG.SVNSEA2E.natTypes[nation] ?? nation),
            anation: game.i18n.localize(CONFIG.SVNSEA2E.nations[this.actor.system.nation] ?? ''),
            name: item.name,
          }),
        );
        return null;
      }
    }

    // An active background applies its bonuses once created (see SvnSea2EActor).
    const [created] = await this.actor.createEmbeddedDocuments('Item', [item.toObject()]);
    return created ?? null;
  }
}

export const ACTOR_TEMPLATES = `${TEMPLATES}/actors`;
