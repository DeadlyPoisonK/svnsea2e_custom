import { updateInitiative } from './combat.js';

/** "Add to initiative tracker" button of the roll cards. */
export function registerChatListeners() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('.initiative-tracker-add');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    updateInitiative(button.dataset.actor, button.dataset.raise);
  });
}
