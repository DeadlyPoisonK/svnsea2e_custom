import { ItemTypes, SYSTEM_PATH, TEMPLATES } from '../enums.js';
import { enrichHTML } from '../helpers.js';

const DEFAULT_ITEM_ICONS = ['icons/svg/item-bag.svg', CONST.DEFAULT_TOKEN];

/** Chat card template used when an item is sent to chat. */
const CHAT_TEMPLATES = {
  [ItemTypes.BACKGROUND]: `${TEMPLATES}/items/parts/skill-throw-background.hbs`,
  default: `${TEMPLATES}/items/parts/skill-throw.hbs`,
};

/** HTML fields enriched for the chat data, besides the description. */
const ENRICHED_FIELDS = ['quirk', 'bonus', 'concern', 'earnfavor', 'callupon', 'reward', 'endings', 'steps'];

export class SvnSea2EItem extends Item {
  /** Use the system icon for new items that still have the default artwork. */
  async _preCreate(data, options, user) {
    if ((await super._preCreate(data, options, user)) === false) return false;
    if (!this.img || DEFAULT_ITEM_ICONS.includes(this.img)) {
      this.updateSource({ img: `${SYSTEM_PATH}/icons/${this.type}.jpg` });
    }
  }

  /**
   * Data used to display the item in chat or in the expandable summary of the actor sheets.
   * @param {object} [options]
   * @param {boolean} [options.secrets]  Whether to reveal secret blocks.
   */
  async getChatData({ secrets = this.isOwner } = {}) {
    // A plain copy (with derived values): the enriched HTML must not leak into the live data.
    const data = this.system.toObject(false);
    const enrichOptions = { secrets, relativeTo: this, rollData: this.actor?.getRollData() };
    data.description = await enrichHTML(data.description, enrichOptions);
    for (const field of ENRICHED_FIELDS) {
      if (typeof data[field] === 'string') data[field] = await enrichHTML(data[field], enrichOptions);
    }
    data.metadatahtml = this[`_${this.type}ChatData`]?.(data) ?? '';
    return data;
  }

  _advantageChatData(data) {
    const points = data.cost.normal === 1 ? game.i18n.localize('SVNSEA2E.Point') : game.i18n.localize('SVNSEA2E.Points');
    let html = `<ul class="details-list"><li class="tag">${data.cost.normal} ${points}</li>`;
    if (data.knack) html += `<li class="tag">${game.i18n.localize('SVNSEA2E.Knack')}</li>`;
    if (data.innate) html += `<li class="tag">${game.i18n.localize('SVNSEA2E.Innate')}</li>`;
    return `${html}</ul>`;
  }

  _artifactChatData(data) {
    const type = !data.artifactType || data.artifactType === 'none' ? '' : CONFIG.SVNSEA2E.artifactTypes[data.artifactType];
    return `<ul class="details-list"><li class="tag">${type ?? ''}</li></ul>`;
  }

  _backgroundChatData(data) {
    const tags = (list) => list.map((entry) => `<li class="tag">${entry}</li>`).join('');
    return `<h5>${game.i18n.localize('SVNSEA2E.Quirk')}</h5>
    <p>${data.quirk}</p>
    <h5>${game.i18n.localize('SVNSEA2E.Skills')}</h5>
    <ul class="skills-list">${tags(data.skills.map((s) => CONFIG.SVNSEA2E.skills[s]))}</ul>
    <h5>${game.i18n.localize('SVNSEA2E.Advantages')}</h5>
    <ul class="advantages-list">${tags(data.advantages)}</ul>`;
  }

  _duelstyleChatData(data) {
    return `<h5>${game.i18n.localize('SVNSEA2E.Bonus')}</h5><p>${data.bonus}</p>`;
  }

  _schemeChatData(data) {
    return `<p>${game.i18n.format('SVNSEA2E.ChatInfluence', { influence: data.influence.value })}</p>`;
  }

  _secretsocietyChatData(data) {
    return `<h5>${game.i18n.localize('SVNSEA2E.Concern')}</h5>
    <p>${data.concern}</p>
    <h5>${game.i18n.localize('SVNSEA2E.EarnFavor')}</h5>
    <p>${data.earnfavor}</p>
    <h5>${game.i18n.localize('SVNSEA2E.UseFavor')}</h5>
    <p>${data.callupon}</p>`;
  }

  _sorceryChatData(data) {
    const cfg = CONFIG.SVNSEA2E;
    return `<ul class="tag-list">
    <li class="tag">${cfg.sorceryTypes[data.sorctype] ?? ''}</li>
    <li class="tag">${cfg.sorcerySubcats[data.sorcsubcat] ?? ''} ${cfg.sorceryCats[data.sorccat] ?? ''}</li>
    <li class="tag">${game.i18n.localize('SVNSEA2E.Duration')}: ${cfg.durations[data.sorcdur] ?? ''}</li>
    </ul>`;
  }

  _storyChatData(data) {
    return `<h5>${game.i18n.localize('SVNSEA2E.Status')}</h5>
    <p>${CONFIG.SVNSEA2E.storyStatuses[data.status] ?? ''}</p>
    <h5>${game.i18n.localize('SVNSEA2E.Endings')}</h5>
    <p>${data.endings}</p>
    <h5>${game.i18n.localize('SVNSEA2E.Steps')}</h5>
    <p>${data.steps}</p>
    <h5>${game.i18n.localize('SVNSEA2E.Reward')}</h5>
    <p>${data.reward}</p>`;
  }

  /** Post a card with the item's image, name and description to the chat. */
  async sendToChat() {
    const itemData = await this.getChatData();
    const template = CHAT_TEMPLATES[this.type] ?? CHAT_TEMPLATES.default;
    const content = await foundry.applications.handlebars.renderTemplate(template, {
      ...itemData,
      name: this.name,
      img: this.img,
      item: this,
    });
    return ChatMessage.implementation.create({
      author: game.user.id,
      speaker: ChatMessage.implementation.getSpeaker({ actor: this.actor }),
      content,
    });
  }

  /** @deprecated Kept for macros written against v23; use {@link sendToChat}. */
  ItemThrow() {
    return this.sendToChat();
  }
}
