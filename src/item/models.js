/**
 * Data models for every Item type.
 */
import { clamp } from '../helpers.js';

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
        normal: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
        // Free text: the reduced cost usually depends on the nation ("2 if you are Castillian").
        reducecost: new StringField(),
      }),
      knack: new BooleanField({ initial: false }),
      innate: new BooleanField({ initial: false }),
    };
  }

  /** Costs saved before the cost had to be a whole number and the reduced cost became text. */
  static migrateData(source) {
    const cost = source.cost;
    if (cost) {
      if (typeof cost.normal === 'string') cost.normal = parseInt(cost.normal);
      if (typeof cost.normal === 'number') cost.normal = Number.isFinite(cost.normal) ? Math.max(Math.round(cost.normal), 0) : 1;
      if (typeof cost.reducecost === 'number') cost.reducecost = String(cost.reducecost);
      else if (cost.reducecost === null) cost.reducecost = '';
    }
    return super.migrateData(source);
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

/** A villain's scheme, with the Influence invested in it (0 to 40). */
export class SchemeModel extends foundry.abstract.TypeDataModel {
  static INFLUENCE_MAX = 40;

  static defineSchema() {
    const value = new NumberField({ required: true, integer: true, min: 0, max: this.INFLUENCE_MAX, initial: 0 });
    return { ...baseSchema(), influence: new SchemaField({ value }) };
  }

  static migrateData(source) {
    const influence = source.influence;
    if (typeof influence?.value === 'number') influence.value = clamp(influence.value, 0, this.INFLUENCE_MAX);
    return super.migrateData(source);
  }

  prepareBaseData() {
    super.prepareBaseData();
    Object.assign(this.influence, { min: 0, max: SchemeModel.INFLUENCE_MAX });
  }
}

export class SecretSocietyModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      concern: new HTMLField(),
      earnfavor: new HTMLField(),
      callupon: new HTMLField(),
      favor: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
    };
  }

  /** Up to v24 the favor was saved as text ("2", "" or even "<p>2</p>"). */
  static migrateData(source) {
    if (typeof source.favor === 'string') source.favor = Math.max(parseInt(source.favor.replace(/<[^>]*>/g, '')) || 0, 0);
    return super.migrateData(source);
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
