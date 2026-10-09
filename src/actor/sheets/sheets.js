import { ItemTypes } from '../../enums.js';
import { itemsOfType, skillsToSheetData } from '../../helpers.js';
import { ACTOR_TEMPLATES, SvnSea2EActorSheet } from './base.js';

const tab = (id, label) => ({ id, label: `SVNSEA2E.${label}` });
const scrollable = ['.sheet-body .tab', '.sheet-body'];

/** Items shown by the hero and player character sheets. */
function prepareCharacterItems(actor, context) {
  context.skills = skillsToSheetData(actor.system);
  context.advantages = itemsOfType(actor, ItemTypes.ADVANTAGE);
  context.backgrounds = itemsOfType(actor, ItemTypes.BACKGROUND);
  context.sorcery = itemsOfType(actor, ItemTypes.SORCERY);
  context.secretsocieties = itemsOfType(actor, ItemTypes.SECRET_SOCIETY);
  context.stories = itemsOfType(actor, ItemTypes.STORY);
  context.duelstyles = itemsOfType(actor, ItemTypes.DUEL_STYLE);
  context.artifacts = itemsOfType(actor, ItemTypes.ARTIFACT);
  context.virtues = itemsOfType(actor, ItemTypes.VIRTUE);
  context.hubriss = itemsOfType(actor, ItemTypes.HUBRIS);
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
    prepareCharacterItems(this.actor, context);
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
    prepareCharacterItems(this.actor, context);
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
    context.villainy = actor.system.villainy;
    context.advantages = itemsOfType(actor, ItemTypes.ADVANTAGE);
    context.artifacts = itemsOfType(actor, ItemTypes.ARTIFACT);
    context.sorcery = itemsOfType(actor, ItemTypes.SORCERY);
    context.schemes = itemsOfType(actor, ItemTypes.SCHEME);
    context.virtues = itemsOfType(actor, ItemTypes.VIRTUE);
    context.hubriss = itemsOfType(actor, ItemTypes.HUBRIS);
    context.monsterqualities = itemsOfType(actor, ItemTypes.MONSTER_QUALITY);
    context.duelstyles = itemsOfType(actor, ItemTypes.DUEL_STYLE);
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
    context.fear = actor.system.fear;
    context.monsterqualities = itemsOfType(actor, ItemTypes.MONSTER_QUALITY);
    context.virtues = itemsOfType(actor, ItemTypes.VIRTUE);
    context.hubriss = itemsOfType(actor, ItemTypes.HUBRIS);
  }
}

export class BruteSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ['brute'] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/brute.hbs`, scrollable: ['.sheet-body'] } };

  _prepareItems(context) {
    context.ability = this.actor.system.ability;
    context.advantages = itemsOfType(this.actor, ItemTypes.ADVANTAGE);
    context.duelstyles = itemsOfType(this.actor, ItemTypes.DUEL_STYLE);
  }
}

export class DangerPointsSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ['dangerpts'],
    position: { width: 450, height: 'auto' },
    actions: { adjustPoints: DangerPointsSheet.#onAdjustPoints },
  };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/dangerpts.hbs` } };

  _prepareItems(context) {
    context.points = this.actor.system.points;
  }

  static async #onAdjustPoints(event, target) {
    if (!this.isEditable) return;
    const points = Math.max(0, (parseInt(this.actor.system.points) || 0) + parseInt(target.dataset.delta));
    await this.actor.update({ 'system.points': points });
  }
}
