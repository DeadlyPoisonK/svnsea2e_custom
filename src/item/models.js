/**
 * Data models for every Item type.
 * The schemas are kept identical to the v23 (Foundry v13) release, so existing worlds need no data migration.
 */
const { HTMLField, SchemaField, NumberField, StringField, ArrayField, BooleanField } = foundry.data.fields;

/** Fields shared by every item. `used` backs the "used this session" checkbox on the actor sheets. */
const baseSchema = () => ({
  description: new HTMLField(),
  infosource: new StringField(),
  used: new BooleanField({ initial: false }),
});

/** Item types that only need the shared fields. */
class SimpleItemModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return baseSchema();
  }
}

export class AdvantageModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      cost: new SchemaField({
        normal: new NumberField({ initial: 1, required: true }),
        reducecost: new NumberField(),
      }),
      knack: new BooleanField({ initial: false }),
      innate: new BooleanField({ initial: false }),
    };
  }
}

export class ArtifactModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema(), artifactType: new StringField() };
  }
}

export class BackgroundModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      quirk: new HTMLField(),
      skills: new ArrayField(new StringField()),
      advantages: new ArrayField(new StringField()),
      nation: new StringField(),
      // Whether the background's skills and advantages are currently applied to the owning actor.
      active: new BooleanField({ initial: true }),
    };
  }
}

export class DuelStyleModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema(), bonus: new HTMLField() };
  }
}

export class SchemeModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const int = (initial) => new NumberField({ required: true, integer: true, min: 0, initial });
    return { ...baseSchema(), influence: new SchemaField({ value: int(0), min: int(0), max: int(40) }) };
  }
}

export class SecretSocietyModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      concern: new HTMLField(),
      earnfavor: new HTMLField(),
      callupon: new StringField(),
      favor: new HTMLField(),
    };
  }
}

export class SorceryModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      sorctype: new StringField(),
      sorcdur: new StringField(),
      sorccat: new StringField(),
      sorcsubcat: new StringField(),
    };
  }
}

export class StoryModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      reward: new HTMLField(),
      endings: new HTMLField(),
      steps: new HTMLField(),
      status: new StringField({ initial: 'current' }),
    };
  }
}

export class HubrisModel extends SimpleItemModel {}
export class MonsterQualityModel extends SimpleItemModel {}
export class ShipAdventureModel extends SimpleItemModel {}
export class ShipBackgroundModel extends SimpleItemModel {}
export class VirtueModel extends SimpleItemModel {}
