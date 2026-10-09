import js from '@eslint/js';
import globals from 'globals';

const foundryGlobals = Object.fromEntries(
  [
    'foundry', 'game', 'ui', 'canvas', 'CONFIG', 'CONST', 'Hooks', 'Handlebars',
    'Actor', 'Item', 'ChatMessage', 'Roll', 'Combat', 'fromUuid', 'fromUuidSync',
  ].map((name) => [name, 'readonly']),
);

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,mjs}', 'tools/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...foundryGlobals },
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }],
      // Deprecated/removed Foundry globals: use the namespaced versions instead.
      'no-restricted-globals': [
        'error',
        ...[
          'renderTemplate', 'loadTemplates', 'getTemplate', 'TextEditor', 'Actors', 'Items',
          'ActorSheet', 'ItemSheet', 'FormApplication', 'Application', 'Dialog', 'DocumentSheetConfig',
          'mergeObject', 'duplicate', 'expandObject', 'getProperty', 'setProperty', 'isNewerVersion',
          'FilePicker', 'DragDrop', 'ContextMenu', '$', 'jQuery',
        ].map((name) => ({ name, message: 'Deprecated in Foundry v13+; use the foundry.* namespace.' })),
      ],
    },
  },
  {
    files: ['tools/**/*.mjs'],
    languageOptions: { globals: { ...globals.node } },
  },
];
