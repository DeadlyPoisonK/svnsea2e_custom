import { TEMPLATES } from '../enums.js';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * A checkbox list that stores the chosen keys in an array field of a document
 * (background skills and advantages).
 */
export class ChoiceSelector extends HandlebarsApplicationMixin(ApplicationV2) {
  /**
   * @param {object} config
   * @param {foundry.abstract.Document} config.document  The document to update.
   * @param {string} config.field                        Path of the array field, e.g. "system.skills".
   * @param {Record<string, string>} config.choices      Available choices as {key: label}.
   * @param {string} config.title
   */
  constructor({ document, field, choices, title, ...options }) {
    super(options);
    this.document = document;
    this.field = field;
    this.choices = choices;
    this.selectorTitle = title;
  }

  static DEFAULT_OPTIONS = {
    tag: 'form',
    // Up to v23.3 the selectors were Application V1 windows, always light.
    classes: ['svnsea2e', 'choice-selector', 'themed', 'theme-light'],
    position: { width: 320, height: 'auto' },
    window: { contentClasses: ['standard-form'] },
    form: { handler: ChoiceSelector.#onSubmit, closeOnSubmit: true },
  };

  static PARTS = {
    form: { template: `${TEMPLATES}/apps/choice-selector.hbs`, scrollable: ['.choice-list'] },
  };

  /** @override */
  get title() {
    return this.selectorTitle ?? super.title;
  }

  /** @override */
  async _prepareContext(options) {
    const chosen = foundry.utils.getProperty(this.document, this.field) ?? [];
    return {
      choices: Object.entries(this.choices).map(([key, label]) => ({
        key,
        label: game.i18n.localize(label),
        chosen: chosen.includes(key),
      })),
    };
  }

  static async #onSubmit(event, form) {
    // Read the checkboxes directly: keys may contain dots, which form data would expand.
    const chosen = [...form.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
    await this.document.update({ [this.field]: chosen });
  }
}
