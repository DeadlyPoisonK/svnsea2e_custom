import { ItemTypes, SYSTEM_ID, SYSTEM_PATH } from '../enums.js';
import { clamp, findAdvantage } from '../helpers.js';

/**
 * The rules computed from the actor's own data live in its data model (src/actor/models.js).
 * The document only handles what involves its items: the bonuses granted by backgrounds.
 */
export class SvnSea2EActor extends Actor {
  /** Use the system icon for new actors that still have the default artwork. */
  async _preCreate(data, options, user) {
    if ((await super._preCreate(data, options, user)) === false) return false;
    if (!this.img || this.img === CONST.DEFAULT_TOKEN) {
      this.updateSource({ img: `${SYSTEM_PATH}/icons/${this.type}.jpg` });
    }
  }

  /* -------------------------------------------- */
  /*  Backgrounds                                 */
  /* -------------------------------------------- */

  /**
   * An active background grants its advantages and +1 to its skills however it is added: from the sheet, the items
   * directory, a macro... Only the client that made the change applies them.
   * @override
   */
  _onCreateDescendantDocuments(parent, collection, documents, data, options, userId) {
    super._onCreateDescendantDocuments(parent, collection, documents, data, options, userId);
    if (userId !== game.user.id || parent !== this) return;
    const backgrounds = documents.filter((item) => item.type === ItemTypes.BACKGROUND && item.system.active);
    if (backgrounds.length) this.#forEach(backgrounds, (background) => this.applyBackground(background));
  }

  /** Deleting an active background takes back what it granted. @override */
  _onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId) {
    super._onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId);
    if (userId !== game.user.id || parent !== this) return;
    const backgrounds = documents.filter((item) => item.type === ItemTypes.BACKGROUND && item.system.active);
    if (backgrounds.length) this.#forEach(backgrounds, (background) => this.removeBackground(background));
  }

  /** Run an async task for each document, one after the other. */
  async #forEach(documents, task) {
    for (const document of documents) await task(document);
  }

  /** Activate or deactivate a background, adding or removing what it grants. */
  async toggleBackground(background) {
    const active = !background.system.active;
    if (active) await this.applyBackground(background);
    else await this.removeBackground(background);
    await background.update({ 'system.active': active });
  }

  /**
   * Add the background's advantages to the actor and raise its skills by one. The advantages are marked with the
   * background that created them, so that removing it only removes those.
   */
  async applyBackground(background) {
    const toCreate = [];
    for (const name of background.system.advantages) {
      const advantage = await findAdvantage(name);
      if (!advantage) {
        ui.notifications.error(game.i18n.format('SVNSEA2E.ItemDoesntExist', { name }));
        continue;
      }
      if (this.hasItem(ItemTypes.ADVANTAGE, advantage.name) || toCreate.some((a) => a.name === advantage.name)) {
        ui.notifications.error(game.i18n.format('SVNSEA2E.ItemExists', { type: advantage.type, name: advantage.name }));
        continue;
      }
      const data = advantage.toObject();
      delete data._id;
      foundry.utils.setProperty(data, `flags.${SYSTEM_ID}.grantedBy`, background.id);
      toCreate.push(data);
    }
    if (toCreate.length) await this.createEmbeddedDocuments('Item', toCreate);
    await this.#shiftSkills(background, 1);
    if (!background.getFlag(SYSTEM_ID, 'tracksGrants')) await background.setFlag(SYSTEM_ID, 'tracksGrants', true);
  }

  /** Remove the advantages the background granted and lower its skills by one. */
  async removeBackground(background) {
    await this.#shiftSkills(background, -1);
    // Backgrounds applied before v25 did not mark their advantages: remove them by name, as v24 did.
    const granted = background.getFlag(SYSTEM_ID, 'tracksGrants')
      ? (item) => item.getFlag(SYSTEM_ID, 'grantedBy') === background.id
      : (item) => background.system.advantages.includes(item.name);
    const ids = this.items.filter((item) => item.type === ItemTypes.ADVANTAGE && granted(item)).map((item) => item.id);
    if (ids.length) await this.deleteEmbeddedDocuments('Item', ids);
  }

  async #shiftSkills(background, delta) {
    const skills = this.system.skills;
    if (!skills) return;
    const update = {};
    for (const key of background.system.skills) {
      const skill = skills[key];
      if (skill) update[`system.skills.${key}.value`] = clamp(skill.value + delta, skill.min, skill.max);
    }
    if (!foundry.utils.isEmpty(update)) await this.update(update);
  }

  /** Whether the actor has an item of this type and name. */
  hasItem(type, name) {
    return this.items.some((item) => item.type === type && item.name === name);
  }
}
