/**
 * Data models for every Actor type, and the rules computed from their data.
 *
 * Bounds and maxima are set in prepareBaseData, before Foundry applies the active effects of the "initial" phase, so
 * an effect may raise them (+1 to `system.dwounds.max`, `system.htk = true`...). prepareDerivedData then adds
 * Hard To Kill, computes the rest and keeps every value within its bounds.
 */
import { clamp } from '../helpers.js';

const { HTMLField, SchemaField, NumberField, StringField, ArrayField, BooleanField } = foundry.data.fields;

const int = (initial = 0, { min = 0, max } = {}) => new NumberField({ required: true, integer: true, min, max, initial });

/** A rank (trait, skill, fear...): only its value is stored, its bounds are set by the model. */
const rank = (initial, [min, max]) => new SchemaField({ value: int(initial, { min, max }) });

/** Bounds of each kind of rank, as [min, max]. */
export const RANK_BOUNDS = {
  heroTrait: [2, 5],
  skill: [0, 5],
  strength: [1, 20],
  influence: [0, 20],
  fear: [0, 5],
};

/** Set the derived bounds of some ranks. */
function setBounds(ranks, [min, max]) {
  for (const entry of Object.values(ranks)) Object.assign(entry, { min, max });
}

/** Keep the values of some ranks within their bounds. */
function clampRanks(ranks) {
  for (const entry of Object.values(ranks)) entry.value = clamp(entry.value, entry.min, entry.max);
}

/** Clamp stored rank values so that data saved by older versions (or a macro) passes validation. */
function clampSource(ranks, bounds) {
  for (const entry of Object.values(ranks ?? {})) {
    if (typeof entry?.value === 'number') entry.value = clamp(entry.value, ...bounds);
  }
}

const TRAITS = ['brawn', 'finesse', 'resolve', 'wits', 'panache'];
const SKILLS = [
  'aim', 'athletics', 'brawl', 'convince', 'empathy', 'hide', 'intimidate', 'notice',
  'perform', 'ride', 'sailing', 'scholarship', 'tempt', 'theft', 'warfare', 'weaponry',
];

/** Wounds: `max` is derived, but stays in the schema so that Foundry offers it as a token bar. */
const woundsField = () => new SchemaField({ value: int(0), max: int(0) });

/** Nation, age... and the concept text of the Concept tab. */
const conceptSchema = () => ({
  nation: new StringField(),
  religion: new StringField(),
  age: int(20),
  reputation: new StringField(),
  concept: new HTMLField({ initial: '<h3>Concept</h3><h3>Biography</h3>' }),
});

const detailsSchema = () => ({
  ...conceptSchema(),
  languages: new ArrayField(new StringField()),
  equipment: new StringField(),
});

/* -------------------------------------------- */
/*  Actors with wounds and dramatic wounds      */
/* -------------------------------------------- */

/**
 * Wounds grouped by dramatic wound: 4 dramatic wounds (5 with Hard To Kill), each one after `woundsPerDramatic` wounds.
 * Shared by heroes, villains, monsters and ships.
 */
class WoundedModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      // Raises: kept on the actor, changed from the combat tracker, the toolbox and the roll cards.
      initiative: new NumberField({ required: true, integer: false, min: 0, initial: 0 }),
      wounds: woundsField(),
      dwounds: woundsField(),
    };
  }

  /** Number of wounds in each dramatic wound group. */
  get woundsPerDramatic() {
    return 5;
  }

  /** Whether the actor can be Hard To Kill. */
  get hardToKill() {
    return false;
  }

  /** Villains and monsters: no hero points, wounds grouped by Strength. */
  get isVillain() {
    return false;
  }

  /** One extra die from the first dramatic wound. */
  get woundBonusDice() {
    return this.dwounds.value >= 1 ? 1 : 0;
  }

  /** 10s explode from the third dramatic wound. */
  get explodesTens() {
    return this.dwounds.value >= 3;
  }

  prepareBaseData() {
    super.prepareBaseData();
    this.dwounds.max = 4;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.hardToKill) this.dwounds.max += 1;
    this.wounds.max = this.dwounds.max * this.woundsPerDramatic;
    this.wounds.value = clamp(this.wounds.value, 0, this.wounds.max);
    this.dwounds.value = clamp(this.dwounds.value, 0, this.dwounds.max);
  }

  /**
   * The update that sets the wounds to `value`: marking wounds also marks the dramatic wounds they reach,
   * never removes any.
   */
  woundUpdate(value) {
    const wounds = clamp(value, 0, this.wounds.max);
    const dwounds = Math.max(this.dwounds.value, Math.min(Math.trunc(wounds / this.woundsPerDramatic), this.dwounds.max));
    return { 'system.wounds.value': wounds, 'system.dwounds.value': dwounds };
  }
}

/** Heroes, villains and monsters can be Hard To Kill. */
class CharacterModel extends WoundedModel {
  static defineSchema() {
    return { htk: new BooleanField({ required: true, initial: false }), ...super.defineSchema() };
  }

  get hardToKill() {
    return this.htk;
  }
}

