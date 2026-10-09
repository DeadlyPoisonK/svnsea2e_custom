import { SYSTEM_ID, TEMPLATES } from '../enums.js';
import { clamp } from '../helpers.js';
import { updateInitiative } from '../combat.js';

const { ApplicationV2, DialogV2, HandlebarsApplicationMixin } = foundry.applications.api;
const { getProperty } = foundry.utils;

/**
 * Values the toolbox can show, as paths inside actor.system. An actor type without the value leaves its cell empty.
 * `max` is the path of the upper bound; `fixed` columns are always shown (danger points actors have nothing else).
 */
const COLUMNS = [
  { key: 'raises', path: 'initiative', icon: 'fa-star-of-life', label: 'SVNSEA2E.Initiative' },
  { key: 'heropts', path: 'heropts', icon: 'fa-sun', label: 'SVNSEA2E.HeroPoints' },
  { key: 'wounds', path: 'wounds.value', max: 'wounds.max', icon: 'fa-heart', label: 'SVNSEA2E.Wounds' },
  { key: 'dwounds', path: 'dwounds.value', max: 'dwounds.max', icon: 'fa-heart-crack', label: 'SVNSEA2E.DramaWounds' },
  { key: 'points', path: 'points', icon: 'fa-skull', label: 'SVNSEA2E.DangerPoints', fixed: true },
];

/**
 * GM toolbox: a small window listing some values of the actors dropped on it, with +/- buttons to change them.
 * The list and the chosen columns are remembered between sessions.
 */
export class Toolbox extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: 'svnsea-toolbox',
    classes: ['svnsea2e', 'toolbox', 'themed', 'theme-dark'],
    window: {
      title: 'SVNSEA2E.Toolbox',
      minimizable: true,
      resizable: true,
      controls: [{ icon: 'fa-solid fa-gear', label: 'SVNSEA2E.ToolboxConfigure', action: 'configure' }],
    },
    position: { top: 20, width: 420, height: 'auto' },
    actions: {
      adjust: Toolbox.#onAdjust,
      configure: Toolbox.#onConfigure,
      openSheet: Toolbox.#onOpenSheet,
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

  /** Keys of the optional columns the GM chose to show. */
  get columnKeys() {
    const chosen = game.settings.get(SYSTEM_ID, 'toolboxColumns') ?? {};
    return COLUMNS.filter((column) => column.fixed || chosen[column.key] !== false).map((column) => column.key);
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
    options.position.left ??= Math.max(window.innerWidth - 770, 0);
    return options;
  }

  /** @override */
  async _prepareContext(options) {
    const actors = this.actorUuids.map((uuid) => fromUuidSync(uuid)).filter((actor) => actor);
    // Only the chosen columns that at least one of the actors has.
    const keys = this.columnKeys;
    const columns = COLUMNS.filter(
      (column) => keys.includes(column.key) && actors.some((actor) => getProperty(actor.system, column.path) !== undefined),
    );
    const rows = actors.map((actor) => ({
      uuid: actor.uuid,
      name: actor.name,
      cells: columns.map((column) => {
        const value = getProperty(actor.system, column.path);
        if (value === undefined) return null;
        const max = column.max && getProperty(actor.system, column.max);
        return { key: column.key, label: column.label, text: max ? `${value}/${max}` : `${value}` };
      }),
    }));
    return { columns, rows };
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

  /** +1 / -1 on a value; the updateActor hook re-renders the toolbox. */
  static async #onAdjust(event, target) {
    const actor = fromUuidSync(target.closest('[data-uuid]').dataset.uuid);
    const column = COLUMNS.find((c) => c.key === target.dataset.key);
    if (!actor || !column) return;
    const system = actor.system;
    const delta = Number(target.dataset.delta);
    const max = column.max ? getProperty(system, column.max) : Infinity;
    const value = clamp(getProperty(system, column.path) + delta, 0, max);

    // Raises are also the initiative of the actor's combatants.
    if (column.key === 'raises') return updateInitiative(actor.id, value);
    const update = { [`system.${column.path}`]: value };
    // Like the hearts of the sheet: marking wounds also marks the dramatic wounds they reach.
    if (column.key === 'wounds' && delta > 0 && system.dwounds) {
      update['system.dwounds.value'] = Math.max(system.dwounds.value, Math.trunc(value / actor.woundGroupSize));
    }
    await actor.update(update);
  }

  /** Choose the columns to show. */
  static async #onConfigure() {
    const keys = this.columnKeys;
    const content = COLUMNS.filter((column) => !column.fixed)
      .map(
        (column) => `<label class="checkbox">
          <input type="checkbox" name="${column.key}" ${keys.includes(column.key) ? 'checked' : ''} />
          <i class="fa-solid ${column.icon}"></i> ${game.i18n.localize(column.label)}
        </label>`,
      )
      .join('');
    const chosen = await DialogV2.wait({
      window: { title: 'SVNSEA2E.ToolboxConfigure' },
      classes: ['svnsea2e', 'toolbox-config'],
      content: `<p>${game.i18n.localize('SVNSEA2E.ToolboxColumns')}</p><div class="toolbox-columns">${content}</div>`,
      buttons: [
        {
          action: 'save',
          label: game.i18n.localize('SVNSEA2E.Save'),
          icon: 'fa-solid fa-floppy-disk',
          default: true,
          callback: (event, button) =>
            Object.fromEntries(COLUMNS.filter((c) => !c.fixed).map((c) => [c.key, button.form.elements[c.key].checked])),
        },
      ],
      rejectClose: false,
    });
    if (!chosen) return;
    await game.settings.set(SYSTEM_ID, 'toolboxColumns', chosen);
    this.render();
  }

  static #onOpenSheet(event, target) {
    fromUuidSync(target.closest('[data-uuid]').dataset.uuid)?.sheet.render(true);
  }

  static async #onRemoveActor(event, target) {
    const uuid = target.closest('[data-uuid]').dataset.uuid;
    await this._setActorUuids(this.actorUuids.filter((u) => u !== uuid));
  }
}
