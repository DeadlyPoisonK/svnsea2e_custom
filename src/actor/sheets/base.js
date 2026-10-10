import { ActorType, ItemTypes, TEMPLATES } from '../../enums.js';
import { enrichHTML, isValidGlamorIsles } from '../../helpers.js';
import { ChoiceSelector } from '../../apps/choice-selector.js';
import { rollFreeDice, rollSkill, rollTrait } from '../../roll/dialogs.js';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/**
 * Base sheet shared by every actor type.
 * Subclasses define PARTS (one template), TABS and `_prepareItems(context)`.
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
      toggleHtk: SvnSea2EActorSheet.#onToggleHtk,
      selectLanguages: SvnSea2EActorSheet.#onSelectLanguages,
      setRank: SvnSea2EActorSheet.#onSetRank,
      setWounds: SvnSea2EActorSheet.#onSetWounds,
      rollSkill: SvnSea2EActorSheet.#onRollSkill,
      rollTrait: SvnSea2EActorSheet.#onRollTrait,
      freeRoll: SvnSea2EActorSheet.#onFreeRoll,
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
    });
    if (typeof system.concept === 'string') {
      context.enrichedConcept = await enrichHTML(system.concept, { secrets: actor.isOwner, relativeTo: actor });
    }
    this._prepareItems(context);
    return context;
  }

  /** @override */
  _prepareTabs(group) {
    return this._getTabsConfig(group) ? super._prepareTabs(group) : {};
  }

  /** Add the actor's items, grouped by type, to the context. */
  _prepareItems(context) {}

  /** Traits with their localized label. */
  _prepareTraits() {
    if (!this.actor.system.traits) return [];
    return Object.entries(this.actor.system.traits).map(([name, trait]) => ({
      ...trait,
      name,
      label: CONFIG.SVNSEA2E.traits[name],
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

  #onDragRow(event) {
    const row = event.currentTarget;
    const dragged = row.dataset.itemId ? this.actor.items.get(row.dataset.itemId) : game.actors.get(row.dataset.actorId);
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

  /** Hard To Kill: one more dramatic wound. The maxima are derived by the data model. */
  static async #onToggleHtk(event, target) {
    if (!this.isEditable) return;
    const system = this.actor.system;
    const update = { 'system.htk': !system.htk };
    if (system.htk) {
      // Turning it off: the wounds marked in the lost dramatic wound go too.
      const dramatic = system.dwounds.max - 1;
      update['system.wounds.value'] = Math.min(system.wounds.value, dramatic * system.woundsPerDramatic);
      update['system.dwounds.value'] = Math.min(system.dwounds.value, dramatic);
    }
    await this.actor.update(update);
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
    if (!this.isEditable) return;
    const name = target.dataset.name;
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
