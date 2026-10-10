import { updateInitiative } from './combat.js';
import { ROLL_MESSAGE } from './roll/message.js';

/**
 * Button of the roll cards: set the actor's raises to those of this roll, even when another roll set them this round.
 * The roll messages of v25 count their raises again (they may have been edited) and are followed by later edits.
 */
export function registerChatListeners() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('.initiative-tracker-add');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const message = game.messages.get(button.closest('[data-message-id]')?.dataset.messageId);
    if (message?.type === ROLL_MESSAGE) updateInitiative(button.dataset.actor, message.system.resolve().raises, { message });
    else updateInitiative(button.dataset.actor, button.dataset.raise);
  });
}

/** Paints the message header with its author's player color; the CSS falls back to the system red. */
export function onRenderChatMessage(message, html) {
  const color = message.author?.color;
  if (!color) return;
  html.style.setProperty('--svnsea-author-color', color.css);
  html.style.setProperty('--svnsea-author-text', isLight(color) ? '#000' : '#fff');
}

/** Whether black text contrasts better than white on this color (WCAG relative luminance). */
function isLight(color) {
  const [r, g, b] = color.rgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179;
}
