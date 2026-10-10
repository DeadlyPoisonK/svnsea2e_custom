import { ItemTypes } from '../../enums.js';
import { enrichHTML, itemsOfType } from '../../helpers.js';
import { ACTOR_TEMPLATES, SvnSea2EActorSheet } from './base.js';

export class ShipSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ['ship'],
    actions: { removeCrew: ShipSheet.#onRemoveCrew },
  };
  static PARTS = {
    sheet: { template: `${ACTOR_TEMPLATES}/ship.hbs`, scrollable: ['.sheet-body .tab'] },
  };
  static TABS = {
    primary: {
      tabs: [
        { id: 'roster', label: 'SVNSEA2E.Roster' },
        { id: 'cargo', label: 'SVNSEA2E.Cargo' },
        { id: 'features', label: 'SVNSEA2E.Features' },
      ],
      initial: 'roster',
    },
  };

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.enrichedCargo = await enrichHTML(this.actor.system.cargo, { secrets: this.actor.isOwner, relativeTo: this.actor });
    context.crew = this._prepareCrew();
    return context;
  }

  _prepareItems(context) {
    context.adventures = itemsOfType(this.actor, ItemTypes.SHIP_ADVENTURE);
    context.backgrounds = itemsOfType(this.actor, ItemTypes.SHIP_BACKGROUND);
  }

  /** The roster: every role with the crew members currently assigned to it. */
  _prepareCrew() {
    const crew = Object.fromEntries(
      Object.entries(CONFIG.SVNSEA2E.crewRoles).map(([role, label]) => [role, { label, cssClass: role, role, actors: [] }]),
    );
    for (const { actorId, role } of this.actor.system.crew) {
      const member = game.actors.get(actorId);
      if (member && crew[role]) crew[role].actors.push(member);
    }
    return Object.values(crew);
  }

  /** @override */
  async _onRender(context, options) {
    await super._onRender(context, options);
    // Highlight the role under the cursor while dragging an actor over the roster.
    for (const header of this.element.querySelectorAll('.roster .item-header[data-role]')) {
      header.addEventListener('dragenter', () => header.classList.add('drag-over'));
      header.addEventListener('dragleave', (event) => {
        if (!header.contains(event.relatedTarget)) header.classList.remove('drag-over');
      });
      header.addEventListener('drop', () => header.classList.remove('drag-over'));
    }
  }

  /** An actor dropped on a role header joins the crew with that role. */
  async _onDropActor(event, actor) {
    if (!this.isEditable || actor.pack) return null;
    const role = event.target.closest('[data-role]')?.dataset.role;
    if (!role) return null;
    await this.actor.system.setCrewRole(actor.id, role);
    return actor;
  }

  static async #onRemoveCrew(event, target) {
    if (!this.isEditable) return;
    const actorId = target.closest('[data-actor-id]')?.dataset.actorId;
    if (actorId) await this.actor.system.removeCrewMember(actorId);
  }
}
