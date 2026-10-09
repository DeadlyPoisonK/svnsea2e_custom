import { ActorType, ItemTypes, TEMPLATES } from '../../enums.js';
import { clamp, enrichHTML, findAdvantage, isValidGlamorIsles } from '../../helpers.js';
import { updateInitiative } from '../../combat.js';
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
    classes: ['svnsea2e', 'sheet', 'actor'],
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
      initiativeUp: SvnSea2EActorSheet.#onInitiativeStep,
      initiativeDown: SvnSea2EActorSheet.#onInitiativeStep,
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
    Object.assign(context, {
      actor,
      system,
      owner: actor.isOwner,
      limited: actor.limited,
      editable: this.isEditable,
      cssClass: actor.isOwner ? 'editable' : 'locked',
      config: CONFIG.SVNSEA2E,
      tabs: this._prepareTabs('primary'),
      isCorrupt: system.corruptionpts > 0,
      isPlayerCharacter: actor.type === ActorType.PLAYER,
      isHero: actor.type === ActorType.HERO,
      isVillain: actor.type === ActorType.VILLAIN,
      isMonster: actor.type === ActorType.MONSTER,
      isNotBrute: actor.type !== ActorType.BRUTE,
      hasSkills: system.skills !== undefined,
      hasLanguages: system.languages !== undefined,
      name: actor.name,
      img: actor.img,
      initiative: system.initiative,
      age: system.age,
      nation: system.nation,
      wealth: system.wealth,
      heropts: system.heropts,
      corruptionpts: system.corruptionpts,
      wounds: system.wounds,
      dwounds: system.dwounds,
      htk: system.htk,
      traits: this._prepareTraits(),
      selectedlangs: this._prepareLanguages(),
      religion: system.religion,
      reputation: system.reputation,
      equipment: system.equipment,
      redemption: system.redemption,
    });
    if (typeof system.concept === 'string') {
      context.enrichedConcept = await enrichHTML(system.concept, { secrets: actor.isOwner, relativeTo: actor });
    }
    this._prepareItems(context);
    return context;
  }

  /** @override */
  _prepareTabs(group) {
    return this.constructor.TABS[group] ? super._prepareTabs(group) : {};
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
    const initiative = this.element.querySelector('.initiative-input');
    if (initiative && this.isEditable) {
      initiative.addEventListener('change', this.#onInitiativeChange.bind(this));
      initiative.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        event.currentTarget.blur();
      });
    }
    for (const section of this.#collapsedSections) {
      const header = this.element.querySelector(`.item-header[data-section="${section}"]`);
      if (header) this.#setSectionCollapsed(header, true);
    }
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
    await this.actor.createEmbeddedDocuments('Item', [
      { name: game.i18n.localize(`SVNSEA2E.New${type}`), img: `systems/svnsea2e/icons/${type}.jpg`, type },
    ]);
  }

  static #onEditItem(event, target) {
    this._getItem(target)?.sheet.render(true);
  }

  static async #onDeleteItem(event, target) {
    if (!this.isEditable) return;
    const item = this._getItem(target);
    if (!item) return;
    // Removing an active background also removes the skill ranks and advantages it granted.
    if (item.type === ItemTypes.BACKGROUND && item.system.active) await this._removeBackgroundBonuses(item);
    await item.delete();
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
    if (!item) return;
    const active = !item.system.active;
    if (active) await this._applyBackgroundBonuses(item);
    else await this._removeBackgroundBonuses(item);
    await item.update({ 'system.active': active });
  }

  static #onToggleSection(event, target) {
    const section = target.dataset.section;
    const collapsed = !this.#collapsedSections.has(section);
    if (collapsed) this.#collapsedSections.add(section);
    else this.#collapsedSections.delete(section);
    this.#setSectionCollapsed(target, collapsed);
  }

  /** Hard To Kill: one more dramatic wound (and 5 more wounds for heroes). */
  static async #onToggleHtk(event, target) {
    if (!this.isEditable) return;
    const system = this.actor.system;
    const htk = !system.htk;
    const dramatic = htk ? 5 : 4;
    const perDramatic = this.actor.woundGroupSize;
    const update = {
      'system.htk': htk,
      'system.wounds.max': perDramatic * dramatic,
      'system.dwounds.max': dramatic,
    };
    if (!htk) {
      if (system.wounds.value > perDramatic * dramatic) update['system.wounds.value'] = perDramatic * dramatic;
      if (system.dwounds.value > dramatic) update['system.dwounds.value'] = dramatic;
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

  static #onInitiativeStep(event, target) {
    if (!this.isEditable) return;
    const step = target.dataset.action === 'initiativeUp' ? 1 : -1;
    return updateInitiative(this.actor.id, (this.actor.system.initiative || 0) + step);
  }

  #onInitiativeChange(event) {
    event.preventDefault();
    event.stopPropagation();
    const value = parseInt(event.currentTarget.value, 10);
    return updateInitiative(this.actor.id, Number.isNaN(value) || value < 0 ? 0 : value);
  }

  /**
   * Click on a rank circle (trait, skill, corruption, fear). Clicking the first circle of a rank already
   * at 1 clears it. Hero traits cannot go below 2, so their first circle sets the trait to 2.
   */
  static async #onSetRank(event, target) {
    if (!this.isEditable) return;
    const system = this.actor.system;
    const { type, key, name } = target.dataset;
    let value = parseInt(target.dataset.value);
    if (value === 1) {
      let current = 0;
      switch (type) {
        case 'skill':
          current = system.skills[key].value;
          break;
        case 'trait':
          if (key === 'influence' || key === 'strength') current = system.traits[key].value;
          else value = 2;
          break;
        case 'corrupt':
          current = system[key];
          break;
        case 'fear':
          current = system[key].value;
          break;
      }
      if (current === 1) value = 0;
    }
    await this.actor.update({ [name]: value });
  }

  /** Click on a wound heart. */
  static async #onSetWounds(event, target) {
    if (!this.isEditable) return;
    const clicked = parseInt(target.dataset.value);
    if (Number.isNaN(clicked)) return;
    const system = this.actor.system;

    // Brutes only have wounds.
    if (this.actor.type === ActorType.BRUTE) {
      const value = system.wounds.value === 1 && clicked === 1 ? 0 : clicked;
      return this.actor.update({ 'system.wounds.value': value });
    }

    let wounds = system.wounds.value;
    let dwounds = system.dwounds.value;
    if (target.dataset.type === 'wounds') {
      wounds = system.wounds.value === 1 && clicked === 1 ? 0 : clicked;
      // Marking wounds also marks the dramatic wounds they reach (never removes any).
      dwounds = Math.max(dwounds, Math.trunc(clicked / this.actor.woundGroupSize));
    } else {
      // Dramatic wounds never change normal wounds: some abilities heal or inflict one without the other.
      dwounds = clicked === dwounds ? dwounds - 1 : clicked;
    }
    await this.actor.update({ 'system.wounds.value': wounds, 'system.dwounds.value': dwounds });
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

    if (item.type !== ItemTypes.SORCERY && this._hasItem(item.type, item.name)) {
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
      if (item.system.active) await this._applyBackgroundBonuses(item);
    }

    const [created] = await this.actor.createEmbeddedDocuments('Item', [item.toObject()]);
    return created ?? null;
  }

  _hasItem(type, name) {
    return this.actor.items.some((i) => i.type === type && i.name === name);
  }

  /* -------------------------------------------- */
  /*  Backgrounds                                 */
  /* -------------------------------------------- */

  /** Add the background's advantages to the actor and raise its skills by one. */
  async _applyBackgroundBonuses(background) {
    const toCreate = [];
    for (const name of background.system.advantages) {
      const advantage = await findAdvantage(name);
      if (!advantage) {
        ui.notifications.error(game.i18n.format('SVNSEA2E.ItemDoesntExist', { name }));
        continue;
      }
      if (this._hasItem(ItemTypes.ADVANTAGE, advantage.name) || toCreate.some((a) => a.name === advantage.name)) {
        ui.notifications.error(game.i18n.format('SVNSEA2E.ItemExists', { type: advantage.type, name: advantage.name }));
        continue;
      }
      const data = advantage.toObject();
      delete data._id;
      toCreate.push(data);
    }
    if (toCreate.length) await this.actor.createEmbeddedDocuments('Item', toCreate);
    await this._shiftBackgroundSkills(background, 1);
  }

  /** Remove the background's advantages from the actor and lower its skills by one. */
  async _removeBackgroundBonuses(background) {
    await this._shiftBackgroundSkills(background, -1);
    const names = background.system.advantages;
    const ids = this.actor.items.filter((i) => i.type === ItemTypes.ADVANTAGE && names.includes(i.name)).map((i) => i.id);
    if (ids.length) await this.actor.deleteEmbeddedDocuments('Item', ids);
  }

  async _shiftBackgroundSkills(background, delta) {
    const skills = this.actor.system.skills;
    if (!skills) return;
    const update = {};
    for (const key of background.system.skills) {
      if (!skills[key]) continue;
      update[`system.skills.${key}.value`] = clamp(skills[key].value + delta, 0, 5);
    }
    if (!foundry.utils.isEmpty(update)) await this.actor.update(update);
  }
}

export const ACTOR_TEMPLATES = `${TEMPLATES}/actors`;
