import { ItemTypes, SYSTEM_ID } from '../../enums.js';
import { enrichHTML, itemsOfType } from '../../helpers.js';
import { ACTOR_TEMPLATES, SvnSea2EActorSheet } from './base.js';

/** Crew roles in roster order, with their label key. */
const CREW_ROLES = {
  captain: 'Captain',
  firstmate: 'FirstMate',
  quartermaster: 'QuaterMaster',
  accountant: 'Accountant',
  boatswain: 'Boatswain',
  shipsmaster: 'ShipsMaster',
  captaintops: 'CaptainTops',
  surgeon: 'Surgeon',
  cook: 'Cook',
  mastergunner: 'MasterGunner',
  mastermariner: 'MasterMariner',
  midshipmen: 'Midshipmen',
  powdermonkey: 'PowderMonkey',
  ableseaman: 'AbleSeaman',
  seaman: 'Seaman',
};

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
    return context;
  }

  _prepareItems(context) {
    const system = this.actor.system;
    context.adventures = itemsOfType(this.actor, ItemTypes.SHIP_ADVENTURE);
    context.backgrounds = itemsOfType(this.actor, ItemTypes.SHIP_BACKGROUND);
    context.origin = system.origin;
    context.class = system.class;
    context.crewstatus = system.crewstatus;
    context.cargo = system.cargo;
    context.crew = this._prepareCrew();
  }

  /** The roster: every role with the crew members currently assigned to it. */
  _prepareCrew() {
    const crew = Object.fromEntries(
      Object.entries(CREW_ROLES).map(([role, label]) => [
        role,
        { label: game.i18n.localize(`SVNSEA2E.${label}`), cssClass: role, role, actors: [] },
      ]),
    );
    const members = this.actor.getFlag(SYSTEM_ID, 'shipsCrew')?.members ?? [];
    for (const id of members) {
      const member = game.actors.get(id);
      const role = member?.getFlag(SYSTEM_ID, 'crewMember')?.role;
      if (role && crew[role]) crew[role].actors.push(member);
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

  /** Crew members are dragged as actors. */
  async _onDragStart(event) {
    const row = event.currentTarget;
    if (row.dataset.actorId) {
      const actor = game.actors.get(row.dataset.actorId);
      if (actor) event.dataTransfer.setData('text/plain', JSON.stringify(actor.toDragData()));
      return;
    }
    return super._onDragStart(event);
  }

  /** An actor dropped on a role header joins the crew with that role. */
  async _onDropActor(event, actor) {
    if (!this.isEditable || actor.pack) return null;
    const role = event.target.closest('[data-role]')?.dataset.role;
    if (!role) return null;
    const members = this.actor.getFlag(SYSTEM_ID, 'shipsCrew')?.members ?? [];
    await actor.setCrewMemberRole(this.actor.id, role);
    if (!members.includes(actor.id)) {
      await this.actor.setFlag(SYSTEM_ID, 'shipsCrew', { members: [...members, actor.id] });
    } else {
      this.render();
    }
    return actor;
  }

  static async #onRemoveCrew(event, target) {
    if (!this.isEditable) return;
    const actorId = target.closest('[data-actor-id]')?.dataset.actorId;
    await game.actors.get(actorId)?.removeFromCrew();
    const members = this.actor.getFlag(SYSTEM_ID, 'shipsCrew')?.members;
    if (!members) return;
    await this.actor.setFlag(SYSTEM_ID, 'shipsCrew', { members: members.filter((id) => id !== actorId) });
  }
}
