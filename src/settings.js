import { SYSTEM_ID } from './enums.js';

export function registerSystemSettings() {
  // Track the system version upon which point a migration was last applied.
  game.settings.register(SYSTEM_ID, 'systemMigrationVersion', {
    name: 'System Migration Version',
    scope: 'world',
    config: false,
    type: String,
    default: '',
  });

  // Actors the GM pinned to the toolbox, kept between sessions.
  game.settings.register(SYSTEM_ID, 'toolboxActors', {
    name: 'Toolbox actors',
    scope: 'client',
    config: false,
    type: Array,
    default: [],
  });

  // Optional toolbox columns, by key: false hides one. Columns added later show up until the GM hides them.
  game.settings.register(SYSTEM_ID, 'toolboxColumns', {
    name: 'Toolbox columns',
    scope: 'client',
    config: false,
    type: Object,
    default: {},
  });
}
