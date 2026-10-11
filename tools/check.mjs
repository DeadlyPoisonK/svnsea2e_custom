/**
 * Static checks that need no running Foundry:
 *  - every template compiles and every partial it uses exists and is preloaded;
 *  - every data-action used in a template is handled by some application;
 *  - every SVNSEA2E.* localization key used in the code or templates exists in every language;
 *  - every file referenced by system.json exists.
 * Run with `npm run check` (after `npm run build`).
 */
import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';

const root = path.resolve(import.meta.dirname, '..');
const errors = [];
const walk = (dir, ext) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, ext);
    return full.endsWith(ext) ? [full] : [];
  });
const rel = (file) => path.relative(root, file);

const templates = walk(path.join(root, 'templates'), '.hbs');
const sources = walk(path.join(root, 'src'), '.js').concat(walk(path.join(root, 'src'), '.mjs'));
const sourceText = sources.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

// Templates compile; partials exist and are preloaded.
const preloaded = new Set([...sourceText.matchAll(/'((?:actors|items|parts)\/parts\/[\w-]+\.hbs|parts\/[\w-]+\.hbs)'/g)].map((m) => m[1]));
for (const file of templates) {
  const text = fs.readFileSync(file, 'utf8');
  try {
    Handlebars.precompile(text);
  } catch (err) {
    errors.push(`${rel(file)}: does not compile: ${err.message.split('\n')[0]}`);
  }
  for (const [, partial] of text.matchAll(/{{#?>\s*"systems\/svnsea2e\/templates\/([^"]+)"/g)) {
    if (!fs.existsSync(path.join(root, 'templates', partial))) errors.push(`${rel(file)}: missing partial ${partial}`);
    else if (!preloaded.has(partial)) errors.push(`${rel(file)}: partial ${partial} is not preloaded in src/templates.js`);
  }
}

// Template paths used in the code exist.
for (const [, tpl] of sourceText.matchAll(/\$\{(?:TEMPLATES|ITEM_TEMPLATES|ACTOR_TEMPLATES)\}\/([\w/-]+\.hbs)/g)) {
  const full = tpl.includes('/') ? tpl : null;
  const candidates = [path.join(root, 'templates', tpl), path.join(root, 'templates/items', tpl), path.join(root, 'templates/actors', tpl)];
  if (full && !candidates.some((c) => fs.existsSync(c))) errors.push(`src: template ${tpl} not found`);
}

// data-action handlers.
const builtInActions = new Set(['tab', 'editImage', 'configureSheet', 'configureOwnership', 'copyUuid', 'close', 'toggleControls']);
// Handlers are private static methods (`name: Sheet.#onName`) or shared functions (`name: onName`, src/effects.js).
const handled = new Set([...sourceText.matchAll(/(\w+):\s*(?:\w+\.#on\w+|on[A-Z]\w*)\b/g)].map((m) => m[1]));
for (const file of templates) {
  for (const [, action] of fs.readFileSync(file, 'utf8').matchAll(/data-action="(\w+)"/g)) {
    if (!builtInActions.has(action) && !handled.has(action)) errors.push(`${rel(file)}: no handler for data-action="${action}"`);
  }
}

// Localization keys.
const langFiles = walk(path.join(root, 'lang'), '.json');
const langs = Object.fromEntries(langFiles.map((f) => [path.basename(f, '.json'), JSON.parse(fs.readFileSync(f, 'utf8'))]));
const usedKeys = new Set();
const scan = (text) => {
  for (const [, key] of text.matchAll(/["'`](SVNSEA2E\.[A-Za-z0-9_.]+)["'`]/g)) usedKeys.add(key);
};
scan(sourceText);
templates.forEach((f) => scan(fs.readFileSync(f, 'utf8')));
// Keys built at runtime: `SVNSEA2E.New${type}`.
for (const type of ['advantage', 'artifact', 'background', 'duelstyle', 'monsterquality', 'scheme', 'secretsociety', 'shipadventure', 'shipbackground', 'sorcery', 'story', 'virtue', 'hubris']) {
  usedKeys.add(`SVNSEA2E.New${type}`);
}
for (const [lang, strings] of Object.entries(langs)) {
  const missing = [...usedKeys].filter((key) => !(key in strings) && !key.endsWith('.'));
  if (missing.length) errors.push(`lang/${lang}.json: missing ${missing.length} keys: ${missing.join(', ')}`);
}

// Files referenced by system.json.
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'system.json'), 'utf8'));
for (const file of [...manifest.esmodules, ...manifest.styles, ...manifest.languages.map((l) => l.path)]) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`system.json: missing file ${file}`);
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${templates.length} templates, ${handled.size} actions, ${usedKeys.size} localization keys × ${langFiles.length} languages: all good`);
