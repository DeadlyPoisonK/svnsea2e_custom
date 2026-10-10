import { ActorType, SYSTEM_ID } from './enums.js';

/**
 * Data migrations, oldest first. Each entry runs once per world, when the world was last migrated
 * with a system version older than `version`.
 *
 * - `prepare()` runs before any document is migrated, to collect what the other steps need.
 * - `actor(actor)` / `item(item)` return an update object (empty when nothing changes).
 *
 * Changes of shape that can be done while reading the data (renamed or retyped fields, values out of bounds) go
 * in the `migrateData` of the data models instead: they also cover compendiums and imported documents.
 *
 * @type {{version: string, prepare?: () => void, actor?: (actor: Actor) => object, item?: (item: Item) => object}[]}
 */
export const MIGRATIONS = [
  {
    // The ship roster moves from two flags (the members on the ship, the role on each member) to `system.crew`.
    version: '25.0',
    prepare() {
      this.roles = new Map(game.actors.map((actor) => [actor.id, actor.getFlag(SYSTEM_ID, 'crewMember')?.role]));
    },
    actor(actor) {
      const flags = actor.flags[SYSTEM_ID] ?? {};
      const update = {};
      const remove = () => new foundry.data.operators.ForcedDeletion();
      if ('crewMember' in flags) update[`flags.${SYSTEM_ID}.crewMember`] = remove();
      if ('shipsCrew' in flags) {
        update[`flags.${SYSTEM_ID}.shipsCrew`] = remove();
        if (actor.type === ActorType.SHIP) {
          const members = flags.shipsCrew?.members ?? [];
          update['system.crew'] = members
            .map((actorId) => ({ actorId, role: this.roles?.get(actorId) }))
            .filter((member) => member.role);
        }
      }
      return update;
    },
  },
];

/** Run the pending migrations, if any, on the active GM's client. */
export async function migrateWorldIfNeeded() {
  if (!game.users.activeGM?.isSelf) return;
  const lastMigrated = game.settings.get(SYSTEM_ID, 'systemMigrationVersion');
  const pending = MIGRATIONS.filter(
    (m) => !lastMigrated || foundry.utils.isNewerVersion(m.version, lastMigrated),
  );
  if (pending.length) await migrateWorld(pending);
  // Remember the newest version migrated to, even when it is not released yet, so that no migration runs twice.
  const migrated = [game.system.version, lastMigrated, ...pending.map((m) => m.version)].filter(Boolean).reduce((a, b) =>
    foundry.utils.isNewerVersion(b, a) ? b : a,
  );
  if (lastMigrated !== migrated) await game.settings.set(SYSTEM_ID, 'systemMigrationVersion', migrated);
}

async function migrateWorld(migrations) {
  ui.notifications.info(
    `Applying 7th Sea 2E System Migration for version ${game.system.version}. Please be patient and do not close your game or shut down your server.`,
    { permanent: true },
  );

  for (const migration of migrations) migration.prepare?.();
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
  return migrations.reduce((update, m) => Object.assign(update, m[kind]?.call(m, doc) ?? {}), {});
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
