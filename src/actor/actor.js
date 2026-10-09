import { ActorType, SYSTEM_ID, SYSTEM_PATH, VILLAIN_TYPES } from '../enums.js';
import { clamp } from '../helpers.js';

export class SvnSea2EActor extends Actor {
  /** Use the system icon for new actors that still have the default artwork. */
  async _preCreate(data, options, user) {
    if ((await super._preCreate(data, options, user)) === false) return false;
    if (!this.img || this.img === CONST.DEFAULT_TOKEN) {
      this.updateSource({ img: `${SYSTEM_PATH}/icons/${this.type}.jpg` });
    }
  }

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    const system = this.system;
    switch (this.type) {
      case ActorType.PLAYER:
      case ActorType.HERO:
        this._prepareHeroWounds(system);
        this._clampRanks(system.traits);
        this._clampRanks(system.skills);
        break;
      case ActorType.VILLAIN:
      case ActorType.MONSTER:
        this._prepareVillainData(system);
        break;
      case ActorType.BRUTE:
        this._prepareBruteData(system);
        break;
    }
  }

  /** Keep every value/min/max entry within its bounds. */
  _clampRanks(ranks) {
    for (const rank of Object.values(ranks)) rank.value = clamp(rank.value, rank.min, rank.max);
  }

  /** Heroes have 4 dramatic wounds (20 wounds), or 5 (25 wounds) when Hard To Kill. */
  _prepareHeroWounds(system) {
    system.dwounds.max = system.htk ? 5 : 4;
    system.wounds.max = system.dwounds.max * 5;
    this._clampWounds(system);
  }

  /** Villains and monsters: dramatic wounds every Strength + 1 wounds; Hard To Kill adds one dramatic wound. */
  _prepareVillainData(system) {
    this._clampRanks(system.traits);
    system.villainy = parseInt(system.traits.strength.value) + parseInt(system.traits.influence.value);
    system.dwounds.max = system.htk ? 5 : 4;
    system.wounds.max = (parseInt(system.traits.strength.value) + 1) * system.dwounds.max;
    this._clampWounds(system);
  }

  /** A brute squad has as many wounds as its Strength. */
  _prepareBruteData(system) {
    const strength = system.traits.strength;
    strength.value = clamp(strength.value, strength.min, strength.max);
    system.wounds.max = strength.value;
    if (system.wounds.value > system.wounds.max) system.wounds.value = system.wounds.max;
  }

  _clampWounds(system) {
    system.wounds.value = clamp(system.wounds.value, system.wounds.min, system.wounds.max);
    system.dwounds.value = clamp(system.dwounds.value, system.dwounds.min, system.dwounds.max);
  }

  /** Number of wounds in each dramatic wound group. */
  get woundGroupSize() {
    if (VILLAIN_TYPES.includes(this.type)) return parseInt(this.system.traits.strength.value) + 1;
    return 5;
  }

  /* -------------------------------------------- */
  /*  Ship crew                                   */
  /* -------------------------------------------- */

  async removeFromCrew() {
    await this.unsetFlag(SYSTEM_ID, 'crewMember');
  }

  async setCrewMemberRole(shipId, role) {
    return this.setFlag(SYSTEM_ID, 'crewMember', { shipId, role });
  }
}
