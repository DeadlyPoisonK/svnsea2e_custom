/**
 * Build the compendiums of the system: every packs/_source/<pack>/*.json becomes one document of the LevelDB pack
 * packs/<pack>, which is committed (the release zip takes it as is).
 *
 * LevelDB is written with the `classic-level` module of the Foundry install (no extra dependency): set FOUNDRY_APP
 * to its `resources/app` folder if it is not the default one. Close the world first: Foundry locks the packs it uses.
 * Run with `npm run build:packs`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '..');
const foundryApp = process.env.FOUNDRY_APP ?? 'E:/Foundry Virtual Tabletop 12/resources/app';
const { ClassicLevel } = createRequire(path.join(foundryApp, 'package.json'))('classic-level');

/** LevelDB key prefix of each pack type, as Foundry stores them. */
const COLLECTIONS = { ActiveEffect: 'effects', Item: 'items', Actor: 'actors', JournalEntry: 'journal', Macro: 'macros' };

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'system.json'), 'utf8'));
for (const pack of manifest.packs ?? []) {
  const source = path.join(root, 'packs/_source', pack.name);
  const target = path.join(root, pack.path);
  const collection = COLLECTIONS[pack.type];
  if (!collection) throw new Error(`${pack.name}: unsupported pack type ${pack.type}`);
  fs.rmSync(target, { recursive: true, force: true });
  const db = new ClassicLevel(target, { keyEncoding: 'utf8', valueEncoding: 'json' });
  await db.open();
  const files = fs.readdirSync(source).filter((file) => file.endsWith('.json'));
  const batch = db.batch();
  for (const file of files) {
    const doc = JSON.parse(fs.readFileSync(path.join(source, file), 'utf8'));
    batch.put(`!${collection}!${doc._id}`, doc);
  }
  await batch.write();
  // Move everything from the write-ahead log into the table files.
  await db.compactRange('!', '~');
  await db.close();
  for (const file of ['LOCK', 'LOG', 'LOG.old']) fs.rmSync(path.join(target, file), { force: true });
  console.log(`${pack.name}: ${files.length} documents → ${pack.path}`);
}
