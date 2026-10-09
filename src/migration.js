import { SYSTEM_ID } from './enums.js';

/**
 * Data migrations, oldest first. Each entry runs once per world, when the world was last migrated
 * with a system version older than `version`.
 *
 * - `actor(actor)` / `item(item)` return an update object (empty when nothing changes).
 *
 * The v24 schema is identical to v23, so there is nothing to migrate yet; add entries here
 * when a future version changes the data model.
 *
 * @type {{version: string, actor?: (actor: Actor) => object, item?: (item: Item) => object}[]}
 */
export const MIGRATIONS = [];

/** Run the pending migrations, if any, on the active GM's client. */
export async function migrateWorldIfNeeded() {
  if (!game.users.activeGM?.isSelf) return;
  const lastMigrated = game.settings.get(SYSTEM_ID, 'systemMigrationVersion');
  const pending = MIGRATIONS.filter(
    (m) => !lastMigrated || foundry.utils.isNewerVersion(m.version, lastMigrated),
  );
  if (pending.length) await migrateWorld(pending);
  if (lastMigrated !== game.system.version) {
    await game.settings.set(SYSTEM_ID, 'systemMigrationVersion', game.system.version);
  }
}

async function migrateWorld(migrations) {
  ui.notifications.info(
    `Applying 7th Sea 2E System Migration for version ${game.system.version}. Please be patient and do not close your game or shut down your server.`,
    { permanent: true },
  );

  const actorUpdate = (actor) => collectUpdates(migrations, 'actor', actor);
  const itemUpdate = (item) => collectUpdates(migrations, 'item', item);

  for (const actor of game.actors) await migrateActor(actor, actorUpdate, itemUpdate);
  for (const item of game.items) await applyUpdate(item, itemUpdate(item));

  for (const pack of game.packs) {
    if (pack.metadata.packageType !== 'world' || !['Actor', 'Item'].includes(pack.documentName)) continue;
    const wasLocked = pack.locked;
    await pack.configure({ locked: false });
    for (const doc of await pack.getDocuments()) {
      if (pack.documentName === 'Actor') await migrateActor(doc, actorUpdate, itemUpdate);
      else await applyUpdate(doc, itemUpdate(doc));
    }
    await pack.configure({ locked: wasLocked });
  }

  ui.notifications.info(`7th Sea 2E System Migration to version ${game.system.version} completed!`, { permanent: true });
}

async function migrateActor(actor, actorUpdate, itemUpdate) {
  await applyUpdate(actor, actorUpdate(actor));
  const itemUpdates = actor.items.map((item) => ({ ...itemUpdate(item), _id: item.id })).filter((u) => Object.keys(u).length > 1);
  if (itemUpdates.length) await actor.updateEmbeddedDocuments('Item', itemUpdates);
}

function collectUpdates(migrations, kind, doc) {
  return migrations.reduce((update, m) => Object.assign(update, m[kind]?.(doc) ?? {}), {});
}

async function applyUpdate(doc, update) {
  if (foundry.utils.isEmpty(update)) return;
  try {
    console.log(`7th Sea 2E | Migrating ${doc.documentName} ${doc.name}`);
    await doc.update(update, { diff: false });
  } catch (err) {
    console.error(err);
  }
}
