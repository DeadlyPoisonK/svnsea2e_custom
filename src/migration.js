import { ActorType, ItemTypes, SYSTEM_ID } from './enums.js';
import { hardToKillEffectData } from './effects.js';

/**
 * Data migrations, oldest first. Each entry runs once per world, when the world was last migrated
 * with a system version older than `version`.
 *
 * - `prepare()` runs before any document is migrated, to collect what the other steps need.
 * - `actor(actor)` / `item(item)` return an update object (empty when nothing changes). They only see the actors of
 *   the world and of its compendiums.
 * - `afterActor(actor)` / `afterItem(item)` are async and make their own changes, after the updates. `afterActor` also
 *   sees the actors of the unlinked tokens of every scene (`actor.isToken`), after the world actors.
 *
 * Changes of shape that can be done while reading the data (renamed or retyped fields, values out of bounds) go
 * in the `migrateData` of the data models instead: they also cover compendiums and imported documents.
 *
 * @type {{version: string, prepare?: () => void, actor?: (actor: Actor) => object, item?: (item: Item) => object,
 *   afterActor?: (actor: Actor) => Promise<void>, afterItem?: (item: Item) => Promise<void>}[]}
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
  {
    // Hard To Kill: an active effect that overrides `system.htk` replaces the toggle of the sheet. The effect goes on
    // the actor's Hard To Kill advantage, or on the actor when it has none, and the stored `htk` goes back to false.
    version: '25.0',
    async afterActor(actor) {
      if (!('htk' in actor.system)) return;
      const advantages = actor.items.filter((item) => isHardToKill(item));
      // An unlinked token only needs the effect when its own data turned Hard To Kill on: otherwise it has the one of
      // its world actor. It goes on the token actor, so that its advantage is not copied into the token data.
      const stored = actor.isToken ? actor.token.delta?._source.system?.htk : actor._source.system.htk;
      if (stored === true) {
        if (!hasHardToKillEffect(actor) && !advantages.some(hasHardToKillEffect)) {
          const holder = actor.isToken ? actor : (advantages[0] ?? actor);
          await holder.createEmbeddedDocuments('ActiveEffect', [hardToKillEffectData()]);
        }
        await actor.update({ 'system.htk': false });
      } else if (!actor.isToken) {
        // The advantage without the toggle on: the effect starts disabled, so that the wounds do not change.
        for (const advantage of advantages.filter((a) => !hasHardToKillEffect(a))) {
          await advantage.createEmbeddedDocuments('ActiveEffect', [{ ...hardToKillEffectData(), disabled: true }]);
        }
      }
    },
    async afterItem(item) {
      if (isHardToKill(item) && !hasHardToKillEffect(item)) {
        await item.createEmbeddedDocuments('ActiveEffect', [hardToKillEffectData()]);
      }
    },
  },
];

/** Names of the Hard To Kill advantage in the user's compendiums (English and Spanish), in lower case. */
const HARD_TO_KILL_NAMES = ['hard to kill', 'duro de matar'];

const isHardToKill = (item) =>
  item.type === ItemTypes.ADVANTAGE && HARD_TO_KILL_NAMES.includes(item.name.trim().toLowerCase());

const hasHardToKillEffect = (document) =>
  document.effects.some((effect) => effect.system.changes.some((change) => change.key === 'system.htk'));

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

  const migrateItem = async (item) => {
    await applyUpdate(item, itemUpdate(item));
    await runSteps(migrations, 'afterItem', item);
  };
  const migrateActor = async (actor) => {
    await applyUpdate(actor, actorUpdate(actor));
    const itemUpdates = actor.items.map((item) => ({ ...itemUpdate(item), _id: item.id })).filter((u) => Object.keys(u).length > 1);
    if (itemUpdates.length) await actor.updateEmbeddedDocuments('Item', itemUpdates);
    await runSteps(migrations, 'afterActor', actor);
  };

  for (const actor of game.actors) await migrateActor(actor);
  for (const item of game.items) await migrateItem(item);

  // The actors of unlinked tokens keep their own copy of what differs from their world actor.
  for (const scene of game.scenes) {
    for (const token of scene.tokens) {
      if (!token.actorLink && token.actor) await runSteps(migrations, 'afterActor', token.actor);
    }
  }

  for (const pack of game.packs) {
    if (pack.metadata.packageType !== 'world' || !['Actor', 'Item'].includes(pack.documentName)) continue;
    const wasLocked = pack.locked;
    await pack.configure({ locked: false });
    for (const doc of await pack.getDocuments()) {
      if (pack.documentName === 'Actor') await migrateActor(doc);
      else await migrateItem(doc);
    }
    await pack.configure({ locked: wasLocked });
  }

  ui.notifications.info(`7th Sea 2E System Migration to version ${game.system.version} completed!`, { permanent: true });
}

function collectUpdates(migrations, kind, doc) {
  return migrations.reduce((update, m) => Object.assign(update, m[kind]?.call(m, doc) ?? {}), {});
}

/** Run the async steps of the migrations on a document; an error is logged and does not stop the migration. */
async function runSteps(migrations, kind, doc) {
  for (const m of migrations) {
    if (!m[kind]) continue;
    try {
      await m[kind].call(m, doc);
    } catch (err) {
      console.error(`7th Sea 2E | Migration of ${doc.documentName} ${doc.name} failed`, err);
    }
  }
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
