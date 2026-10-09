import { SYSTEM_ID, TEMPLATES } from '../enums.js';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * GM toolbox: a small window listing the raises and hero/danger points of the actors dropped on it.
 * The list is remembered between sessions.
 */
export class Toolbox extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: 'svnsea-toolbox',
    classes: ['svnsea2e', 'toolbox'],
    window: { title: 'SVNSEA2E.Toolbox', minimizable: true, resizable: true },
    position: { top: 20, width: 300, height: 'auto' },
    actions: {
      removeActor: Toolbox.#onRemoveActor,
    },
  };

  static PARTS = {
    items: { template: `${TEMPLATES}/toolbox/toolbox.hbs` },
  };

  /** UUIDs of the actors shown in the toolbox. */
  get actorUuids() {
    return game.settings.get(SYSTEM_ID, 'toolboxActors') ?? [];
  }

  async _setActorUuids(uuids) {
    await game.settings.set(SYSTEM_ID, 'toolboxActors', uuids);
    this.render();
  }

  /** Whether a change to this actor should refresh the toolbox. */
  shows(actor) {
    return this.rendered && this.actorUuids.includes(actor.uuid);
  }

  /** @override */
  render(options, _options) {
    if (!game.user.isGM) return this;
    return super.render(options, _options);
  }

  /** @override */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    options.position.left ??= Math.max(window.innerWidth - 650, 0);
    return options;
  }

  /** @override */
  async _prepareContext(options) {
    const actors = this.actorUuids.map((uuid) => fromUuidSync(uuid)).filter((actor) => actor);
    return { actors };
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    const dropZone = this.element.querySelector('.items');
    dropZone?.addEventListener('dragover', (event) => event.preventDefault());
    dropZone?.addEventListener('drop', this.#onDrop.bind(this));
  }

  async #onDrop(event) {
    event.preventDefault();
    const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);
    if (data?.type !== 'Actor' || !data.uuid) return;
    const uuids = this.actorUuids;
    if (!uuids.includes(data.uuid)) await this._setActorUuids([...uuids, data.uuid]);
  }

  static async #onRemoveActor(event, target) {
    await this._setActorUuids(this.actorUuids.filter((uuid) => uuid !== target.dataset.uuid));
  }
}
