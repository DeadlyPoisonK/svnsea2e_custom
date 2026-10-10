import { ItemTypes, TEMPLATES } from '../enums.js';
import { enrichHTML, getAllAdvantageNames } from '../helpers.js';
import { ChoiceSelector } from '../apps/choice-selector.js';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

const ITEM_TEMPLATES = `${TEMPLATES}/items`;
const tab = (id, label) => ({ id, label: `SVNSEA2E.${label}` });
const DESCRIPTION_TAB = { primary: { tabs: [tab('description', 'Description')], initial: 'description' } };

/** HTML fields shown in a rich text editor, per item type (besides the description). */
const EDITOR_FIELDS = {
  [ItemTypes.BACKGROUND]: ['quirk'],
  [ItemTypes.DUEL_STYLE]: ['bonus'],
  [ItemTypes.SECRET_SOCIETY]: ['concern', 'earnfavor', 'callupon'],
  [ItemTypes.STORY]: ['reward', 'endings', 'steps'],
};

/** Base sheet shared by every item type. Subclasses define PARTS and, when needed, TABS. */
export class SvnSea2EItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ['svnsea2e', 'sheet', 'item', 'themed', 'theme-light'],
    position: { width: 600, height: 700 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      selectSkills: SvnSea2EItemSheet.#onSelectSkills,
      selectAdvantages: SvnSea2EItemSheet.#onSelectAdvantages,
    },
  };

  static TABS = DESCRIPTION_TAB;

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.item;
    const system = item.system;
    Object.assign(context, {
      item,
      system,
      editable: this.isEditable,
      cssClass: item.isOwner ? 'editable' : 'locked',
      config: CONFIG.SVNSEA2E,
      tabs: this._prepareTabs('primary'),
      itemType: CONFIG.SVNSEA2E.itemTypes[item.type],
      name: item.name,
      img: item.img,
      enriched: {},
    });

    const enrichOptions = { secrets: item.isOwner, relativeTo: item, rollData: item.actor?.getRollData() };
    for (const field of ['description', ...(EDITOR_FIELDS[item.type] ?? [])]) {
      context.enriched[field] = await enrichHTML(system[field], enrichOptions);
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

const part = (template) => ({ sheet: { template: `${ITEM_TEMPLATES}/${template}.hbs`, scrollable: ['.sheet-body .tab'] } });

export class AdvantageSheet extends SvnSea2EItemSheet {
  static PARTS = part('advantage');
  static TABS = {
    primary: { tabs: [tab('description', 'Description'), tab('attributes', 'Attributes')], initial: 'description' },
  };
}

export class ArtifactSheet extends SvnSea2EItemSheet {
  static PARTS = part('artifact');
}

export class BackgroundSheet extends SvnSea2EItemSheet {
  static PARTS = part('background');
  static TABS = {
    primary: {
      tabs: [tab('description', 'Description'), tab('quirk', 'Quirk'), tab('details', 'Details')],
      initial: 'description',
    },
  };
}

export class DuelStyleSheet extends SvnSea2EItemSheet {
  static PARTS = part('duelstyle');
  static TABS = {
    primary: { tabs: [tab('description', 'Description'), tab('bonus', 'Bonus')], initial: 'description' },
  };
}

export class MonsterQualitySheet extends SvnSea2EItemSheet {
  static PARTS = part('simple');
}

export class SchemeSheet extends SvnSea2EItemSheet {
  static PARTS = part('scheme');
}

export class SecretSocietySheet extends SvnSea2EItemSheet {
  static DEFAULT_OPTIONS = { position: { width: 800 } };
  static PARTS = part('secretsociety');
  static TABS = {
    primary: {
      tabs: [
        tab('description', 'Description'),
        tab('concern', 'Concern'),
        tab('earnfavor', 'EarnFavor'),
        tab('callupon', 'UseFavor'),
      ],
      initial: 'description',
    },
  };
}

export class ShipAdventureSheet extends SvnSea2EItemSheet {
  static PARTS = part('simple');
}

export class ShipBackgroundSheet extends SvnSea2EItemSheet {
  static PARTS = part('simple');
}

export class SorcerySheet extends SvnSea2EItemSheet {
  static DEFAULT_OPTIONS = { position: { width: 750 } };
  static PARTS = part('sorcery');
}

export class StorySheet extends SvnSea2EItemSheet {
  static PARTS = part('story');
  static TABS = {
    primary: {
      tabs: [tab('description', 'Description'), tab('reward', 'Reward'), tab('endings', 'Endings'), tab('steps', 'Steps')],
      initial: 'description',
    },
  };
}

export class VirtueSheet extends SvnSea2EItemSheet {
  static PARTS = part('simple');
}

export class HubrisSheet extends SvnSea2EItemSheet {
  static PARTS = part('simple');
}
