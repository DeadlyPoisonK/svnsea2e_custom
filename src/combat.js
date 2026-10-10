import { ActorType, SYSTEM_ID } from './enums.js';

/**
 * Action Sequence. The raises of the round are the initiative of each combatant; the actor keeps a copy in
 * `system.initiative` (shown by the toolbox, used out of combat). During a combat the combatant is the source: with
 * unlinked tokens each token has its own combatant and its own actor, so they do not overwrite each other.
 *
 * The first roll of a combatant in a round sets its raises (`flags.svnsea2e.roll` remembers the round, the message
 * and the raises). Later rolls of that round leave them alone; the button of the roll card sets them on purpose.
 * Editing the roll that set them adds the difference. A new round clears them all.
 */

/** Rounds 0 (before the combat begins, when the approaches are rolled) and 1 are the same round of raises. */
const raisesRound = (combat) => Math.max(combat.round ?? 0, 1);

/** Villains (and their monsters and brutes) act first on ties with heroes. */
const actsFirstOnTies = (combatant) => {
  const actor = combatant.actor;
  return !!(actor?.system?.isVillain || actor?.type === ActorType.BRUTE);
};

/** Turn order: most raises first, then villains, then by name. Without raises at the end. */
function compareTurns(a, ia, b, ib) {
  ia = Number.isFinite(ia) ? ia : -Infinity;
  ib = Number.isFinite(ib) ? ib : -Infinity;
  return (
    ib - ia ||
    Number(actsFirstOnTies(b)) - Number(actsFirstOnTies(a)) ||
    (a.name ?? '').localeCompare(b.name ?? '') ||
    (a.id > b.id ? 1 : -1)
  );
}

export class SvnSea2ECombat extends Combat {
  /** @override Called unbound by Combat#setupTurns. */
  _sortCombatants(a, b) {
    return compareTurns(a, a.initiative, b, b.initiative);
  }

  /**
   * Set the raises of some combatants (updates with `_id` and `initiative`).
   * @param {object[]} updates
   * @param {object} [options]
   * @param {boolean} [options.keepTurn=true]   Keep the turn on the current combatant. Without it the turn keeps its
   *   place: at the beginning of the round, the first one, on whoever has the most raises.
   */
  async updateRaises(updates, { keepTurn = true } = {}) {
    if (!updates.length) return;
    const options = { turnEvents: false };
    if (!keepTurn && this.turn !== null) options.combatTurn = this.turn;
    await this.updateEmbeddedDocuments('Combatant', updates, options);
  }

  /**
   * The turn that keeps the current combatant after these changes of initiative, or null when nothing moves. Foundry
   * keeps the turn index, so the turn would jump to whoever takes that place in the new order.
   * @param {object[]} updates   Combatant changes with `_id`.
   */
  turnKeepingCurrent(updates) {
    const current = this.combatant;
    if (!current || this.turn === null || !updates.some((u) => 'initiative' in u)) return null;
    const values = new Map(updates.filter((u) => 'initiative' in u).map((u) => [u._id, u.initiative]));
    const value = (c) => (values.has(c.id) ? values.get(c.id) : c.initiative);
    const order = this.combatants.contents.sort((a, b) => compareTurns(a, value(a), b, value(b)));
    const turn = order.findIndex((c) => c.id === current.id);
    return turn === this.turn ? null : turn;
  }

  /** @override The raises come from the rolls of the system: Foundry's d20 initiative is not rolled. */
  async rollInitiative() {
    return this;
  }

  /** @override A new round clears the raises; the active GM does it, as a player may advance the round. */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
    if ('round' in changed && options.direction > 0 && changed.round > 1 && game.user.isActiveGM) this.clearRaises();
  }

  /** Clear the raises of every combatant. Their marks of having rolled belong to the past round: they no longer count. */
  async clearRaises() {
    const updates = this.combatants.filter((c) => c.initiative !== null).map((c) => ({ _id: c.id, initiative: null }));
    await this.updateRaises(updates, { keepTurn: false });
  }
}

export class SvnSea2ECombatant extends Combatant {
  /** @override Any change of raises (rolls, buttons, the tracker's own field) keeps the turn on the same combatant. */
  static async _preUpdateOperation(documents, operation, user) {
    const combat = operation.parent ?? documents[0]?.parent;
    if (combat?.turnKeepingCurrent && operation.combatTurn === undefined) {
      const turn = combat.turnKeepingCurrent(operation.updates ?? []);
      if (turn !== null) operation.combatTurn = turn;
    }
    return super._preUpdateOperation(documents, operation, user);
  }

  /** The roll that set the raises of the current round, if any: `{round, message, raises}`. */
  get raisesRoll() {
    const roll = this.getFlag(SYSTEM_ID, 'roll');
    return roll && this.parent && roll.round === raisesRound(this.parent) ? roll : null;
  }

  /** @override Keep the copy of the raises on the actor (the token's actor when unlinked). */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
    if (userId !== game.user.id || !('initiative' in changed)) return;
    const actor = this.actor;
    const value = changed.initiative ?? 0;
    if (actor?.isOwner && 'initiative' in actor.system && actor.system.initiative !== value) {
      actor.update({ 'system.initiative': value });
    }
  }
}

/** The actor of a roll card: v25 cards keep its UUID (the token's actor when unlinked), older ones its id. */
export function actorFrom(ref) {
  if (!ref) return null;
  if (typeof ref !== 'string') return ref;
  return ref.includes('.') ? fromUuidSync(ref) : game.actors.get(ref);
}

