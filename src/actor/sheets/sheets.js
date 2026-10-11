import { ItemTypes } from '../../enums.js';
import { skillsToSheetData } from '../../helpers.js';
import { ACTOR_TEMPLATES, SvnSea2EActorSheet, itemSections } from './base.js';

const { ADVANTAGE, ARTIFACT, BACKGROUND, DUEL_STYLE, HUBRIS, MONSTER_QUALITY, SCHEME, SECRET_SOCIETY, SORCERY, STORY, VIRTUE } =
  ItemTypes;

const tab = (id, label) => ({ id, label: `SVNSEA2E.${label}` });
const scrollable = ['.sheet-body .tab', '.sheet-body'];

/** Skills and item lists of the hero and player character sheets. */
function prepareCharacterItems(sheet, context) {
  const actor = sheet.actor;
  context.skills = skillsToSheetData(actor.system).map((skill) => ({
    ...skill,
    locked: sheet._isModified(`system.skills.${skill.name}.value`),
  }));
  context.itemLists = {
    advantages: itemSections(actor, [ADVANTAGE, DUEL_STYLE, BACKGROUND, SECRET_SOCIETY]),
    sorcery: itemSections(actor, [SORCERY]),
    inventory: itemSections(actor, [ARTIFACT]),
    fate: itemSections(actor, context.isPlayerCharacter ? [VIRTUE, HUBRIS, STORY] : [VIRTUE, HUBRIS]),
  };
}

export class PlayerCharacterSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ['pc'] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/playercharacter.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab('concept', 'Concept'),
        tab('traits', 'Traits'),
        tab('advantages', 'Features'),
        tab('fate', 'Fate'),
        tab('inventory', 'Inventory'),
        tab('sorcery', 'Sorcery'),
      ],
      initial: 'traits',
    },
  };

  _prepareItems(context) {
    prepareCharacterItems(this, context);
  }
}

export class HeroSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ['hero'] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/hero.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab('traits', 'Traits'),
        tab('advantages', 'Advantages'),
        tab('sorcery', 'Sorcery'),
        tab('inventory', 'Inventory'),
        tab('fate', 'Fate'),
        tab('concept', 'Concept'),
      ],
      initial: 'traits',
    },
  };

  _prepareItems(context) {
    prepareCharacterItems(this, context);
  }
}

export class VillainSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ['villain'] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/villain.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab('traits', 'Traits'),
        tab('advantages', 'Features'),
        tab('sorcery', 'Sorcery'),
        tab('inventory', 'Inventory'),
        tab('fate', 'Fate'),
        tab('concept', 'Concept'),
      ],
      initial: 'traits',
    },
  };

  _prepareItems(context) {
    const actor = this.actor;
    context.itemLists = {
      advantages: itemSections(actor, [ADVANTAGE, DUEL_STYLE, MONSTER_QUALITY, SCHEME]),
      sorcery: itemSections(actor, [SORCERY]),
      inventory: itemSections(actor, [ARTIFACT]),
      fate: itemSections(actor, [VIRTUE, HUBRIS]),
    };
  }
}

export class MonsterSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ['monster'] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/monster.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [tab('features', 'Features'), tab('fate', 'Fate'), tab('concept', 'Concept')],
      initial: 'features',
    },
  };

  _prepareItems(context) {
    const actor = this.actor;
    context.itemLists = {
      features: itemSections(actor, [[MONSTER_QUALITY, { used: false }]]),
      fate: itemSections(actor, [VIRTUE, HUBRIS]),
    };
  }
}

export class BruteSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ['brute'] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/brute.hbs`, scrollable: ['.sheet-body'] } };

  _prepareItems(context) {
    context.itemLists = { features: itemSections(this.actor, [ADVANTAGE, DUEL_STYLE]) };
  }
}

export class DangerPointsSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ['dangerpts'],
    position: { width: 450, height: 'auto' },
    actions: { adjustPoints: DangerPointsSheet.#onAdjustPoints },
  };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/dangerpts.hbs` } };

  static async #onAdjustPoints(event, target) {
    if (!this.isEditable) return;
    const points = Math.max(0, (parseInt(this.actor.system.points) || 0) + parseInt(target.dataset.delta));
    await this.actor.update({ 'system.points': points });
  }
}