export class HeroModel extends CharacterModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      ...detailsSchema(),
      traits: new SchemaField(Object.fromEntries(TRAITS.map((t) => [t, rank(2, RANK_BOUNDS.heroTrait)]))),
      skills: new SchemaField(Object.fromEntries(SKILLS.map((s) => [s, rank(0, RANK_BOUNDS.skill)]))),
    };
  }

  static migrateData(source) {
    clampSource(source.traits, RANK_BOUNDS.heroTrait);
    clampSource(source.skills, RANK_BOUNDS.skill);
    return super.migrateData(source);
  }

  prepareBaseData() {
    super.prepareBaseData();
    setBounds(this.traits, RANK_BOUNDS.heroTrait);
    setBounds(this.skills, RANK_BOUNDS.skill);
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    clampRanks(this.traits);
    clampRanks(this.skills);
  }
}

export class PlayerModel extends HeroModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      wealth: int(0),
      heropts: int(0),
      corruptionpts: int(0),
      redemption: new StringField(),
    };
  }
}

/**
 * Villains and monsters: a dramatic wound every Strength + 1 wounds.
 * Villainy is Strength + Influence (monsters have no Influence).
 */
class VillainousModel extends CharacterModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      traits: new SchemaField({
        ...(this.hasInfluence ? { influence: rank(5, RANK_BOUNDS.influence) } : {}),
        strength: rank(5, RANK_BOUNDS.strength),
      }),
    };
  }

  static hasInfluence = true;

  static migrateData(source) {
    clampSource({ strength: source.traits?.strength }, RANK_BOUNDS.strength);
    clampSource({ influence: source.traits?.influence }, RANK_BOUNDS.influence);
    return super.migrateData(source);
  }

  get isVillain() {
    return true;
  }

  get woundsPerDramatic() {
    return this.traits.strength.value + 1;
  }

  prepareBaseData() {
    super.prepareBaseData();
    Object.assign(this.traits.strength, { min: RANK_BOUNDS.strength[0], max: RANK_BOUNDS.strength[1] });
    if (this.traits.influence) Object.assign(this.traits.influence, { min: RANK_BOUNDS.influence[0], max: RANK_BOUNDS.influence[1] });
  }

  prepareDerivedData() {
    // The ranks first: the wound groups depend on Strength.
    clampRanks(this.traits);
    super.prepareDerivedData();
    this.villainy = this.traits.strength.value + (this.traits.influence?.value ?? 0);
  }
}

export class VillainModel extends VillainousModel {
  static defineSchema() {
    return { ...super.defineSchema(), ...detailsSchema(), servants: new StringField(), redemption: new StringField() };
  }
}

export class MonsterModel extends VillainousModel {
  static hasInfluence = false;

  static defineSchema() {
    return { ...super.defineSchema(), ...conceptSchema(), fear: rank(0, RANK_BOUNDS.fear) };
  }

  static migrateData(source) {
    clampSource({ fear: source.fear }, RANK_BOUNDS.fear);
    return super.migrateData(source);
  }

  prepareBaseData() {
    super.prepareBaseData();
    Object.assign(this.fear, { min: RANK_BOUNDS.fear[0], max: RANK_BOUNDS.fear[1] });
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    clampRanks({ fear: this.fear });
  }
}

/** Ships take wounds and dramatic wounds too, but are never Hard To Kill. */
export class ShipModel extends WoundedModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      class: new StringField(),
      cargo: new HTMLField(),
      origin: new StringField(),
      crewstatus: new StringField(),
      wealth: int(0),
      // The roster: every crew member (a world actor) with their role on this ship.
      crew: new ArrayField(new SchemaField({ actorId: new StringField({ required: true }), role: new StringField({ required: true }) })),
    };
  }

  /** Give a crew member a role on this ship, adding them to the crew if needed. */
  async setCrewRole(actorId, role) {
    const crew = this.crew.map((member) => ({ ...member }));
    const member = crew.find((m) => m.actorId === actorId);
    if (member) member.role = role;
    else crew.push({ actorId, role });
    return this.parent.update({ 'system.crew': crew });
  }

  async removeCrewMember(actorId) {
    return this.parent.update({ 'system.crew': this.crew.filter((member) => member.actorId !== actorId) });
  }
}

/* -------------------------------------------- */
/*  Other actors                                */
/* -------------------------------------------- */

/** A brute squad has as many wounds as its Strength: each wound is one brute out. */
export class BruteModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      wounds: woundsField(),
      traits: new SchemaField({ strength: rank(5, RANK_BOUNDS.strength) }),
      ability: new SchemaField({ name: new StringField(), description: new HTMLField() }),
    };
  }

  static migrateData(source) {
    clampSource(source.traits, RANK_BOUNDS.strength);
    return super.migrateData(source);
  }

  prepareBaseData() {
    super.prepareBaseData();
    setBounds(this.traits, RANK_BOUNDS.strength);
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    clampRanks(this.traits);
    this.wounds.max = this.traits.strength.value;
    this.wounds.value = clamp(this.wounds.value, 0, this.wounds.max);
  }

  /** The update that sets the wounds to `value`. */
  woundUpdate(value) {
    return { 'system.wounds.value': clamp(value, 0, this.wounds.max) };
  }
}

export class DangerPointsModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { points: int(5) };
  }
}
