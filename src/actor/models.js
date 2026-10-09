/**
 * Data models for every Actor type.
 * The schemas are kept identical to the v23 (Foundry v13) release, so existing worlds need no data migration.
 */
const { HTMLField, SchemaField, NumberField, StringField, ArrayField, BooleanField } = foundry.data.fields;

const int = (initial = 0, min = 0) => new NumberField({ required: true, integer: true, min, initial });

/** A value/min/max triple, as used by traits, skills, fear... */
const ranked = (initial = 0, max = 5) => new SchemaField({ value: int(initial), min: int(0), max: int(max) });

/** Wounds, dramatic wounds, initiative and Hard To Kill: shared by every "living" actor and ships. */
const baseSchema = () => ({
  htk: new BooleanField({ required: true, initial: false }),
  initiative: new NumberField({ required: true, integer: false, min: 0, initial: 0 }),
  wounds: new SchemaField({ value: int(0), min: int(0), max: int(20) }),
  dwounds: new SchemaField({ value: int(0), min: int(0), max: int(4) }),
});

const detailsSchema = () => ({
  nation: new StringField(),
  religion: new StringField(),
  age: int(20),
  reputation: new StringField(),
  languages: new ArrayField(new StringField()),
  equipment: new StringField(),
  concept: new HTMLField({ initial: '<h3>Concept</h3><h3>Biography</h3>' }),
});

const TRAITS = ['brawn', 'finesse', 'resolve', 'wits', 'panache'];
const SKILLS = [
  'aim', 'athletics', 'brawl', 'convince', 'empathy', 'hide', 'intimidate', 'notice',
  'perform', 'ride', 'sailing', 'scholarship', 'tempt', 'theft', 'warfare', 'weaponry',
];

const featuresSchema = () => ({
  traits: new SchemaField(Object.fromEntries(TRAITS.map((t) => [t, ranked(2)]))),
  skills: new SchemaField(Object.fromEntries(SKILLS.map((s) => [s, ranked(0)]))),
});

/** Villain traits: Strength and Influence. */
const villainTraitsSchema = () => ({
  traits: new SchemaField({
    influence: new SchemaField({ value: int(5), min: int(0), max: int(20) }),
    strength: new SchemaField({ value: int(5, 1), min: int(1, 1), max: int(20) }),
  }),
});

export class BruteModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      wounds: new SchemaField({ value: int(0), min: int(0), max: int(20) }),
      traits: new SchemaField({
        strength: new SchemaField({ value: int(5, 1), min: int(1, 1), max: int(20, 1) }),
      }),
      ability: new SchemaField({ name: new StringField(), description: new HTMLField() }),
    };
  }
}

export class DangerPointsModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { points: int(5) };
  }
}

export class HeroModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema(), ...detailsSchema(), ...featuresSchema() };
  }
}

export class MonsterModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema(), ...villainTraitsSchema(), fear: ranked(0) };
  }
}

export class PlayerModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      ...detailsSchema(),
      ...featuresSchema(),
      wealth: int(0),
      heropts: int(0),
      vile: int(0),
      corruptionpts: int(0),
      redemption: new StringField(),
    };
  }
}

export class ShipModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      background: new StringField(),
      class: new StringField(),
      cargo: new HTMLField(),
      origin: new StringField(),
      crewstatus: new StringField(),
      wealth: int(0),
    };
  }
}

export class VillainModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema(), ...detailsSchema(), ...villainTraitsSchema(), servants: new StringField() };
  }
}