/** Combatants of the actor in the active combats that the user may change. */
export function combatantsOf(actor) {
  return game.combats
    .filter((combat) => combat.active)
    .flatMap((combat) => combat.combatants.filter((c) => c.isOwner && c.actor && (c.actor === actor || c.actor.uuid === actor.uuid)));
}

/** Group the combatant updates by combat and apply them. */
async function updateCombatants(updates, options) {
  const byCombat = new Map();
  for (const [combatant, update] of updates) {
    const combat = combatant.parent;
    if (!byCombat.has(combat)) byCombat.set(combat, []);
    byCombat.get(combat).push({ _id: combatant.id, ...update });
  }
  for (const [combat, list] of byCombat) await combat.updateRaises(list, options);
}

/**
 * Set the initiative (raises) of an actor: on its combatants in the active combats, which copy it to the actor, or
 * on the actor alone when it is not in a combat.
 * @param {Actor|string} actorRef   The actor, its UUID or (v24 cards and macros) the id of a world actor.
 * @param {number|string} value
 * @param {object} [options]
 * @param {ChatMessage} [options.message]   The roll that sets them, to follow its edits.
 */
export async function updateInitiative(actorRef, value, { message } = {}) {
  const actor = actorFrom(actorRef);
  let initiative = parseFloat(value);
  if (!actor || Number.isNaN(initiative)) return;
  initiative = Math.max(0, initiative);

  const combatants = combatantsOf(actor);
  if (!combatants.length) {
    if (actor.isOwner && 'initiative' in actor.system) await actor.update({ 'system.initiative': initiative });
    return;
  }
  await updateCombatants(
    combatants.map((c) => {
      const update = { initiative };
      if (message) update[`flags.${SYSTEM_ID}.roll`] = { round: raisesRound(c.parent), message: message.id, raises: initiative };
      return [c, update];
    }),
  );
}

/** The first roll of a combatant in the round sets its raises. The turn keeps its place, on the most raises. */
export async function setRaisesFromRoll(actor, message) {
  if (!actor || !message) return;
  const raises = message.system.resolve().raises;
  const combatants = combatantsOf(actor).filter((c) => !c.raisesRoll);
  await updateCombatants(
    combatants.map((c) => [
      c,
      { initiative: raises, [`flags.${SYSTEM_ID}.roll`]: { round: raisesRound(c.parent), message: message.id, raises } },
    ]),
    { keepTurn: false },
  );
}

/** An edited roll changes the raises it set this round by the difference: the raises already spent stay spent. */
export async function updateRaisesFromEdit(actor, message) {
  if (!actor || !message) return;
  const raises = message.system.resolve().raises;
  const updates = [];
  for (const combatant of combatantsOf(actor)) {
    const roll = combatant.raisesRoll;
    if (roll?.message !== message.id || roll.raises === raises) continue;
    const initiative = Math.max(0, (combatant.initiative ?? 0) + raises - roll.raises);
    updates.push([combatant, { initiative, [`flags.${SYSTEM_ID}.roll`]: { ...roll, raises } }]);
  }
  await updateCombatants(updates);
}

/**
 * Combat tracker: -1 / +1 raise buttons around each combatant's raises, and no d20 initiative buttons (the raises
 * come from the rolls).
 */
export function onRenderCombatTracker(app, html) {
  for (const action of ['rollAll', 'rollNPC']) {
    const button = html.querySelector(`[data-action="${action}"]`);
    if (!button) continue;
    const spacer = document.createElement('div');
    spacer.className = 'spacer';
    button.replaceWith(spacer);
  }

  const combat = app.viewed;
  if (!combat) return;
  for (const row of html.querySelectorAll('.combatant[data-combatant-id]')) {
    const combatant = combat.combatants.get(row.dataset.combatantId);
    const initiative = row.querySelector('.token-initiative');
    if (!initiative || initiative.querySelector('.combat-btn, .no-raises')) continue;
    initiative.querySelector('[data-action="rollInitiative"]')?.remove();
    if (!Number.isFinite(combatant?.initiative)) {
      const empty = document.createElement('span');
      empty.className = 'no-raises';
      empty.textContent = '–';
      initiative.append(empty);
    }
    if (!combatant?.actor || !combatant.isOwner) continue;

    const makeButton = (delta) => {
      const button = document.createElement('a');
      button.className = `combat-btn ${delta > 0 ? 'add' : 'sub'}`;
      button.dataset.tooltip = delta > 0 ? '+1 Raise' : '-1 Raise';
      button.innerHTML = `<i class="fa-solid fa-${delta > 0 ? 'plus' : 'minus'}"></i>`;
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        combat.updateRaises([{ _id: combatant.id, initiative: Math.max(0, (combatant.initiative || 0) + delta) }]);
      });
      // Keep double clicks on the buttons from opening the actor sheet.
      button.addEventListener('dblclick', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      return button;
    };
    initiative.prepend(makeButton(-1));
    initiative.append(makeButton(1));
  }
}

/** No "Re-roll Initiative" in the context menu of the combatants (the hook takes the name of the tracker class). */
export function onGetCombatTrackerContextOptions(app, options) {
  const index = options.findIndex((option) => option.label === 'COMBATANT.ACTIONS.Reroll');
  if (index >= 0) options.splice(index, 1);
}
