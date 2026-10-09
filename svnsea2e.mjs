const SVNSEA2E = {};
SVNSEA2E.ASCII = `
==================================================
  _____ _   _       ____
 |___  | |_| |__   / ___|  ___  __ _
    / /| __| '_ \\  \\___ \\ / _ \\/ _\` |
   / / | |_| | | |  ___) |  __/ (_| |
  /_/   \\__|_| |_| |____/ \\___|\\__,_|
==================================================`;
SVNSEA2E.itemTypes = {
  advantage: "SVNSEA2E.Advantage",
  artifact: "SVNSEA2E.Artifact",
  background: "SVNSEA2E.Background",
  duelstyle: "SVNSEA2E.DuelStyle",
  monsterquality: "SVNSEA2E.MonsterQuality",
  scheme: "SVNSEA2E.Scheme",
  secretsociety: "SVNSEA2E.SecretSociety",
  shipadventure: "SVNSEA2E.ShipAdventure",
  shipbackground: "SVNSEA2E.ShipBackground",
  sorcery: "SVNSEA2E.Sorcery",
  story: "SVNSEA2E.Story",
  hubris: "SVNSEA2E.Hubris",
  virtue: "SVNSEA2E.Virtue"
};
SVNSEA2E.actorTypes = {
  brute: "SVNSEA2E.Brute",
  playercharacter: "SVNSEA2E.PlayerCharacter",
  monster: "SVNSEA2E.Monster",
  villain: "SVNSEA2E.Villain",
  ship: "SVNSEA2E.Ship",
  hero: "SVNSEA2E.Hero"
};
SVNSEA2E.nations = {
  none: "SVNSEA2E.Empty",
  aksum: "SVNSEA2E.NationAksum",
  anatol: "SVNSEA2E.NationAnatol",
  aragosta: "SVNSEA2E.NationAragosta",
  ashur: "SVNSEA2E.NationAshur",
  avalon: "SVNSEA2E.NationAvalon",
  castille: "SVNSEA2E.NationCastille",
  eisen: "SVNSEA2E.NationEisen",
  highland: "SVNSEA2E.NationHighland",
  inismore: "SVNSEA2E.NationInismore",
  jaragua: "SVNSEA2E.NationJaragua",
  khemet: "SVNSEA2E.NationKhemet",
  kuraq: "SVNSEA2E.NationKuraq",
  labucca: "SVNSEA2E.NationLaBucca",
  maghreb: "SVNSEA2E.NationMaghreb",
  manden: "SVNSEA2E.NationManden",
  mbey: "SVNSEA2E.NationMbey",
  montaigne: "SVNSEA2E.NationMontaigne",
  nahuaca: "SVNSEA2E.NationNahuaca",
  numa: "SVNSEA2E.NationNuma",
  persis: "SVNSEA2E.NationPersis",
  rahuri: "SVNSEA2E.NationRahuri",
  sarmatia: "SVNSEA2E.NationSarmatia",
  sarmion: "SVNSEA2E.NationSarmion",
  tribes: "SVNSEA2E.NationTribes",
  tzakkan: "SVNSEA2E.NationTzakkan",
  ussura: "SVNSEA2E.NationUssura",
  vesten: "SVNSEA2E.NationVesten",
  vodacce: "SVNSEA2E.NationVodacce"
};
SVNSEA2E.languages = {
  amizagh: "SVNSEA2E.LanguageAmizagh",
  awkari: "SVNSEA2E.LanguageAwkari",
  avalon: "SVNSEA2E.LanguageAvalonian",
  aztlani: "SVNSEA2E.LanguageAztlani",
  castille: "SVNSEA2E.LanguageCastillian",
  eisen: "SVNSEA2E.LanguageEisen",
  highland: "SVNSEA2E.LanguageHighlander",
  hylicia: "SVNSEA2E.LanguageHylicia",
  inismore: "SVNSEA2E.LanguageInish",
  jaragua: "SVNSEA2E.LanguageJaragua",
  katabic: "SVNSEA2E.LanguageKatabic",
  mande: "SVNSEA2E.LanguageMande",
  montaigne: "SVNSEA2E.LanguageMontaigne",
  nahuati: "SVNSEA2E.LanguageNahuati",
  njaay: "SVNSEA2E.LanguageNjaay",
  numa: "SVNSEA2E.LanguageNuma",
  persis: "SVNSEA2E.LanguagePersis",
  pirate: "SVNSEA2E.LanguagePirate",
  rahuri: "SVNSEA2E.LanguageRahuri",
  rzeczpospolita: "SVNSEA2E.LanguageRzeczpospolita",
  sarmatia: "SVNSEA2E.LanguageCuronian",
  sarmion: "SVNSEA2E.LanguageDibre",
  sahidic: "SVNSEA2E.LanguageSahidic",
  taiya: "SVNSEA2E.LanguageTaiya",
  thean: "SVNSEA2E.LanguageThean",
  ussura: "SVNSEA2E.LanguageUssurian",
  vesten: "SVNSEA2E.LanguageVesten",
  vodacce: "SVNSEA2E.LanguageVodacce",
  xweda: "SVNSEA2E.LanguageXweda",
  zeeg: "SVNSEA2E.LanguageZeeg"
};
SVNSEA2E.traits = {
  brawn: "SVNSEA2E.TraitBrawn",
  finesse: "SVNSEA2E.TraitFinesse",
  resolve: "SVNSEA2E.TraitResolve",
  wits: "SVNSEA2E.TraitWits",
  panache: "SVNSEA2E.TraitPanache",
  influence: "SVNSEA2E.TraitInfluence",
  strength: "SVNSEA2E.TraitStrength"
};
SVNSEA2E.skills = {
  aim: "SVNSEA2E.SkillAim",
  athletics: "SVNSEA2E.SkillAthletics",
  brawl: "SVNSEA2E.SkillBrawl",
  convince: "SVNSEA2E.SkillConvince",
  empathy: "SVNSEA2E.SkillEmpathy",
  hide: "SVNSEA2E.SkillHide",
  intimidate: "SVNSEA2E.SkillIntimidate",
  notice: "SVNSEA2E.SkillNotice",
  perform: "SVNSEA2E.SkillPerform",
  ride: "SVNSEA2E.SkillRide",
  sailing: "SVNSEA2E.SkillSailing",
  scholarship: "SVNSEA2E.SkillScholarship",
  tempt: "SVNSEA2E.SkillTempt",
  theft: "SVNSEA2E.SkillTheft",
  warfare: "SVNSEA2E.SkillWarfare",
  weaponry: "SVNSEA2E.SkillWeaponry"
};
SVNSEA2E.storyStatuses = {
  none: "SVNSEA2E.Empty",
  abandoned: "SVNSEA2E.StatusAbandoned",
  complete: "SVNSEA2E.StatusComplete",
  inprogress: "SVNSEA2E.StatusInProgress",
  future: "SVNSEA2E.StatusFuture"
};
SVNSEA2E.sorceryTypes = {
  none: "SVNSEA2E.Empty",
  hex: "SVNSEA2E.SorceryHexenwerk",
  knight: "SVNSEA2E.SorceryAvalonKnight",
  alquimia: "SVNSEA2E.SorceryAlquimia",
  galdr: "SVNSEA2E.SorceryGaldr",
  darm: "SVNSEA2E.SorceryDarMatushki",
  tura: "SVNSEA2E.SorceryTurasTouch",
  porte: "SVNSEA2E.SorceryPorte",
  sanderis: "SVNSEA2E.SorcerySanderis",
  sorte: "SVNSEA2E.SorcerySorte",
  charter: "SVNSEA2E.SorceryCharter",
  kapsevi: "SVNSEA2E.SorceryKapSevi",
  mystirios: "SVNSEA2E.SorceryMystirios",
  mohwoo: "SVNSEA2E.SorceryMohwoo",
  prophet: "SVNSEA2E.SorceryProphet",
  chozeh: "SVNSEA2E.SorceryChozeh",
  khahesh: "SVNSEA2E.SorceryKhaheshAhura",
  mithaq: "SVNSEA2E.SorceryMithaq",
  nawaru: "SVNSEA2E.SorceryNawaru",
  wayak: "SVNSEA2E.SorceryWayak",
  wanuy: "SVNSEA2E.SorceryWanuy",
  heka: "SVNSEA2E.SorceryHeka",
  melbur: "SVNSEA2E.SorceryMelbur",
  redtouch: "SVNSEA2E.SorceryRedTouch"
};
SVNSEA2E.durations = {
  none: "SVNSEA2E.Empty",
  scene: "SVNSEA2E.Scene"
};
SVNSEA2E.sorceryCats = {
  none: "SVNSEA2E.Empty",
  ahura: "SVNSEA2E.Ahura",
  ahpulul: "SVNSEA2E.Ahpulul",
  amulet: "SVNSEA2E.Amulet",
  deal: "SVNSEA2E.Deal",
  disruption: "SVNSEA2E.Disruption",
  favor: "SVNSEA2E.Favor",
  gift: "SVNSEA2E.Gift",
  glamour: "SVNSEA2E.Glamour",
  gros: "SVNSEA2E.Gros",
  inscription: "SVNSEA2E.Inscription",
  knight: "SVNSEA2E.Knight",
  manifestation: "SVNSEA2E.Manifestation",
  mark: "SVNSEA2E.Mark",
  miracle: "SVNSEA2E.Miracle",
  path: "SVNSEA2E.Path",
  restriction: "SVNSEA2E.Restriction",
  script: "SVNSEA2E.Script",
  talisman: "SVNSEA2E.Talisman",
  tesse: "SVNSEA2E.Tesse",
  task: "SVNSEA2E.Task",
  thiqa: "SVNSEA2E.Thiqa",
  ti: "SVNSEA2E.Ti",
  turrus: "SVNSEA2E.Turrus",
  turn: "SVNSEA2E.Turn",
  juvenilia: "SVNSEA2E.Juvenilia",
  magnum: "SVNSEA2E.MagnumOpus",
  futhark: "SVNSEA2E.Futhark",
  patron: "SVNSEA2E.Patron",
  unguents: "SVNSEA2E.Unguents"
};
SVNSEA2E.sorcerySubcats = {
  none: "SVNSEA2E.Empty",
  advanced: "SVNSEA2E.Advanced",
  common: "SVNSEA2E.Common",
  baxan: "SVNSEA2E.Baxan",
  major: "SVNSEA2E.Major",
  minor: "SVNSEA2E.Minor",
  pixan: "SVNSEA2E.Pixan",
  rare: "SVNSEA2E.Rare",
  great: "SVNSEA2E.Great",
  small: "SVNSEA2E.Small"
};
SVNSEA2E.crewStatuses = {
  none: "SVNSEA2E.Empty",
  happy: "SVNSEA2E.Happy",
  dissatisfied: "SVNSEA2E.Dissatisfied",
  mutinous: "SVNSEA2E.Mutinous"
};
SVNSEA2E.artifactTypes = {
  deathtoken: "SVNSEA2E.DeathToken",
  syrneth: "SVNSEA2E.Syrneth",
  thiqa: "SVNSEA2E.Thiqa",
  tailsman: "SVNSEA2E.Tailsman",
  inscription: "SVNSEA2E.Inscription",
  mbey: "SVNSEA2E.Mbey",
  wonder: "SVNSEA2E.Wonder",
  tatoo: "SVNSEA2E.Tatoo"
};
SVNSEA2E.shipRoles = {
  captain: "SVNSEA2E.Captain",
  firstmate: "SVNSEA2E.FirstMate",
  quartermaster: "SVNSEA2E.QuaterMaster",
  accountant: "SVNSEA2E.Accountant",
  boatswain: "SVNSEA2E.Boatswain",
  shipsmaster: "SVNSEA2E.ShipsMaster",
  mastergunner: "SVNSEA2E.MasterGunner",
  mastermariner: "SVNSEA2E.MasterMariner",
  captaintops: "SVNSEA2E.CaptainTops",
  cook: "SVNSEA2E.Cook",
  surgeon: "SVNSEA2E.Surgeon",
  midshipmen: "SVNSEA2E.Midshipmen",
  ableseaman: "SVNSEA2E.AbleSeaman",
  seaman: "SVNSEA2E.Seaman"
};
SVNSEA2E.match10 = {
  two: [
    [1, 9],
    [2, 8],
    [3, 7],
    [4, 6],
    [5, 5]
  ],
  three: [
    [1, 1, 8],
    [1, 2, 7],
    [1, 3, 6],
    [1, 4, 5],
    [2, 2, 6],
    [2, 3, 5],
    [4, 4, 2],
    [3, 3, 4]
  ]
};
SVNSEA2E.match15 = {
  two: [
    [4, 11],
    [5, 10],
    [6, 9],
    [7, 8]
  ],
  three: [
    [1, 3, 11],
    [1, 4, 10],
    [1, 5, 9],
    [1, 6, 8],
    [1, 7, 7],
    [2, 2, 11],
    [2, 3, 10],
    [2, 4, 9],
    [2, 5, 8],
    [2, 6, 7],
    [3, 3, 9],
    [3, 4, 8],
    [3, 5, 7],
    [6, 6, 3],
    [4, 4, 7],
    [4, 5, 6],
    [5, 5, 5]
  ]
};
SVNSEA2E.match20 = {
  two: [
    [10, 10],
    [11, 9]
  ],
  three: [
    [1, 8, 11],
    [1, 9, 10],
    [2, 9, 9],
    [2, 10, 8],
    [2, 11, 7],
    [3, 6, 11],
    [3, 7, 10],
    [3, 8, 9],
    [4, 5, 11],
    [4, 6, 10],
    [4, 7, 9],
    [4, 8, 8],
    [5, 5, 10],
    [5, 6, 9],
    [5, 7, 8],
    [6, 6, 8],
    [6, 7, 7]
  ]
};
const SYSTEM_ID = "svnsea2e";
const SYSTEM_PATH = `systems/${SYSTEM_ID}`;
const TEMPLATES = `${SYSTEM_PATH}/templates`;
const ActorType = {
  PLAYER: "playercharacter",
  HERO: "hero",
  VILLAIN: "villain",
  MONSTER: "monster",
  BRUTE: "brute",
  SHIP: "ship",
  DANGERPOINTS: "dangerpts"
};
const ItemTypes = {
  ADVANTAGE: "advantage",
  ARTIFACT: "artifact",
  BACKGROUND: "background",
  DUEL_STYLE: "duelstyle",
  MONSTER_QUALITY: "monsterquality",
  SCHEME: "scheme",
  SECRET_SOCIETY: "secretsociety",
  SHIP_ADVENTURE: "shipadventure",
  SHIP_BACKGROUND: "shipbackground",
  SORCERY: "sorcery",
  STORY: "story",
  VIRTUE: "virtue",
  HUBRIS: "hubris"
};
const VILLAIN_TYPES = [ActorType.VILLAIN, ActorType.MONSTER];
function registerSystemSettings() {
  game.settings.register(SYSTEM_ID, "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });
  game.settings.register(SYSTEM_ID, "toolboxActors", {
    name: "Toolbox actors",
    scope: "client",
    config: false,
    type: Array,
    default: []
  });
}
const PARTIALS = [
  "actors/parts/actor-name.hbs",
  "actors/parts/actor-traits.hbs",
  "actors/parts/actor-concept.hbs",
  "actors/parts/actor-advantages.hbs",
  "actors/parts/actor-sorcery.hbs",
  "actors/parts/actor-inventory.hbs",
  "actors/parts/actor-fate.hbs",
  "actors/parts/actor-villainy.hbs",
  "actors/parts/actor-vtraits.hbs",
  "actors/parts/actor-wounds.hbs",
  "actors/parts/actor-languages.hbs",
  "actors/parts/item-section.hbs",
  "actors/parts/item-row.hbs",
  "actors/parts/rank-circles.hbs",
  "parts/sheet-tabs.hbs",
  "items/parts/item-header.hbs",
  "items/parts/item-editor.hbs"
];
function preloadHandlebarsTemplates() {
  return foundry.applications.handlebars.loadTemplates(PARTIALS.map((p) => `${TEMPLATES}/${p}`));
}
function registerHandlebarsHelpers() {
  Handlebars.registerHelper("for", function(from, count, step, options) {
    const start = parseInt(from);
    const end = start + parseInt(count);
    let groupSize = 5;
    if (this.wounds?.max && this.dwounds?.max > 0) groupSize = Math.floor(this.wounds.max / this.dwounds.max);
    const data = Handlebars.createFrame(options.data);
    let out = "";
    for (let i = start; i < end; i += step) {
      data.index = i;
      data.first = i === 0;
      data.last = i === count;
      data.mod = Math.trunc(i / groupSize);
      data.remain = i % groupSize;
      out += options.fn(this, { data });
    }
    return out;
  });
  Handlebars.registerHelper("iff", function(a, operator, b, options) {
    const ops = {
      "==": () => a == b,
      "!=": () => a != b,
      ">=": () => a >= b,
      "<=": () => a <= b,
      ">": () => a > b,
      "<": () => a < b
    };
    if (!(operator in ops)) throw new Error(`Unknown operator ${operator}`);
    return ops[operator]() ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper("toLowerCase", (str) => String(str ?? "").toLowerCase());
  Handlebars.registerHelper("capitalize", (str) => {
    str = String(str ?? "");
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
}
const clamp = (value, min, max) => Math.min(Math.max(Number(value) || 0, Number(min) || 0), Number(max));
const enrichHTML = (html, options = {}) => foundry.applications.ux.TextEditor.implementation.enrichHTML(html ?? "", options);
const skillsToSheetData = (system) => Object.entries(system.skills).map(([name, skill]) => ({ ...skill, name, label: CONFIG.SVNSEA2E.skills[name] })).sort((a, b) => a.label.localeCompare(b.label));
const itemsOfType = (actor, type) => actor.items.filter((item) => item.type === type).sort((a, b) => a.name.localeCompare(b.name));
const GLAMOR_NATIONS = ["highland", "avalon", "inismore"];
const isValidGlamorIsles = (actor) => GLAMOR_NATIONS.includes(actor.system.nation);
let packAdvantages = null;
async function getPackAdvantages() {
  if (!packAdvantages) {
    const found = [];
    for (const pack of game.packs) {
      if (pack.documentName !== "Item") continue;
      const index = await pack.getIndex({ fields: ["type"] });
      for (const entry of index) {
        if (entry.type === ItemTypes.ADVANTAGE) found.push({ name: entry.name, uuid: entry.uuid });
      }
    }
    packAdvantages = found;
  }
  return packAdvantages;
}
function invalidateAdvantageCache(item) {
  if (item.pack) packAdvantages = null;
}
async function getAllAdvantageNames() {
  const names = new Set(game.items.filter((i) => i.type === ItemTypes.ADVANTAGE).map((i) => i.name));
  for (const entry of await getPackAdvantages()) names.add(entry.name);
  return [...names].sort((a, b) => a.localeCompare(b));
}
async function findAdvantage(name) {
  const worldItem = game.items.find((i) => i.type === ItemTypes.ADVANTAGE && i.name === name);
  if (worldItem) return worldItem;
  const lower = name.toLowerCase();
  const entry = (await getPackAdvantages()).find((e) => e.name.toLowerCase() === lower);
  return entry ? fromUuid(entry.uuid) : null;
}
const MIGRATIONS = [];
async function migrateWorldIfNeeded() {
  if (!game.users.activeGM?.isSelf) return;
  const lastMigrated = game.settings.get(SYSTEM_ID, "systemMigrationVersion");
  const pending = MIGRATIONS.filter(
    (m) => !lastMigrated || foundry.utils.isNewerVersion(m.version, lastMigrated)
  );
  if (pending.length) await migrateWorld(pending);
  if (lastMigrated !== game.system.version) {
    await game.settings.set(SYSTEM_ID, "systemMigrationVersion", game.system.version);
  }
}
async function migrateWorld(migrations2) {
  ui.notifications.info(
    `Applying 7th Sea 2E System Migration for version ${game.system.version}. Please be patient and do not close your game or shut down your server.`,
    { permanent: true }
  );
  const actorUpdate = (actor) => collectUpdates(migrations2, "actor", actor);
  const itemUpdate = (item) => collectUpdates(migrations2, "item", item);
  for (const actor of game.actors) await migrateActor(actor, actorUpdate, itemUpdate);
  for (const item of game.items) await applyUpdate(item, itemUpdate(item));
  for (const pack of game.packs) {
    if (pack.metadata.packageType !== "world" || !["Actor", "Item"].includes(pack.documentName)) continue;
    const wasLocked = pack.locked;
    await pack.configure({ locked: false });
    for (const doc of await pack.getDocuments()) {
      if (pack.documentName === "Actor") await migrateActor(doc, actorUpdate, itemUpdate);
      else await applyUpdate(doc, itemUpdate(doc));
    }
    await pack.configure({ locked: wasLocked });
  }
  ui.notifications.info(`7th Sea 2E System Migration to version ${game.system.version} completed!`, { permanent: true });
}
async function migrateActor(actor, actorUpdate, itemUpdate) {
  await applyUpdate(actor, actorUpdate(actor));
  const itemUpdates = actor.items.map((item) => ({ ...itemUpdate(item), _id: item.id })).filter((u) => Object.keys(u).length > 1);
  if (itemUpdates.length) await actor.updateEmbeddedDocuments("Item", itemUpdates);
}
function collectUpdates(migrations2, kind, doc) {
  return migrations2.reduce((update, m) => Object.assign(update, m[kind]?.(doc) ?? {}), {});
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
const migrations = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MIGRATIONS,
  migrateWorldIfNeeded
}, Symbol.toStringTag, { value: "Module" }));
async function updateInitiative(actorId, value) {
  let initiative = parseFloat(value);
  if (Number.isNaN(initiative)) return;
  initiative = Math.max(0, initiative);
  for (const combat of game.combats.filter((c) => c.active)) {
    const updates = combat.combatants.filter((c) => c.actorId === actorId || c.actor?.id === actorId).map((c) => ({ _id: c.id, initiative }));
    if (updates.length) await combat.updateEmbeddedDocuments("Combatant", updates);
  }
  await game.actors.get(actorId)?.update({ "system.initiative": initiative });
}
function onRenderCombatTracker(app, html) {
  const combat = app.viewed;
  if (!combat) return;
  for (const row of html.querySelectorAll(".combatant[data-combatant-id]")) {
    const combatant = combat.combatants.get(row.dataset.combatantId);
    const initiative = row.querySelector(".token-initiative");
    if (!combatant?.actor || !combatant.isOwner || !initiative || initiative.querySelector(".combat-btn")) continue;
    const makeButton = (delta) => {
      const button = document.createElement("a");
      button.className = `combat-btn ${delta > 0 ? "add" : "sub"}`;
      button.dataset.tooltip = delta > 0 ? "+1 Raise" : "-1 Raise";
      button.innerHTML = `<i class="fa-solid fa-${delta > 0 ? "plus" : "minus"}"></i>`;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        updateInitiative(combatant.actor.id, (combatant.initiative || 0) + delta);
      });
      button.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      return button;
    };
    initiative.prepend(makeButton(1));
    initiative.append(makeButton(-1));
  }
}
function registerChatListeners() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.(".initiative-tracker-add");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    updateInitiative(button.dataset.actor, button.dataset.raise);
  });
}
const { ApplicationV2: ApplicationV2$1, HandlebarsApplicationMixin: HandlebarsApplicationMixin$3 } = foundry.applications.api;
class Toolbox extends HandlebarsApplicationMixin$3(ApplicationV2$1) {
  static DEFAULT_OPTIONS = {
    id: "svnsea-toolbox",
    classes: ["svnsea2e", "toolbox", "themed", "theme-dark"],
    window: { title: "SVNSEA2E.Toolbox", minimizable: true, resizable: true },
    position: { top: 20, width: 300, height: "auto" },
    actions: {
      removeActor: Toolbox.#onRemoveActor
    }
  };
  static PARTS = {
    items: { template: `${TEMPLATES}/toolbox/toolbox.hbs` }
  };
  /** UUIDs of the actors shown in the toolbox. */
  get actorUuids() {
    return game.settings.get(SYSTEM_ID, "toolboxActors") ?? [];
  }
  async _setActorUuids(uuids) {
    await game.settings.set(SYSTEM_ID, "toolboxActors", uuids);
    this.render();
  }
  /** Whether a change to this actor should refresh the toolbox. */
  shows(actor) {
    return this.rendered && this.actorUuids.includes(actor.uuid);
  }
  /** @override */
  render(options, _options) {
    if (!game.user.isGM) return this;
    return super.render(options, _options);
  }
  /** @override */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    options.position.left ??= Math.max(window.innerWidth - 650, 0);
    return options;
  }
  /** @override */
  async _prepareContext(options) {
    const actors = this.actorUuids.map((uuid) => fromUuidSync(uuid)).filter((actor) => actor);
    return { actors };
  }
  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    const dropZone = this.element.querySelector(".items");
    dropZone?.addEventListener("dragover", (event) => event.preventDefault());
    dropZone?.addEventListener("drop", this.#onDrop.bind(this));
  }
  async #onDrop(event) {
    event.preventDefault();
    const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);
    if (data?.type !== "Actor" || !data.uuid) return;
    const uuids = this.actorUuids;
    if (!uuids.includes(data.uuid)) await this._setActorUuids([...uuids, data.uuid]);
  }
  static async #onRemoveActor(event, target) {
    await this._setActorUuids(this.actorUuids.filter((uuid) => uuid !== target.dataset.uuid));
  }
}
class SvnSea2EActor extends Actor {
  /** Use the system icon for new actors that still have the default artwork. */
  async _preCreate(data, options, user) {
    if (await super._preCreate(data, options, user) === false) return false;
    if (!this.img || this.img === CONST.DEFAULT_TOKEN) {
      this.updateSource({ img: `${SYSTEM_PATH}/icons/${this.type}.jpg` });
    }
  }
  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    const system = this.system;
    switch (this.type) {
      case ActorType.PLAYER:
      case ActorType.HERO:
        this._prepareHeroWounds(system);
        this._clampRanks(system.traits);
        this._clampRanks(system.skills);
        break;
      case ActorType.VILLAIN:
      case ActorType.MONSTER:
        this._prepareVillainData(system);
        break;
      case ActorType.BRUTE:
        this._prepareBruteData(system);
        break;
    }
  }
  /** Keep every value/min/max entry within its bounds. */
  _clampRanks(ranks) {
    for (const rank of Object.values(ranks)) rank.value = clamp(rank.value, rank.min, rank.max);
  }
  /** Heroes have 4 dramatic wounds (20 wounds), or 5 (25 wounds) when Hard To Kill. */
  _prepareHeroWounds(system) {
    system.dwounds.max = system.htk ? 5 : 4;
    system.wounds.max = system.dwounds.max * 5;
    this._clampWounds(system);
  }
  /** Villains and monsters: dramatic wounds every Strength + 1 wounds; Hard To Kill adds one dramatic wound. */
  _prepareVillainData(system) {
    this._clampRanks(system.traits);
    system.villainy = parseInt(system.traits.strength.value) + parseInt(system.traits.influence.value);
    system.dwounds.max = system.htk ? 5 : 4;
    system.wounds.max = (parseInt(system.traits.strength.value) + 1) * system.dwounds.max;
    this._clampWounds(system);
  }
  /** A brute squad has as many wounds as its Strength. */
  _prepareBruteData(system) {
    const strength = system.traits.strength;
    strength.value = clamp(strength.value, strength.min, strength.max);
    system.wounds.max = strength.value;
    if (system.wounds.value > system.wounds.max) system.wounds.value = system.wounds.max;
  }
  _clampWounds(system) {
    system.wounds.value = clamp(system.wounds.value, system.wounds.min, system.wounds.max);
    system.dwounds.value = clamp(system.dwounds.value, system.dwounds.min, system.dwounds.max);
  }
  /** Number of wounds in each dramatic wound group. */
  get woundGroupSize() {
    if (VILLAIN_TYPES.includes(this.type)) return parseInt(this.system.traits.strength.value) + 1;
    return 5;
  }
  /* -------------------------------------------- */
  /*  Ship crew                                   */
  /* -------------------------------------------- */
  async removeFromCrew() {
    await this.unsetFlag(SYSTEM_ID, "crewMember");
  }
  async setCrewMemberRole(shipId, role) {
    return this.setFlag(SYSTEM_ID, "crewMember", { shipId, role });
  }
}
const { HTMLField: HTMLField$1, SchemaField: SchemaField$1, NumberField: NumberField$1, StringField: StringField$1, ArrayField: ArrayField$1, BooleanField: BooleanField$1 } = foundry.data.fields;
const int = (initial = 0, min = 0) => new NumberField$1({ required: true, integer: true, min, initial });
const ranked = (initial = 0, max = 5) => new SchemaField$1({ value: int(initial), min: int(0), max: int(max) });
const baseSchema$1 = () => ({
  htk: new BooleanField$1({ required: true, initial: false }),
  initiative: new NumberField$1({ required: true, integer: false, min: 0, initial: 0 }),
  wounds: new SchemaField$1({ value: int(0), min: int(0), max: int(20) }),
  dwounds: new SchemaField$1({ value: int(0), min: int(0), max: int(4) })
});
const detailsSchema = () => ({
  nation: new StringField$1(),
  religion: new StringField$1(),
  age: int(20),
  reputation: new StringField$1(),
  languages: new ArrayField$1(new StringField$1()),
  equipment: new StringField$1(),
  concept: new HTMLField$1({ initial: "<h3>Concept</h3><h3>Biography</h3>" })
});
const TRAITS = ["brawn", "finesse", "resolve", "wits", "panache"];
const SKILLS = [
  "aim",
  "athletics",
  "brawl",
  "convince",
  "empathy",
  "hide",
  "intimidate",
  "notice",
  "perform",
  "ride",
  "sailing",
  "scholarship",
  "tempt",
  "theft",
  "warfare",
  "weaponry"
];
const featuresSchema = () => ({
  traits: new SchemaField$1(Object.fromEntries(TRAITS.map((t) => [t, ranked(2)]))),
  skills: new SchemaField$1(Object.fromEntries(SKILLS.map((s) => [s, ranked(0)])))
});
const villainTraitsSchema = () => ({
  traits: new SchemaField$1({
    influence: new SchemaField$1({ value: int(5), min: int(0), max: int(20) }),
    strength: new SchemaField$1({ value: int(5, 1), min: int(1, 1), max: int(20) })
  })
});
class BruteModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      wounds: new SchemaField$1({ value: int(0), min: int(0), max: int(20) }),
      traits: new SchemaField$1({
        strength: new SchemaField$1({ value: int(5, 1), min: int(1, 1), max: int(20, 1) })
      }),
      ability: new SchemaField$1({ name: new StringField$1(), description: new HTMLField$1() })
    };
  }
}
class DangerPointsModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { points: int(5) };
  }
}
class HeroModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema$1(), ...detailsSchema(), ...featuresSchema() };
  }
}
class MonsterModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema$1(), ...villainTraitsSchema(), fear: ranked(0) };
  }
}
class PlayerModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema$1(),
      ...detailsSchema(),
      ...featuresSchema(),
      wealth: int(0),
      heropts: int(0),
      vile: int(0),
      corruptionpts: int(0),
      redemption: new StringField$1()
    };
  }
}
class ShipModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema$1(),
      background: new StringField$1(),
      class: new StringField$1(),
      cargo: new HTMLField$1(),
      origin: new StringField$1(),
      crewstatus: new StringField$1(),
      wealth: int(0)
    };
  }
}
class VillainModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema$1(), ...detailsSchema(), ...villainTraitsSchema(), servants: new StringField$1() };
  }
}
const { ApplicationV2, HandlebarsApplicationMixin: HandlebarsApplicationMixin$2 } = foundry.applications.api;
class ChoiceSelector extends HandlebarsApplicationMixin$2(ApplicationV2) {
  /**
   * @param {object} config
   * @param {foundry.abstract.Document} config.document  The document to update.
   * @param {string} config.field                        Path of the array field, e.g. "system.languages".
   * @param {Record<string, string>} config.choices      Available choices as {key: label}.
   * @param {string} config.title
   */
  constructor({ document: document2, field, choices, title, ...options }) {
    super(options);
    this.document = document2;
    this.field = field;
    this.choices = choices;
    this.selectorTitle = title;
  }
  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: ["svnsea2e", "choice-selector"],
    position: { width: 320, height: "auto" },
    window: { contentClasses: ["standard-form"] },
    form: { handler: ChoiceSelector.#onSubmit, closeOnSubmit: true }
  };
  static PARTS = {
    form: { template: `${TEMPLATES}/apps/choice-selector.hbs`, scrollable: [".choice-list"] }
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
        chosen: chosen.includes(key)
      }))
    };
  }
  static async #onSubmit(event, form) {
    const chosen = [...form.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
    await this.document.update({ [this.field]: chosen });
  }
}
const ROLL_CARD = `${TEMPLATES}/chats/roll-card.hbs`;
function readRollForm(form) {
  const el = form.elements;
  const num = (name) => parseInt(el[name]?.value) || 0;
  const bool = (name) => !!el[name]?.checked;
  return {
    trait: num("trait"),
    bonusDice: num("bonusDice"),
    flairDice: bool("flairDice"),
    interpretationDice: bool("interpretationDice"),
    useForMe: num("useForMe"),
    useForHelpMe: num("useForHelpMe"),
    addOneToDice: bool("addOneToDice"),
    joieDeVivre: bool("joieDeVivreAdvantage"),
    explodeDice: bool("explodeDice"),
    increaseThreshold: bool("increaseThreshold")
  };
}
function raisesPerCombo(threshold = 10, increased = false) {
  return threshold === 15 && !increased || threshold === 20 && increased ? 2 : 1;
}
function findComboIndices(dice, combo) {
  const indices = [dice.indexOf(combo[0])];
  indices.push(combo[0] === combo[1] ? dice.indexOf(combo[1], indices[0] + 1) : dice.indexOf(combo[1]));
  if (combo.length > 2) {
    indices.push(combo[0] === combo[2] ? dice.indexOf(combo[2], indices[1] + 1) : dice.indexOf(combo[2]));
  }
  return indices;
}
function groupDice(dice, target = 10, increased = false) {
  const pool = [...dice].map(Number).sort((a, b) => b - a);
  const result = { rolls: [], combos: [], raises: 0 };
  const findCombo = (exactOnly) => {
    let bestOvershoot = Infinity;
    let found = null;
    const dfs = (index, sum, combo, used) => {
      if (sum === target) {
        found = { combo, used };
        return true;
      }
      if (!exactOnly && sum > target && sum < bestOvershoot) {
        bestOvershoot = sum;
        found = { combo, used };
        return false;
      }
      if (sum >= target || index >= pool.length) return false;
      if (dfs(index + 1, sum + pool[index], [...combo, pool[index]], [...used, index])) return true;
      return dfs(index + 1, sum, combo, used);
    };
    dfs(0, 0, [], []);
    if (!found) return null;
    for (let j = found.used.length - 1; j >= 0; j--) pool.splice(found.used[j], 1);
    return found.combo;
  };
  for (const exactOnly of [true, false]) {
    let combo;
    while ((combo = findCombo(exactOnly)) !== null) {
      result.combos.push(combo.sort((a, b) => a - b).join(" + "));
      result.raises += raisesPerCombo(target, increased);
    }
  }
  dice.length = 0;
  dice.push(...pool);
  result.rolls = pool;
  return result;
}
const ascending = (a, b) => a - b;
const diceResults = (roll) => roll.dice[0].results.map((r) => r.result).sort(ascending);
async function spendHeroPoints(actor, options) {
  const spent = options.useForMe;
  const available = actor.system.heropts || 0;
  if (spent > available) {
    ui.notifications.error(game.i18n.localize("SVNSEA2E.NotEnoughHero"));
    return false;
  }
  if (spent > 0) await actor.update({ "system.heropts": available - spent });
  return true;
}
async function rollDicePool({ actor, rolldata, options, title }) {
  const system = actor.system;
  if (!VILLAIN_TYPES.includes(actor.type) && !await spendHeroPoints(actor, options)) return false;
  const skillDice = parseInt(rolldata.skilldice) || 0;
  const woundBonus = system.dwounds?.value >= 1 && !rolldata.skipWoundBonus ? 1 : 0;
  const bonusDice = options.bonusDice + (options.flairDice ? 1 : 0) + (options.interpretationDice ? 1 : 0) + options.useForMe + options.useForHelpMe * 3;
  const poolSize = skillDice + options.trait + bonusDice + woundBonus;
  if (poolSize < 1) {
    ui.notifications.warn(game.i18n.localize("SVNSEA2E.NoDiceToRoll"));
    return false;
  }
  const increased = options.increaseThreshold;
  const addOne = options.addOneToDice;
  const exploded = rolldata.explode || options.explodeDice;
  const roll = await new foundry.dice.Roll(`${poolSize}d10${exploded ? "x" : ""}`).evaluate();
  const dice = diceResults(roll).map((d) => addOne ? d + 1 : d);
  let threshold = rolldata.threshold + (increased ? 5 : 0);
  const matches = threshold === 15 ? CONFIG.SVNSEA2E.match15 : threshold === 20 ? CONFIG.SVNSEA2E.match20 : CONFIG.SVNSEA2E.match10;
  let raises = 0;
  const combos = [];
  const takeTens = () => {
    if (threshold !== 10) return;
    for (let i = dice.length - 1; i >= 0 && dice[i] >= 10; i--) {
      raises++;
      combos.push(dice[i]);
      dice.splice(i, 1);
    }
  };
  takeTens();
  if (options.joieDeVivre) {
    for (let i = dice.length - 1; i >= 0; i--) {
      if (dice[i] <= skillDice) {
        raises++;
        combos.push(dice[i]);
        dice.splice(i, 1);
      }
    }
  }
  for (const pair of matches.two) {
    let idx = findComboIndices(dice, pair);
    while (idx[0] > -1 && idx[1] > -1) {
      raises += raisesPerCombo(threshold, increased);
      combos.push(`${dice[idx[0]]} + ${dice[idx[1]]}`);
      dice.splice(idx[0], 1);
      dice.splice(dice.indexOf(pair[1]), 1);
      idx = findComboIndices(dice, pair);
    }
  }
  for (const triple of matches.three) {
    let idx = findComboIndices(dice, triple);
    while (idx[0] > -1 && idx[1] > -1 && idx[2] > -1) {
      raises += raisesPerCombo(threshold, increased);
      combos.push(`${dice[idx[0]]} + ${dice[idx[1]]} + ${dice[idx[2]]}`);
      dice.splice(idx[0], 1);
      dice.splice(dice.indexOf(triple[1]), 1);
      dice.splice(dice.indexOf(triple[2]), 1);
      idx = findComboIndices(dice, triple);
    }
  }
  const shownRolls = diceResults(roll);
  let rerolled = false;
  let rerollText = "";
  if (dice.length > 0 && rolldata.reroll) {
    const original = addOne ? dice[0] - 1 : dice[0];
    const [newResult] = await rollD10s(1);
    dice[0] = newResult;
    rerollText = game.i18n.format("SVNSEA2E.Reroll", { roll1: original, roll2: newResult });
    rerolled = true;
    const shownIndex = shownRolls.indexOf(original);
    if (shownIndex > -1) shownRolls[shownIndex] = newResult;
    if (addOne) dice[0] += 1;
    shownRolls.sort(ascending);
    dice.sort(ascending);
  }
  takeTens();
  let grouped = groupDice(dice, threshold, increased);
  combos.push(...grouped.combos);
  raises += grouped.raises;
  if (grouped.rolls.length > 0 && (!increased && threshold === 15 || increased && threshold === 20)) {
    const lower = groupDice(grouped.rolls, threshold - 5, increased);
    combos.push(...lower.combos);
    raises += lower.raises;
    grouped = lower;
  }
  let thresholdText = threshold.toString();
  if (increased) thresholdText += ` ${game.i18n.localize("SVNSEA2E.GMIncreasedThreshold")}`;
  const unusedDice = grouped.rolls.length;
  const content = await foundry.applications.handlebars.renderTemplate(ROLL_CARD, {
    actor,
    raisetxt: raises > 1 ? game.i18n.localize("SVNSEA2E.Raises") : game.i18n.localize("SVNSEA2E.Raise"),
    unusedDiceTxt: unusedDice > 1 ? game.i18n.localize("SVNSEA2E.UnusedDice") : game.i18n.localize("SVNSEA2E.UnusedDie"),
    data: system,
    exploded,
    explosions: game.i18n.localize("SVNSEA2E.RollsExploded"),
    extraDice: shownRolls.length - poolSize,
    hasAddOneToDice: addOne,
    addOneToDiced: game.i18n.localize("SVNSEA2E.AddOneToDiced"),
    rolls: shownRolls,
    raises,
    rCombos: game.i18n.localize("SVNSEA2E.RaiseCombos"),
    combos: combos.map(String),
    rerolled,
    reroll: rerollText,
    unusedDice,
    unusedRolls: grouped.rolls,
    dicesNumber: poolSize,
    threshold: game.i18n.format("SVNSEA2E.RollThreshold", { threshold: thresholdText })
  });
  const chatData = ChatMessage.implementation.applyMode({
    author: game.user.id,
    speaker: ChatMessage.implementation.getSpeaker({ actor }),
    flavor: title,
    content,
    rolls: [roll]
  });
  await ChatMessage.implementation.create(chatData);
  return roll;
}
async function rollD10s(count) {
  const roll = await new foundry.dice.Roll(`${count}d10`).evaluate();
  return roll.dice[0].results.map((r) => r.result);
}
const { DialogV2 } = foundry.applications.api;
const renderTemplate = (path, data) => foundry.applications.handlebars.renderTemplate(path, data);
async function promptRoll(title, template, data) {
  const content = await renderTemplate(template, data);
  return DialogV2.wait({
    window: { title },
    classes: ["svnsea2e", "roll-dialog"],
    position: { width: 400 },
    content,
    buttons: [
      {
        action: "roll",
        label: game.i18n.localize("SVNSEA2E.Roll"),
        icon: "fa-solid fa-dice-d10",
        default: true,
        callback: (event, button) => ({ options: readRollForm(button.form), form: button.form })
      }
    ],
    rejectClose: false
  });
}
async function rollSkill(actor, skill) {
  const system = actor.system;
  const rank = system.skills[skill].value;
  const rolldata = {
    threshold: rank >= 4 ? 15 : 10,
    explode: rank === 5 || system.dwounds.value >= 3,
    reroll: rank > 2,
    skilldice: rank
  };
  const traits = {};
  for (const [key, trait] of Object.entries(system.traits)) traits[CONFIG.SVNSEA2E.traits[key]] = trait.value;
  const skillLabel = CONFIG.SVNSEA2E.skills[skill];
  const result = await promptRoll(
    game.i18n.format("SVNSEA2E.ApproachPromptTitle", { skill: skillLabel }),
    `${TEMPLATES}/chats/skill-roll-dialog.hbs`,
    { data: system, traits }
  );
  if (!result) return false;
  const traitSelect = result.form.elements.trait;
  return rollDicePool({
    actor,
    rolldata,
    options: result.options,
    title: game.i18n.format("SVNSEA2E.ApproachRollChatTitle", {
      trait: traitSelect.options[traitSelect.selectedIndex].text,
      skill: skillLabel
    })
  });
}
async function rollTrait(actor, trait) {
  const system = actor.system;
  const rolldata = {
    threshold: 10,
    explode: VILLAIN_TYPES.includes(actor.type) && system.dwounds?.value >= 3,
    reroll: false,
    skilldice: 0
  };
  const title = game.i18n.format("SVNSEA2E.TraitRollTitle", { trait: CONFIG.SVNSEA2E.traits[trait] });
  const result = await promptRoll(title, `${TEMPLATES}/chats/trait-roll-dialog.hbs`, {
    data: system,
    traitmax: system.traits[trait].value
  });
  if (!result) return false;
  return rollDicePool({ actor, rolldata, options: result.options, title });
}
async function rollFreeDice(actor) {
  const result = await promptRoll(game.i18n.localize("SVNSEA2E.Roll"), `${TEMPLATES}/items/parts/roll-throw.hbs`, {});
  if (!result) return false;
  const diceCount = Math.max(parseInt(result.form.elements.diceNumber?.value) || 1, 1);
  const { addOneToDice, joieDeVivre, explodeDice, increaseThreshold } = result.options;
  return rollDicePool({
    actor,
    rolldata: { skilldice: diceCount, threshold: 10, explode: false, reroll: false, skipWoundBonus: true },
    options: {
      trait: 0,
      bonusDice: 0,
      flairDice: false,
      interpretationDice: false,
      useForMe: 0,
      useForHelpMe: 0,
      addOneToDice,
      joieDeVivre,
      explodeDice,
      increaseThreshold
    },
    title: game.i18n.localize("SVNSEA2E.GenericRoll")
  });
}
const { HandlebarsApplicationMixin: HandlebarsApplicationMixin$1 } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;
class SvnSea2EActorSheet extends HandlebarsApplicationMixin$1(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    // The sheets are designed for a light background; keep them light whatever the user's theme.
    classes: ["svnsea2e", "sheet", "actor", "themed", "theme-light"],
    position: { width: 1050, height: 750 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      createItem: SvnSea2EActorSheet.#onCreateItem,
      editItem: SvnSea2EActorSheet.#onEditItem,
      deleteItem: SvnSea2EActorSheet.#onDeleteItem,
      throwItem: SvnSea2EActorSheet.#onThrowItem,
      itemSummary: SvnSea2EActorSheet.#onItemSummary,
      toggleUsed: SvnSea2EActorSheet.#onToggleUsed,
      toggleBackground: SvnSea2EActorSheet.#onToggleBackground,
      toggleSection: SvnSea2EActorSheet.#onToggleSection,
      toggleHtk: SvnSea2EActorSheet.#onToggleHtk,
      selectLanguages: SvnSea2EActorSheet.#onSelectLanguages,
      initiativeUp: SvnSea2EActorSheet.#onInitiativeStep,
      initiativeDown: SvnSea2EActorSheet.#onInitiativeStep,
      setRank: SvnSea2EActorSheet.#onSetRank,
      setWounds: SvnSea2EActorSheet.#onSetWounds,
      rollSkill: SvnSea2EActorSheet.#onRollSkill,
      rollTrait: SvnSea2EActorSheet.#onRollTrait,
      freeRoll: SvnSea2EActorSheet.#onFreeRoll
    }
  };
  /** Item list sections collapsed by the user, kept across re-renders. */
  #collapsedSections = /* @__PURE__ */ new Set();
  /* -------------------------------------------- */
  /*  Context                                     */
  /* -------------------------------------------- */
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const system = actor.system;
    Object.assign(context, {
      actor,
      system,
      owner: actor.isOwner,
      limited: actor.limited,
      editable: this.isEditable,
      cssClass: actor.isOwner ? "editable" : "locked",
      config: CONFIG.SVNSEA2E,
      tabs: this._prepareTabs("primary"),
      isCorrupt: system.corruptionpts > 0,
      isPlayerCharacter: actor.type === ActorType.PLAYER,
      isHero: actor.type === ActorType.HERO,
      isVillain: actor.type === ActorType.VILLAIN,
      isMonster: actor.type === ActorType.MONSTER,
      isNotBrute: actor.type !== ActorType.BRUTE,
      hasSkills: system.skills !== void 0,
      hasLanguages: system.languages !== void 0,
      name: actor.name,
      img: actor.img,
      initiative: system.initiative,
      age: system.age,
      nation: system.nation,
      wealth: system.wealth,
      heropts: system.heropts,
      corruptionpts: system.corruptionpts,
      wounds: system.wounds,
      dwounds: system.dwounds,
      htk: system.htk,
      traits: this._prepareTraits(),
      selectedlangs: this._prepareLanguages(),
      religion: system.religion,
      reputation: system.reputation,
      equipment: system.equipment,
      redemption: system.redemption
    });
    if (typeof system.concept === "string") {
      context.enrichedConcept = await enrichHTML(system.concept, { secrets: actor.isOwner, relativeTo: actor });
    }
    this._prepareItems(context);
    return context;
  }
  /** @override */
  _prepareTabs(group) {
    return this._getTabsConfig(group) ? super._prepareTabs(group) : {};
  }
  /** Add the actor's items, grouped by type, to the context. */
  _prepareItems(context) {
  }
  /** Traits with their localized label. */
  _prepareTraits() {
    if (!this.actor.system.traits) return [];
    return Object.entries(this.actor.system.traits).map(([name, trait]) => ({
      ...trait,
      name,
      label: CONFIG.SVNSEA2E.traits[name]
    }));
  }
  /** Selected languages as {key: label}. */
  _prepareLanguages() {
    const languages = this.actor.system.languages;
    if (!languages) return {};
    return Object.fromEntries(languages.map((lang) => [lang, CONFIG.SVNSEA2E.languages[lang]]));
  }
  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */
  /** @override */
  async _onRender(context, options) {
    await super._onRender(context, options);
    const initiative = this.element.querySelector(".initiative-input");
    if (initiative && this.isEditable) {
      initiative.addEventListener("change", this.#onInitiativeChange.bind(this));
      initiative.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        event.currentTarget.blur();
      });
    }
    for (const section of this.#collapsedSections) {
      const header = this.element.querySelector(`.item-header[data-section="${section}"]`);
      if (header) this.#setSectionCollapsed(header, true);
    }
  }
  /** Hide or show the item rows that follow a section header, up to the next header. */
  #setSectionCollapsed(header, collapsed) {
    header.classList.toggle("collapsed", collapsed);
    let row = header.nextElementSibling;
    while (row && !row.classList.contains("item-header")) {
      row.classList.toggle("hidden", collapsed);
      row = row.nextElementSibling;
    }
  }
  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */
  /** The embedded item of the row containing `target`. */
  _getItem(target) {
    const row = target.closest("[data-item-id]");
    return row ? this.actor.items.get(row.dataset.itemId) : null;
  }
  static async #onCreateItem(event, target) {
    if (!this.isEditable) return;
    const type = target.dataset.type;
    await this.actor.createEmbeddedDocuments("Item", [
      { name: game.i18n.localize(`SVNSEA2E.New${type}`), img: `systems/svnsea2e/icons/${type}.jpg`, type }
    ]);
  }
  static #onEditItem(event, target) {
    this._getItem(target)?.sheet.render(true);
  }
  static async #onDeleteItem(event, target) {
    if (!this.isEditable) return;
    const item = this._getItem(target);
    if (!item) return;
    if (item.type === ItemTypes.BACKGROUND && item.system.active) await this._removeBackgroundBonuses(item);
    await item.delete();
  }
  static #onThrowItem(event, target) {
    return this._getItem(target)?.sendToChat();
  }
  /** Expand or collapse the item description below its row. */
  static async #onItemSummary(event, target) {
    const row = target.closest(".item");
    const item = this._getItem(target);
    if (!row || !item) return;
    if (row.classList.contains("expanded")) {
      row.querySelector(".item-summary")?.remove();
    } else {
      const data = await item.getChatData({ secrets: this.actor.isOwner });
      const summary = document.createElement("div");
      summary.className = "item-summary";
      summary.innerHTML = `${data.description}<div class="item-metdata">${data.metadatahtml}</div>`;
      row.append(summary);
    }
    row.classList.toggle("expanded");
  }
  /** "Used this session" checkbox of advantages, virtues, hubris... */
  static async #onToggleUsed(event, target) {
    event.preventDefault();
    if (!this.isEditable) return;
    const item = this._getItem(target);
    if (item) await item.update({ "system.used": !item.system.used });
  }
  /** Activate or deactivate a background, adding or removing the skills and advantages it grants. */
  static async #onToggleBackground(event, target) {
    if (!this.isEditable) return;
    const item = this._getItem(target);
    if (!item) return;
    const active = !item.system.active;
    if (active) await this._applyBackgroundBonuses(item);
    else await this._removeBackgroundBonuses(item);
    await item.update({ "system.active": active });
  }
  static #onToggleSection(event, target) {
    const section = target.dataset.section;
    const collapsed = !this.#collapsedSections.has(section);
    if (collapsed) this.#collapsedSections.add(section);
    else this.#collapsedSections.delete(section);
    this.#setSectionCollapsed(target, collapsed);
  }
  /** Hard To Kill: one more dramatic wound (and 5 more wounds for heroes). */
  static async #onToggleHtk(event, target) {
    if (!this.isEditable) return;
    const system = this.actor.system;
    const htk = !system.htk;
    const dramatic = htk ? 5 : 4;
    const perDramatic = this.actor.woundGroupSize;
    const update = {
      "system.htk": htk,
      "system.wounds.max": perDramatic * dramatic,
      "system.dwounds.max": dramatic
    };
    if (!htk) {
      if (system.wounds.value > perDramatic * dramatic) update["system.wounds.value"] = perDramatic * dramatic;
      if (system.dwounds.value > dramatic) update["system.dwounds.value"] = dramatic;
    }
    await this.actor.update(update);
  }
  static #onSelectLanguages(event, target) {
    if (!this.isEditable) return;
    new ChoiceSelector({
      document: this.actor,
      field: "system.languages",
      choices: CONFIG.SVNSEA2E.languages,
      title: game.i18n.localize("SVNSEA2E.ActorLangSelect")
    }).render(true);
  }
  static #onInitiativeStep(event, target) {
    if (!this.isEditable) return;
    const step = target.dataset.action === "initiativeUp" ? 1 : -1;
    return updateInitiative(this.actor.id, (this.actor.system.initiative || 0) + step);
  }
  #onInitiativeChange(event) {
    event.preventDefault();
    event.stopPropagation();
    const value = parseInt(event.currentTarget.value, 10);
    return updateInitiative(this.actor.id, Number.isNaN(value) || value < 0 ? 0 : value);
  }
  /**
   * Click on a rank circle (trait, skill, corruption, fear). Clicking the first circle of a rank already
   * at 1 clears it. Hero traits cannot go below 2, so their first circle sets the trait to 2.
   */
  static async #onSetRank(event, target) {
    if (!this.isEditable) return;
    const system = this.actor.system;
    const { type, key, name } = target.dataset;
    let value = parseInt(target.dataset.value);
    if (value === 1) {
      let current = 0;
      switch (type) {
        case "skill":
          current = system.skills[key].value;
          break;
        case "trait":
          if (key === "influence" || key === "strength") current = system.traits[key].value;
          else value = 2;
          break;
        case "corrupt":
          current = system[key];
          break;
        case "fear":
          current = system[key].value;
          break;
      }
      if (current === 1) value = 0;
    }
    await this.actor.update({ [name]: value });
  }
  /** Click on a wound heart. */
  static async #onSetWounds(event, target) {
    if (!this.isEditable) return;
    const clicked = parseInt(target.dataset.value);
    if (Number.isNaN(clicked)) return;
    const system = this.actor.system;
    if (this.actor.type === ActorType.BRUTE) {
      const value = system.wounds.value === 1 && clicked === 1 ? 0 : clicked;
      return this.actor.update({ "system.wounds.value": value });
    }
    let wounds = system.wounds.value;
    let dwounds = system.dwounds.value;
    if (target.dataset.type === "wounds") {
      wounds = system.wounds.value === 1 && clicked === 1 ? 0 : clicked;
      dwounds = Math.max(dwounds, Math.trunc(clicked / this.actor.woundGroupSize));
    } else {
      dwounds = clicked === dwounds ? dwounds - 1 : clicked;
    }
    await this.actor.update({ "system.wounds.value": wounds, "system.dwounds.value": dwounds });
  }
  static #onRollSkill(event, target) {
    if (!this.isEditable) return;
    return rollSkill(this.actor, target.dataset.label);
  }
  static #onRollTrait(event, target) {
    if (!this.isEditable) return;
    return rollTrait(this.actor, target.dataset.label);
  }
  static #onFreeRoll(event, target) {
    if (!this.isEditable) return;
    return rollFreeDice(this.actor);
  }
  /* -------------------------------------------- */
  /*  Drag and drop                               */
  /* -------------------------------------------- */
  /** @override */
  async _onDropItem(event, item) {
    if (!this.actor.isOwner) return null;
    if (item.parent?.uuid === this.actor.uuid) {
      const sorted = await this._onSortItem(event, item);
      return sorted?.length ? item : null;
    }
    if (item.type !== ItemTypes.SORCERY && this._hasItem(item.type, item.name)) {
      ui.notifications.error(game.i18n.format("SVNSEA2E.ItemExists", { type: item.type, name: item.name }));
      return null;
    }
    if (item.type === ItemTypes.BACKGROUND) {
      const nation = item.system.nation;
      const wrongNation = nation === "gisles" ? !isValidGlamorIsles(this.actor) : nation && nation !== "none" && nation !== this.actor.system.nation;
      if (wrongNation) {
        ui.notifications.error(
          game.i18n.format("SVNSEA2E.WrongNation", {
            bgnation: game.i18n.localize(CONFIG.SVNSEA2E.natTypes[nation] ?? nation),
            anation: game.i18n.localize(CONFIG.SVNSEA2E.nations[this.actor.system.nation] ?? ""),
            name: item.name
          })
        );
        return null;
      }
      if (item.system.active) await this._applyBackgroundBonuses(item);
    }
    const [created] = await this.actor.createEmbeddedDocuments("Item", [item.toObject()]);
    return created ?? null;
  }
  _hasItem(type, name) {
    return this.actor.items.some((i) => i.type === type && i.name === name);
  }
  /* -------------------------------------------- */
  /*  Backgrounds                                 */
  /* -------------------------------------------- */
  /** Add the background's advantages to the actor and raise its skills by one. */
  async _applyBackgroundBonuses(background) {
    const toCreate = [];
    for (const name of background.system.advantages) {
      const advantage = await findAdvantage(name);
      if (!advantage) {
        ui.notifications.error(game.i18n.format("SVNSEA2E.ItemDoesntExist", { name }));
        continue;
      }
      if (this._hasItem(ItemTypes.ADVANTAGE, advantage.name) || toCreate.some((a) => a.name === advantage.name)) {
        ui.notifications.error(game.i18n.format("SVNSEA2E.ItemExists", { type: advantage.type, name: advantage.name }));
        continue;
      }
      const data = advantage.toObject();
      delete data._id;
      toCreate.push(data);
    }
    if (toCreate.length) await this.actor.createEmbeddedDocuments("Item", toCreate);
    await this._shiftBackgroundSkills(background, 1);
  }
  /** Remove the background's advantages from the actor and lower its skills by one. */
  async _removeBackgroundBonuses(background) {
    await this._shiftBackgroundSkills(background, -1);
    const names = background.system.advantages;
    const ids = this.actor.items.filter((i) => i.type === ItemTypes.ADVANTAGE && names.includes(i.name)).map((i) => i.id);
    if (ids.length) await this.actor.deleteEmbeddedDocuments("Item", ids);
  }
  async _shiftBackgroundSkills(background, delta) {
    const skills = this.actor.system.skills;
    if (!skills) return;
    const update = {};
    for (const key of background.system.skills) {
      if (!skills[key]) continue;
      update[`system.skills.${key}.value`] = clamp(skills[key].value + delta, 0, 5);
    }
    if (!foundry.utils.isEmpty(update)) await this.actor.update(update);
  }
}
const ACTOR_TEMPLATES = `${TEMPLATES}/actors`;
const tab$1 = (id, label) => ({ id, label: `SVNSEA2E.${label}` });
const scrollable = [".sheet-body .tab", ".sheet-body"];
function prepareCharacterItems(actor, context) {
  context.skills = skillsToSheetData(actor.system);
  context.advantages = itemsOfType(actor, ItemTypes.ADVANTAGE);
  context.backgrounds = itemsOfType(actor, ItemTypes.BACKGROUND);
  context.sorcery = itemsOfType(actor, ItemTypes.SORCERY);
  context.secretsocieties = itemsOfType(actor, ItemTypes.SECRET_SOCIETY);
  context.stories = itemsOfType(actor, ItemTypes.STORY);
  context.duelstyles = itemsOfType(actor, ItemTypes.DUEL_STYLE);
  context.artifacts = itemsOfType(actor, ItemTypes.ARTIFACT);
  context.virtues = itemsOfType(actor, ItemTypes.VIRTUE);
  context.hubriss = itemsOfType(actor, ItemTypes.HUBRIS);
}
class PlayerCharacterSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["pc"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/playercharacter.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab$1("concept", "Concept"),
        tab$1("traits", "Traits"),
        tab$1("advantages", "Features"),
        tab$1("fate", "Fate"),
        tab$1("inventory", "Inventory"),
        tab$1("sorcery", "Sorcery")
      ],
      initial: "traits"
    }
  };
  _prepareItems(context) {
    prepareCharacterItems(this.actor, context);
  }
}
class HeroSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["hero"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/hero.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab$1("traits", "Traits"),
        tab$1("advantages", "Advantages"),
        tab$1("sorcery", "Sorcery"),
        tab$1("inventory", "Inventory"),
        tab$1("fate", "Fate"),
        tab$1("concept", "Concept")
      ],
      initial: "traits"
    }
  };
  _prepareItems(context) {
    prepareCharacterItems(this.actor, context);
  }
}
class VillainSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["villain"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/villain.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab$1("traits", "Traits"),
        tab$1("advantages", "Features"),
        tab$1("sorcery", "Sorcery"),
        tab$1("inventory", "Inventory"),
        tab$1("fate", "Fate"),
        tab$1("concept", "Concept")
      ],
      initial: "traits"
    }
  };
  _prepareItems(context) {
    const actor = this.actor;
    context.villainy = actor.system.villainy;
    context.advantages = itemsOfType(actor, ItemTypes.ADVANTAGE);
    context.artifacts = itemsOfType(actor, ItemTypes.ARTIFACT);
    context.sorcery = itemsOfType(actor, ItemTypes.SORCERY);
    context.schemes = itemsOfType(actor, ItemTypes.SCHEME);
    context.virtues = itemsOfType(actor, ItemTypes.VIRTUE);
    context.hubriss = itemsOfType(actor, ItemTypes.HUBRIS);
    context.monsterqualities = itemsOfType(actor, ItemTypes.MONSTER_QUALITY);
    context.duelstyles = itemsOfType(actor, ItemTypes.DUEL_STYLE);
  }
}
class MonsterSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["monster"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/monster.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [tab$1("features", "Features"), tab$1("fate", "Fate"), tab$1("concept", "Concept")],
      initial: "features"
    }
  };
  _prepareItems(context) {
    const actor = this.actor;
    context.fear = actor.system.fear;
    context.monsterqualities = itemsOfType(actor, ItemTypes.MONSTER_QUALITY);
    context.virtues = itemsOfType(actor, ItemTypes.VIRTUE);
    context.hubriss = itemsOfType(actor, ItemTypes.HUBRIS);
  }
}
class BruteSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["brute"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/brute.hbs`, scrollable: [".sheet-body"] } };
  _prepareItems(context) {
    context.ability = this.actor.system.ability;
    context.advantages = itemsOfType(this.actor, ItemTypes.ADVANTAGE);
    context.duelstyles = itemsOfType(this.actor, ItemTypes.DUEL_STYLE);
  }
}
class DangerPointsSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["dangerpts"],
    position: { width: 450, height: "auto" },
    actions: { adjustPoints: DangerPointsSheet.#onAdjustPoints }
  };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/dangerpts.hbs` } };
  _prepareItems(context) {
    context.points = this.actor.system.points;
  }
  static async #onAdjustPoints(event, target) {
    if (!this.isEditable) return;
    const points = Math.max(0, (parseInt(this.actor.system.points) || 0) + parseInt(target.dataset.delta));
    await this.actor.update({ "system.points": points });
  }
}
const CREW_ROLES = {
  captain: "Captain",
  firstmate: "FirstMate",
  quartermaster: "QuaterMaster",
  accountant: "Accountant",
  boatswain: "Boatswain",
  shipsmaster: "ShipsMaster",
  captaintops: "CaptainTops",
  surgeon: "Surgeon",
  cook: "Cook",
  mastergunner: "MasterGunner",
  mastermariner: "MasterMariner",
  midshipmen: "Midshipmen",
  powdermonkey: "PowderMonkey",
  ableseaman: "AbleSeaman",
  seaman: "Seaman"
};
class ShipSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["ship"],
    actions: { removeCrew: ShipSheet.#onRemoveCrew }
  };
  static PARTS = {
    sheet: { template: `${ACTOR_TEMPLATES}/ship.hbs`, scrollable: [".sheet-body .tab"] }
  };
  static TABS = {
    primary: {
      tabs: [
        { id: "roster", label: "SVNSEA2E.Roster" },
        { id: "cargo", label: "SVNSEA2E.Cargo" },
        { id: "features", label: "SVNSEA2E.Features" }
      ],
      initial: "roster"
    }
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.enrichedCargo = await enrichHTML(this.actor.system.cargo, { secrets: this.actor.isOwner, relativeTo: this.actor });
    return context;
  }
  _prepareItems(context) {
    const system = this.actor.system;
    context.adventures = itemsOfType(this.actor, ItemTypes.SHIP_ADVENTURE);
    context.backgrounds = itemsOfType(this.actor, ItemTypes.SHIP_BACKGROUND);
    context.origin = system.origin;
    context.class = system.class;
    context.crewstatus = system.crewstatus;
    context.cargo = system.cargo;
    context.crew = this._prepareCrew();
  }
  /** The roster: every role with the crew members currently assigned to it. */
  _prepareCrew() {
    const crew = Object.fromEntries(
      Object.entries(CREW_ROLES).map(([role, label]) => [
        role,
        { label: game.i18n.localize(`SVNSEA2E.${label}`), cssClass: role, role, actors: [] }
      ])
    );
    const members = this.actor.getFlag(SYSTEM_ID, "shipsCrew")?.members ?? [];
    for (const id of members) {
      const member = game.actors.get(id);
      const role = member?.getFlag(SYSTEM_ID, "crewMember")?.role;
      if (role && crew[role]) crew[role].actors.push(member);
    }
    return Object.values(crew);
  }
  /** @override */
  async _onRender(context, options) {
    await super._onRender(context, options);
    for (const header of this.element.querySelectorAll(".roster .item-header[data-role]")) {
      header.addEventListener("dragenter", () => header.classList.add("drag-over"));
      header.addEventListener("dragleave", (event) => {
        if (!header.contains(event.relatedTarget)) header.classList.remove("drag-over");
      });
      header.addEventListener("drop", () => header.classList.remove("drag-over"));
    }
  }
  /** Crew members are dragged as actors. */
  async _onDragStart(event) {
    const row = event.currentTarget;
    if (row.dataset.actorId) {
      const actor = game.actors.get(row.dataset.actorId);
      if (actor) event.dataTransfer.setData("text/plain", JSON.stringify(actor.toDragData()));
      return;
    }
    return super._onDragStart(event);
  }
  /** An actor dropped on a role header joins the crew with that role. */
  async _onDropActor(event, actor) {
    if (!this.isEditable || actor.pack) return null;
    const role = event.target.closest("[data-role]")?.dataset.role;
    if (!role) return null;
    const members = this.actor.getFlag(SYSTEM_ID, "shipsCrew")?.members ?? [];
    await actor.setCrewMemberRole(this.actor.id, role);
    if (!members.includes(actor.id)) {
      await this.actor.setFlag(SYSTEM_ID, "shipsCrew", { members: [...members, actor.id] });
    } else {
      this.render();
    }
    return actor;
  }
  static async #onRemoveCrew(event, target) {
    if (!this.isEditable) return;
    const actorId = target.closest("[data-actor-id]")?.dataset.actorId;
    await game.actors.get(actorId)?.removeFromCrew();
    const members = this.actor.getFlag(SYSTEM_ID, "shipsCrew")?.members;
    if (!members) return;
    await this.actor.setFlag(SYSTEM_ID, "shipsCrew", { members: members.filter((id) => id !== actorId) });
  }
}
const DEFAULT_ITEM_ICONS = ["icons/svg/item-bag.svg", CONST.DEFAULT_TOKEN];
const CHAT_TEMPLATES = {
  [ItemTypes.BACKGROUND]: `${TEMPLATES}/items/parts/skill-throw-background.hbs`,
  default: `${TEMPLATES}/items/parts/skill-throw.hbs`
};
const ENRICHED_FIELDS = ["quirk", "bonus", "concern", "earnfavor", "reward", "endings", "steps"];
class SvnSea2EItem extends Item {
  /** Use the system icon for new items that still have the default artwork. */
  async _preCreate(data, options, user) {
    if (await super._preCreate(data, options, user) === false) return false;
    if (!this.img || DEFAULT_ITEM_ICONS.includes(this.img)) {
      this.updateSource({ img: `${SYSTEM_PATH}/icons/${this.type}.jpg` });
    }
  }
  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.type === ItemTypes.SCHEME) {
      const influence = this.system.influence;
      influence.value = clamp(influence.value, influence.min, influence.max);
    }
  }
  /**
   * Data used to display the item in chat or in the expandable summary of the actor sheets.
   * @param {object} [options]
   * @param {boolean} [options.secrets]  Whether to reveal secret blocks.
   */
  async getChatData({ secrets = this.isOwner } = {}) {
    const data = foundry.utils.deepClone(this.system);
    const enrichOptions = { secrets, relativeTo: this, rollData: this.actor?.getRollData() };
    data.description = await enrichHTML(data.description, enrichOptions);
    for (const field of ENRICHED_FIELDS) {
      if (typeof data[field] === "string") data[field] = await enrichHTML(data[field], enrichOptions);
    }
    data.metadatahtml = this[`_${this.type}ChatData`]?.(data) ?? "";
    return data;
  }
  _advantageChatData(data) {
    const points = data.cost.normal === 1 ? game.i18n.localize("SVNSEA2E.Point") : game.i18n.localize("SVNSEA2E.Points");
    let html = `<ul class="details-list"><li class="tag">${data.cost.normal} ${points}</li>`;
    if (data.knack) html += `<li class="tag">${game.i18n.localize("SVNSEA2E.Knack")}</li>`;
    if (data.innate) html += `<li class="tag">${game.i18n.localize("SVNSEA2E.Innate")}</li>`;
    return `${html}</ul>`;
  }
  _artifactChatData(data) {
    const type = !data.artifactType || data.artifactType === "none" ? "" : CONFIG.SVNSEA2E.artifactTypes[data.artifactType];
    return `<ul class="details-list"><li class="tag">${type ?? ""}</li></ul>`;
  }
  _backgroundChatData(data) {
    const tags = (list) => list.map((entry) => `<li class="tag">${entry}</li>`).join("");
    return `<h5>${game.i18n.localize("SVNSEA2E.Quirk")}</h5>
    <p>${data.quirk}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Skills")}</h5>
    <ul class="skills-list">${tags(data.skills.map((s) => CONFIG.SVNSEA2E.skills[s]))}</ul>
    <h5>${game.i18n.localize("SVNSEA2E.Advantages")}</h5>
    <ul class="advantages-list">${tags(data.advantages)}</ul>`;
  }
  _duelstyleChatData(data) {
    return `<h5>${game.i18n.localize("SVNSEA2E.Bonus")}</h5><p>${data.bonus}</p>`;
  }
  _schemeChatData(data) {
    return `<p>${game.i18n.format("SVNSEA2E.ChatInfluence", { influence: data.influence.value })}</p>`;
  }
  _secretsocietyChatData(data) {
    return `<h5>${game.i18n.localize("SVNSEA2E.Concern")}</h5>
    <p>${data.concern}</p>
    <h5>${game.i18n.localize("SVNSEA2E.EarnFavor")}</h5>
    <p>${data.earnfavor}</p>
    <h5>${game.i18n.localize("SVNSEA2E.UseFavor")}</h5>
    <p>${data.callupon}</p>`;
  }
  _sorceryChatData(data) {
    const cfg = CONFIG.SVNSEA2E;
    return `<ul class="tag-list">
    <li class="tag">${cfg.sorceryTypes[data.sorctype] ?? ""}</li>
    <li class="tag">${cfg.sorcerySubcats[data.sorcsubcat] ?? ""} ${cfg.sorceryCats[data.sorccat] ?? ""}</li>
    <li class="tag">${game.i18n.localize("SVNSEA2E.Duration")}: ${cfg.durations[data.sorcdur] ?? ""}</li>
    </ul>`;
  }
  _storyChatData(data) {
    return `<h5>${game.i18n.localize("SVNSEA2E.Status")}</h5>
    <p>${CONFIG.SVNSEA2E.storyStatuses[data.status] ?? ""}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Endings")}</h5>
    <p>${data.endings}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Steps")}</h5>
    <p>${data.steps}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Reward")}</h5>
    <p>${data.reward}</p>`;
  }
  /** Post a card with the item's image, name and description to the chat. */
  async sendToChat() {
    const itemData = await this.getChatData();
    const template = CHAT_TEMPLATES[this.type] ?? CHAT_TEMPLATES.default;
    const content = await foundry.applications.handlebars.renderTemplate(template, {
      ...itemData,
      name: this.name,
      img: this.img,
      item: this
    });
    return ChatMessage.implementation.create({
      author: game.user.id,
      speaker: ChatMessage.implementation.getSpeaker({ actor: this.actor }),
      content
    });
  }
  /** @deprecated Kept for macros written against v23; use {@link sendToChat}. */
  ItemThrow() {
    return this.sendToChat();
  }
}
const { HTMLField, SchemaField, NumberField, StringField, ArrayField, BooleanField } = foundry.data.fields;
const baseSchema = () => ({
  description: new HTMLField(),
  infosource: new StringField(),
  used: new BooleanField({ initial: false })
});
class SimpleItemModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return baseSchema();
  }
}
class AdvantageModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      cost: new SchemaField({
        normal: new NumberField({ initial: 1, required: true }),
        reducecost: new NumberField()
      }),
      knack: new BooleanField({ initial: false }),
      innate: new BooleanField({ initial: false })
    };
  }
}
class ArtifactModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema(), artifactType: new StringField() };
  }
}
class BackgroundModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      quirk: new HTMLField(),
      skills: new ArrayField(new StringField()),
      advantages: new ArrayField(new StringField()),
      nation: new StringField(),
      // Whether the background's skills and advantages are currently applied to the owning actor.
      active: new BooleanField({ initial: true })
    };
  }
}
class DuelStyleModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { ...baseSchema(), bonus: new HTMLField() };
  }
}
class SchemeModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const int2 = (initial) => new NumberField({ required: true, integer: true, min: 0, initial });
    return { ...baseSchema(), influence: new SchemaField({ value: int2(0), min: int2(0), max: int2(40) }) };
  }
}
class SecretSocietyModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      concern: new HTMLField(),
      earnfavor: new HTMLField(),
      callupon: new StringField(),
      favor: new HTMLField()
    };
  }
}
class SorceryModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      sorctype: new StringField(),
      sorcdur: new StringField(),
      sorccat: new StringField(),
      sorcsubcat: new StringField()
    };
  }
}
class StoryModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      reward: new HTMLField(),
      endings: new HTMLField(),
      steps: new HTMLField(),
      status: new StringField({ initial: "current" })
    };
  }
}
class HubrisModel extends SimpleItemModel {
}
class MonsterQualityModel extends SimpleItemModel {
}
class ShipAdventureModel extends SimpleItemModel {
}
class ShipBackgroundModel extends SimpleItemModel {
}
class VirtueModel extends SimpleItemModel {
}
const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;
const ITEM_TEMPLATES = `${TEMPLATES}/items`;
const tab = (id, label) => ({ id, label: `SVNSEA2E.${label}` });
const DESCRIPTION_TAB = { primary: { tabs: [tab("description", "Description")], initial: "description" } };
const EDITOR_FIELDS = {
  [ItemTypes.BACKGROUND]: ["quirk"],
  [ItemTypes.DUEL_STYLE]: ["bonus"],
  [ItemTypes.SECRET_SOCIETY]: ["concern", "earnfavor", "callupon"],
  [ItemTypes.STORY]: ["reward", "endings", "steps"]
};
class SvnSea2EItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["svnsea2e", "sheet", "item", "themed", "theme-light"],
    position: { width: 600, height: 700 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      selectSkills: SvnSea2EItemSheet.#onSelectSkills,
      selectAdvantages: SvnSea2EItemSheet.#onSelectAdvantages
    }
  };
  static TABS = DESCRIPTION_TAB;
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.item;
    const system = item.system;
    Object.assign(context, {
      item,
      system,
      owner: item.isOwner,
      editable: this.isEditable,
      cssClass: item.isOwner ? "editable" : "locked",
      config: CONFIG.SVNSEA2E,
      tabs: this._prepareTabs("primary"),
      itemType: CONFIG.SVNSEA2E.itemTypes[item.type],
      name: item.name,
      img: item.img,
      type: item.type,
      infosource: system.infosource,
      enriched: {}
    });
    const enrichOptions = { secrets: item.isOwner, relativeTo: item, rollData: item.actor?.getRollData() };
    for (const field of ["description", ...EDITOR_FIELDS[item.type] ?? []]) {
      context.enriched[field] = await enrichHTML(system[field], enrichOptions);
    }
    switch (item.type) {
      case ItemTypes.BACKGROUND:
        context.selectedskills = system.skills.map((s) => CONFIG.SVNSEA2E.skills[s]);
        context.selectedadvantages = system.advantages;
        context.nation = system.nation;
        break;
      case ItemTypes.ADVANTAGE:
        context.normalCost = system.cost.normal;
        context.reducedCost = system.cost.reducecost;
        context.knack = system.knack;
        context.innate = system.innate;
        break;
      case ItemTypes.SCHEME:
        context.influence = system.influence;
        break;
      case ItemTypes.SECRET_SOCIETY:
        context.favor = system.favor;
        break;
      case ItemTypes.SORCERY:
        context.sorceryType = system.sorctype;
        context.sorceryDuration = system.sorcdur;
        context.sorceryCategory = system.sorccat;
        context.sorcerySubCategory = system.sorcsubcat;
        break;
      case ItemTypes.STORY:
        context.storyStatus = system.status;
        break;
      case ItemTypes.ARTIFACT:
        context.artifactType = system.artifactType;
        break;
    }
    return context;
  }
  static #onSelectSkills(event, target) {
    if (!this.isEditable) return;
    new ChoiceSelector({
      document: this.item,
      field: "system.skills",
      choices: CONFIG.SVNSEA2E.skills,
      title: game.i18n.localize("SVNSEA2E.BackgroundSkillSelect")
    }).render(true);
  }
  static async #onSelectAdvantages(event, target) {
    if (!this.isEditable) return;
    const names = await getAllAdvantageNames();
    new ChoiceSelector({
      document: this.item,
      field: "system.advantages",
      choices: Object.fromEntries(names.map((name) => [name, name])),
      title: game.i18n.localize("SVNSEA2E.BackgroundAdvantageSelect")
    }).render(true);
  }
}
const part = (template) => ({ sheet: { template: `${ITEM_TEMPLATES}/${template}.hbs`, scrollable: [".sheet-body .tab"] } });
class AdvantageSheet extends SvnSea2EItemSheet {
  static PARTS = part("advantage");
  static TABS = {
    primary: { tabs: [tab("description", "Description"), tab("attributes", "Attributes")], initial: "description" }
  };
}
class ArtifactSheet extends SvnSea2EItemSheet {
  static PARTS = part("artifact");
}
class BackgroundSheet extends SvnSea2EItemSheet {
  static PARTS = part("background");
  static TABS = {
    primary: {
      tabs: [tab("description", "Description"), tab("quirk", "Quirk"), tab("details", "Details")],
      initial: "description"
    }
  };
}
class DuelStyleSheet extends SvnSea2EItemSheet {
  static PARTS = part("duelstyle");
  static TABS = {
    primary: { tabs: [tab("description", "Description"), tab("bonus", "Bonus")], initial: "description" }
  };
}
class MonsterQualitySheet extends SvnSea2EItemSheet {
  static PARTS = part("simple");
}
class SchemeSheet extends SvnSea2EItemSheet {
  static PARTS = part("scheme");
}
class SecretSocietySheet extends SvnSea2EItemSheet {
  static DEFAULT_OPTIONS = { position: { width: 800 } };
  static PARTS = part("secretsociety");
  static TABS = {
    primary: {
      tabs: [
        tab("description", "Description"),
        tab("concern", "Concern"),
        tab("earnfavor", "EarnFavor"),
        tab("callupon", "UseFavor")
      ],
      initial: "description"
    }
  };
}
class ShipAdventureSheet extends SvnSea2EItemSheet {
  static PARTS = part("simple");
}
class ShipBackgroundSheet extends SvnSea2EItemSheet {
  static PARTS = part("simple");
}
class SorcerySheet extends SvnSea2EItemSheet {
  static DEFAULT_OPTIONS = { position: { width: 750 } };
  static PARTS = part("sorcery");
}
class StorySheet extends SvnSea2EItemSheet {
  static PARTS = part("story");
  static TABS = {
    primary: {
      tabs: [tab("description", "Description"), tab("reward", "Reward"), tab("endings", "Endings"), tab("steps", "Steps")],
      initial: "description"
    }
  };
}
class VirtueSheet extends SvnSea2EItemSheet {
  static PARTS = part("simple");
}
class HubrisSheet extends SvnSea2EItemSheet {
  static PARTS = part("simple");
}
Hooks.once("init", () => {
  console.log(`7th Sea 2E | Initializing 7th Sea Second Edition System
${SVNSEA2E.ASCII}`);
  game.svnsea2e = {
    applications: { SvnSea2EActor, SvnSea2EItem },
    config: SVNSEA2E,
    migrations,
    rolls: { rollDicePool, rollSkill, rollTrait, rollFreeDice },
    updateInitiative,
    toolbox: new Toolbox()
  };
  CONFIG.SVNSEA2E = SVNSEA2E;
  CONFIG.SVNSEA2E.natTypes = { ...SVNSEA2E.nations, gisles: "SVNSEA2E.RegionGlamourIsles" };
  CONFIG.Combat.initiative = { formula: "1d20", decimals: 2 };
  CONFIG.Actor.documentClass = SvnSea2EActor;
  CONFIG.Item.documentClass = SvnSea2EItem;
  Object.assign(CONFIG.Actor.dataModels, {
    [ActorType.BRUTE]: BruteModel,
    [ActorType.DANGERPOINTS]: DangerPointsModel,
    [ActorType.HERO]: HeroModel,
    [ActorType.MONSTER]: MonsterModel,
    [ActorType.PLAYER]: PlayerModel,
    [ActorType.SHIP]: ShipModel,
    [ActorType.VILLAIN]: VillainModel
  });
  Object.assign(CONFIG.Item.dataModels, {
    [ItemTypes.ADVANTAGE]: AdvantageModel,
    [ItemTypes.ARTIFACT]: ArtifactModel,
    [ItemTypes.BACKGROUND]: BackgroundModel,
    [ItemTypes.DUEL_STYLE]: DuelStyleModel,
    [ItemTypes.MONSTER_QUALITY]: MonsterQualityModel,
    [ItemTypes.SCHEME]: SchemeModel,
    [ItemTypes.SECRET_SOCIETY]: SecretSocietyModel,
    [ItemTypes.SHIP_ADVENTURE]: ShipAdventureModel,
    [ItemTypes.SHIP_BACKGROUND]: ShipBackgroundModel,
    [ItemTypes.SORCERY]: SorceryModel,
    [ItemTypes.STORY]: StoryModel,
    [ItemTypes.VIRTUE]: VirtueModel,
    [ItemTypes.HUBRIS]: HubrisModel
  });
  registerSystemSettings();
  registerSheets();
  registerHandlebarsHelpers();
  return preloadHandlebarsTemplates();
});
function registerSheets() {
  const { DocumentSheetConfig } = foundry.applications.apps;
  for (const sheet of [foundry.appv1?.sheets?.ActorSheet, foundry.applications.sheets.ActorSheetV2]) {
    if (sheet) DocumentSheetConfig.unregisterSheet(Actor, "core", sheet);
  }
  for (const sheet of [foundry.appv1?.sheets?.ItemSheet, foundry.applications.sheets.ItemSheetV2]) {
    if (sheet) DocumentSheetConfig.unregisterSheet(Item, "core", sheet);
  }
  const register = (documentClass, sheet, type) => DocumentSheetConfig.registerSheet(documentClass, SYSTEM_ID, sheet, { types: [type], makeDefault: true });
  register(Actor, PlayerCharacterSheet, ActorType.PLAYER);
  register(Actor, HeroSheet, ActorType.HERO);
  register(Actor, BruteSheet, ActorType.BRUTE);
  register(Actor, MonsterSheet, ActorType.MONSTER);
  register(Actor, VillainSheet, ActorType.VILLAIN);
  register(Actor, ShipSheet, ActorType.SHIP);
  register(Actor, DangerPointsSheet, ActorType.DANGERPOINTS);
  register(Item, AdvantageSheet, ItemTypes.ADVANTAGE);
  register(Item, ArtifactSheet, ItemTypes.ARTIFACT);
  register(Item, BackgroundSheet, ItemTypes.BACKGROUND);
  register(Item, DuelStyleSheet, ItemTypes.DUEL_STYLE);
  register(Item, MonsterQualitySheet, ItemTypes.MONSTER_QUALITY);
  register(Item, SchemeSheet, ItemTypes.SCHEME);
  register(Item, SecretSocietySheet, ItemTypes.SECRET_SOCIETY);
  register(Item, ShipAdventureSheet, ItemTypes.SHIP_ADVENTURE);
  register(Item, ShipBackgroundSheet, ItemTypes.SHIP_BACKGROUND);
  register(Item, SorcerySheet, ItemTypes.SORCERY);
  register(Item, StorySheet, ItemTypes.STORY);
  register(Item, VirtueSheet, ItemTypes.VIRTUE);
  register(Item, HubrisSheet, ItemTypes.HUBRIS);
}
Hooks.once("setup", () => {
  const lists = [
    "actorTypes",
    "natTypes",
    "artifactTypes",
    "crewStatuses",
    "durations",
    "itemTypes",
    "languages",
    "nations",
    "traits",
    "shipRoles",
    "skills",
    "sorceryTypes",
    "sorceryCats",
    "sorcerySubcats",
    "storyStatuses"
  ];
  for (const list of lists) {
    const entries = Object.entries(CONFIG.SVNSEA2E[list]).map(([key, label]) => [key, game.i18n.localize(label)]);
    entries.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.SVNSEA2E[list] = Object.fromEntries(entries);
  }
});
Hooks.once("ready", async () => {
  registerChatListeners();
  await migrateWorldIfNeeded();
  game.svnsea2e.toolbox.render(true);
});
Hooks.on("updateActor", (actor) => {
  if (game.svnsea2e.toolbox.shows(actor)) game.svnsea2e.toolbox.render();
});
for (const hook of ["createItem", "updateItem", "deleteItem"]) Hooks.on(hook, invalidateAdvantageCache);
Hooks.on("renderActorDirectory", (app, html) => {
  if (!game.user.isGM || html.querySelector(".svnsea2e-toolbox-button")) return;
  const header = html.querySelector(".directory-header");
  if (!header) return;
  const wrapper = document.createElement("div");
  wrapper.className = "header-actions action-buttons flexrow svnsea2e-toolbox-button";
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = `<i class="fa-solid fa-toolbox"></i> ${game.i18n.localize("SVNSEA2E.OpenToolbox")}`;
  button.addEventListener("click", () => game.svnsea2e.toolbox.render(true));
  wrapper.append(button);
  header.insertBefore(wrapper, header.querySelector("search"));
});
Hooks.on("renderCombatTracker", onRenderCombatTracker);
//# sourceMappingURL=svnsea2e.mjs.map
