/**
 * Set the initiative (raises) of an actor, both on the actor and on its combatants in the active combats.
 * @param {string} actorId
 * @param {number|string} value
 */
export async function updateInitiative(actorId, value) {
  let initiative = parseFloat(value);
  if (Number.isNaN(initiative)) return;
  initiative = Math.max(0, initiative);

  for (const combat of game.combats.filter((c) => c.active)) {
    const updates = combat.combatants
      .filter((c) => c.actorId === actorId || c.actor?.id === actorId)
      .map((c) => ({ _id: c.id, initiative }));
    if (updates.length) await combat.updateEmbeddedDocuments('Combatant', updates);
  }
  await game.actors.get(actorId)?.update({ 'system.initiative': initiative });
}

/** Add +1 / -1 raise buttons around each combatant's initiative in the combat tracker. */
export function onRenderCombatTracker(app, html) {
  const combat = app.viewed;
  if (!combat) return;

  for (const row of html.querySelectorAll('.combatant[data-combatant-id]')) {
    const combatant = combat.combatants.get(row.dataset.combatantId);
    const initiative = row.querySelector('.token-initiative');
    if (!combatant?.actor || !combatant.isOwner || !initiative || initiative.querySelector('.combat-btn')) continue;

    const makeButton = (delta) => {
      const button = document.createElement('a');
      button.className = `combat-btn ${delta > 0 ? 'add' : 'sub'}`;
      button.dataset.tooltip = delta > 0 ? '+1 Raise' : '-1 Raise';
      button.innerHTML = `<i class="fa-solid fa-${delta > 0 ? 'plus' : 'minus'}"></i>`;
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        updateInitiative(combatant.actor.id, (combatant.initiative || 0) + delta);
      });
      // Keep double clicks on the buttons from opening the actor sheet.
      button.addEventListener('dblclick', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      return button;
    };
    initiative.prepend(makeButton(1));
    initiative.append(makeButton(-1));
  }
}
