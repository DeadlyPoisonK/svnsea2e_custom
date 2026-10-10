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
SVNSEA2E.crewRoles = {
  captain: "SVNSEA2E.Captain",
  firstmate: "SVNSEA2E.FirstMate",
  quartermaster: "SVNSEA2E.QuaterMaster",
  accountant: "SVNSEA2E.Accountant",
  boatswain: "SVNSEA2E.Boatswain",
  shipsmaster: "SVNSEA2E.ShipsMaster",
  captaintops: "SVNSEA2E.CaptainTops",
  surgeon: "SVNSEA2E.Surgeon",
  cook: "SVNSEA2E.Cook",
  mastergunner: "SVNSEA2E.MasterGunner",
  mastermariner: "SVNSEA2E.MasterMariner",
  midshipmen: "SVNSEA2E.Midshipmen",
  powdermonkey: "SVNSEA2E.PowderMonkey",
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
  game.settings.register(SYSTEM_ID, "toolboxColumns", {
    name: "Toolbox columns",
    scope: "client",
    config: false,
    type: Object,
    default: {}
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
  "actors/parts/item-list.hbs",
  "actors/parts/item-row.hbs",
  "actors/parts/rank-circles.hbs",
  "parts/sheet-tabs.hbs",
  "parts/effects-tab.hbs",
  "items/parts/item-header.hbs",
  "items/parts/item-editor.hbs",
  // Chosen by item type in templates/items/item.hbs.
  "items/parts/header-artifact.hbs",
  "items/parts/header-background.hbs",
  "items/parts/header-scheme.hbs",
  "items/parts/header-secretsociety.hbs",
  "items/parts/header-sorcery.hbs",
  "items/parts/header-story.hbs",
  "items/parts/tab-attributes.hbs",
  "items/parts/tab-details.hbs"
];
function preloadHandlebarsTemplates() {
  return foundry.applications.handlebars.loadTemplates(PARTIALS.map((p) => `${TEMPLATES}/${p}`));
}
function registerHandlebarsHelpers() {
  Handlebars.registerHelper("for", function(from, count2, step, options) {
    const start = parseInt(from);
    const end = start + parseInt(count2);
    const groupSize = parseInt(options.hash.group) || 5;
    const data = Handlebars.createFrame(options.data);
    let out = "";
    for (let i = start; i < end; i += step) {
      data.index = i;
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
const SYSTEM_KEY = /^system\.(?:(?:traits|skills)\.\w+\.value|fear\.value|dwounds\.max|htk|rollBonus\.[\w.]+)$/;
const changePhase = (change) => SYSTEM_KEY.test(change.key ?? "") ? "initial" : change.phase;
const HERO_TRAITS = ["brawn", "finesse", "resolve", "wits", "panache"];
const ROLL_OPTIONS = {
  addOne: "SVNSEA2E.AddOneToDice",
  explode: "SVNSEA2E.ExplodeTens",
  joieDeVivre: "SVNSEA2E.JoieDeVivre",
  increaseThreshold: "SVNSEA2E.IncreaseThreshold"
};
function rollBonusData() {
  return {
    dice: 0,
    skills: Object.fromEntries(Object.keys(CONFIG.SVNSEA2E.skills).map((skill) => [skill, 0])),
    ...Object.fromEntries(Object.keys(ROLL_OPTIONS).map((option) => [option, false]))
  };
}
let effectKeys = null;
function getEffectKeys() {
  if (effectKeys) return effectKeys;
  const { traits, skills } = CONFIG.SVNSEA2E;
  const format = (key, name) => game.i18n.format(`SVNSEA2E.EffectKey${key}`, { name });
  const keys = {};
  for (const trait of [...HERO_TRAITS, "strength", "influence"]) keys[`system.traits.${trait}.value`] = format("Trait", traits[trait]);
  keys["system.fear.value"] = format("Trait", game.i18n.localize("SVNSEA2E.Fear"));
  for (const [skill, label] of Object.entries(skills)) keys[`system.skills.${skill}.value`] = format("Skill", label);
  keys["system.dwounds.max"] = game.i18n.localize("SVNSEA2E.EffectKeyDramaticWounds");
  keys["system.htk"] = game.i18n.localize("SVNSEA2E.HardToKill");
  keys["system.rollBonus.dice"] = game.i18n.localize("SVNSEA2E.EffectKeyDice");
  for (const [skill, label] of Object.entries(skills)) keys[`system.rollBonus.skills.${skill}`] = format("SkillDice", label);
  for (const [option, label] of Object.entries(ROLL_OPTIONS)) {
    keys[`system.rollBonus.${option}`] = format("Roll", game.i18n.localize(label));
  }
  return effectKeys = keys;
}
function hardToKillEffectData() {
  return {
    name: game.i18n.localize("SVNSEA2E.HardToKill"),
    img: "icons/svg/regen.svg",
    description: game.i18n.localize("SVNSEA2E.HardToKillDescription"),
    system: { changes: [{ key: "system.htk", type: "override", value: "true", phase: "initial" }] },
    flags: { [SYSTEM_ID]: { hardToKill: true } }
  };
}
class SvnSea2EActiveEffect extends ActiveEffect {
  /** The effects of an inactive background do not apply: like its skills and advantages, they need it active. */
  get isSuppressed() {
    if (this.parent?.type === ItemTypes.BACKGROUND && !this.parent.system.active) return true;
    return super.isSuppressed;
  }
  /** @override */
  shouldApplyChange(change, options) {
    return changePhase(change) === options?.phase;
  }
}
const CHANGE_SIGNS = { add: "+", subtract: "−", multiply: "×", override: "=", upgrade: "≥", downgrade: "≤" };
function describeChanges(effect) {
  const keys = getEffectKeys();
  return effect.system.changes.filter((change) => change.key).map((change) => {
    const value = String(change.value ?? "");
    const sign = CHANGE_SIGNS[change.type] ?? change.type;
    if (change.type === "add") return `${keys[change.key] ?? change.key} ${value.startsWith("-") ? "" : sign}${value}`;
    return `${keys[change.key] ?? change.key} ${sign}${change.type === "subtract" ? "" : " "}${value}`;
  }).join(", ");
}
function effectRow(effect) {
  return {
    id: effect.id,
    name: effect.name,
    img: effect.img,
    disabled: effect.disabled,
    suppressed: effect.isSuppressed,
    active: effect.active,
    duration: effect.isTemporary ? effect.duration.label : "",
    changes: describeChanges(effect)
  };
}
function prepareEffects(document2) {
  const sections = { temporary: [], passive: [], inactive: [] };
  for (const effect of document2.effects) {
    const section = !effect.active ? "inactive" : effect.isTemporary ? "temporary" : "passive";
    sections[section].push(effectRow(effect));
  }
  const labels = { temporary: "SVNSEA2E.EffectsTemporary", passive: "SVNSEA2E.EffectsPassive", inactive: "SVNSEA2E.EffectsInactive" };
  const context = {
    sections: Object.entries(sections).map(([id, effects]) => ({ id, label: labels[id], effects }))
  };
  if (document2.documentName === "Actor") {
    context.isActor = true;
    context.inherited = [];
    for (const item of document2.items) {
      for (const effect of item.effects) {
        if (effect.transfer) context.inherited.push({ ...effectRow(effect), itemId: item.id, itemName: item.name });
      }
    }
    context.inherited.sort((a, b) => a.name.localeCompare(b.name));
  }
  return context;
}
function getEffect(sheet, target) {
  const row = target.closest("[data-effect-id]");
  if (!row) return null;
  const parent = row.dataset.itemId ? sheet.document.items.get(row.dataset.itemId) : sheet.document;
  return parent?.effects.get(row.dataset.effectId) ?? null;
}
async function onCreateEffect(event, target) {
  if (!this.isEditable) return;
  const document2 = this.document;
  const data = { name: game.i18n.localize("SVNSEA2E.NewEffect"), origin: document2.uuid };
  if (target.dataset.section === "temporary") data.duration = { value: 1, units: "rounds" };
  if (target.dataset.section === "inactive") data.disabled = true;
  const [effect] = await document2.createEmbeddedDocuments("ActiveEffect", [data]);
  effect?.sheet.render(true);
}
function onEditEffect(event, target) {
  getEffect(this, target)?.sheet.render(true);
}
async function onToggleEffect(event, target) {
  if (!this.isEditable) return;
  const effect = getEffect(this, target);
  if (effect) await effect.update({ disabled: !effect.disabled });
}
async function onDeleteEffect(event, target) {
  if (!this.isEditable) return;
  await getEffect(this, target)?.delete();
}
async function onOpenEffectSource(event, target) {
  const item = this.document.items.get(target.closest("[data-item-id]")?.dataset.itemId);
  if (!item) return;
  item.sheet.tabGroups.primary = "effects";
  await item.sheet.render(true);
}
const EFFECT_ACTIONS = {
  createEffect: onCreateEffect,
  editEffect: onEditEffect,
  toggleEffect: onToggleEffect,
  deleteEffect: onDeleteEffect,
  openEffectSource: onOpenEffectSource
};
const EFFECTS_TAB = { id: "effects", label: "SVNSEA2E.Effects" };
function withEffectsTab(config) {
  return config ? { ...config, tabs: [...config.tabs, EFFECTS_TAB] } : config;
}
function onRenderActiveEffectConfig(app, html) {
  const inputs = html.querySelectorAll('input[name^="system.changes."][name$=".key"]');
  if (!inputs.length) return;
  const id = `${SYSTEM_ID}-effect-keys-${app.id}`;
  if (!html.querySelector(`#${CSS.escape(id)}`)) {
    const list = document.createElement("datalist");
    list.id = id;
    for (const [key, label] of Object.entries(getEffectKeys())) list.append(new Option(label, key));
    html.append(list);
  }
  for (const input of inputs) input.setAttribute("list", id);
}
const MIGRATIONS = [
  {
    // The ship roster moves from two flags (the members on the ship, the role on each member) to `system.crew`.
    version: "25.0",
    prepare() {
      this.roles = new Map(game.actors.map((actor) => [actor.id, actor.getFlag(SYSTEM_ID, "crewMember")?.role]));
    },
    actor(actor) {
      const flags = actor.flags[SYSTEM_ID] ?? {};
      const update = {};
      const remove = () => new foundry.data.operators.ForcedDeletion();
      if ("crewMember" in flags) update[`flags.${SYSTEM_ID}.crewMember`] = remove();
      if ("shipsCrew" in flags) {
        update[`flags.${SYSTEM_ID}.shipsCrew`] = remove();
        if (actor.type === ActorType.SHIP) {
          const members = flags.shipsCrew?.members ?? [];
          update["system.crew"] = members.map((actorId) => ({ actorId, role: this.roles?.get(actorId) })).filter((member) => member.role);
        }
      }
      return update;
    }
  },
  {
    // Hard To Kill: an active effect that overrides `system.htk` replaces the toggle of the sheet. The effect goes on
    // the actor's Hard To Kill advantage, or on the actor when it has none, and the stored `htk` goes back to false.
    version: "25.0",
    async afterActor(actor) {
      if (!("htk" in actor.system)) return;
      const advantages = actor.items.filter((item) => isHardToKill(item));
      const stored = actor.isToken ? actor.token.delta?._source.system?.htk : actor._source.system.htk;
      if (stored === true) {
        if (!hasHardToKillEffect(actor) && !advantages.some(hasHardToKillEffect)) {
          const holder = actor.isToken ? actor : advantages[0] ?? actor;
          await holder.createEmbeddedDocuments("ActiveEffect", [hardToKillEffectData()]);
        }
        await actor.update({ "system.htk": false });
      } else if (!actor.isToken) {
        for (const advantage of advantages.filter((a) => !hasHardToKillEffect(a))) {
          await advantage.createEmbeddedDocuments("ActiveEffect", [{ ...hardToKillEffectData(), disabled: true }]);
        }
      }
    },
    async afterItem(item) {
      if (isHardToKill(item) && !hasHardToKillEffect(item)) {
        await item.createEmbeddedDocuments("ActiveEffect", [hardToKillEffectData()]);
      }
    }
  }
];
const HARD_TO_KILL_NAMES = ["hard to kill", "duro de matar"];
const isHardToKill = (item) => item.type === ItemTypes.ADVANTAGE && HARD_TO_KILL_NAMES.includes(item.name.trim().toLowerCase());
const hasHardToKillEffect = (document2) => document2.effects.some((effect) => effect.system.changes.some((change) => change.key === "system.htk"));
async function migrateWorldIfNeeded() {
  if (!game.users.activeGM?.isSelf) return;
  const lastMigrated = game.settings.get(SYSTEM_ID, "systemMigrationVersion");
  const pending = MIGRATIONS.filter(
    (m) => !lastMigrated || foundry.utils.isNewerVersion(m.version, lastMigrated)
  );
  if (pending.length) await migrateWorld(pending);
  const migrated = [game.system.version, lastMigrated, ...pending.map((m) => m.version)].filter(Boolean).reduce(
    (a, b) => foundry.utils.isNewerVersion(b, a) ? b : a
  );
  if (lastMigrated !== migrated) await game.settings.set(SYSTEM_ID, "systemMigrationVersion", migrated);
}
async function migrateWorld(migrations2) {
  ui.notifications.info(
    `Applying 7th Sea 2E System Migration for version ${game.system.version}. Please be patient and do not close your game or shut down your server.`,
    { permanent: true }
  );
  for (const migration of migrations2) migration.prepare?.();
  const actorUpdate = (actor) => collectUpdates(migrations2, "actor", actor);
  const itemUpdate = (item) => collectUpdates(migrations2, "item", item);
  const migrateItem = async (item) => {
    await applyUpdate(item, itemUpdate(item));
    await runSteps(migrations2, "afterItem", item);
  };
  const migrateActor = async (actor) => {
    await applyUpdate(actor, actorUpdate(actor));
    const itemUpdates = actor.items.map((item) => ({ ...itemUpdate(item), _id: item.id })).filter((u) => Object.keys(u).length > 1);
    if (itemUpdates.length) await actor.updateEmbeddedDocuments("Item", itemUpdates);
    await runSteps(migrations2, "afterActor", actor);
  };
  for (const actor of game.actors) await migrateActor(actor);
  for (const item of game.items) await migrateItem(item);
  for (const scene of game.scenes) {
    for (const token of scene.tokens) {
      if (!token.actorLink && token.actor) await runSteps(migrations2, "afterActor", token.actor);
    }
  }
  for (const pack of game.packs) {
    if (pack.metadata.packageType !== "world" || !["Actor", "Item"].includes(pack.documentName)) continue;
    const wasLocked = pack.locked;
    await pack.configure({ locked: false });
    for (const doc of await pack.getDocuments()) {
      if (pack.documentName === "Actor") await migrateActor(doc);
      else await migrateItem(doc);
    }
    await pack.configure({ locked: wasLocked });
  }
  ui.notifications.info(`7th Sea 2E System Migration to version ${game.system.version} completed!`, { permanent: true });
}
function collectUpdates(migrations2, kind, doc) {
  return migrations2.reduce((update, m) => Object.assign(update, m[kind]?.call(m, doc) ?? {}), {});
}
async function runSteps(migrations2, kind, doc) {
  for (const m of migrations2) {
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
function onRenderChatMessage(message, html) {
  const color = message.author?.color;
  if (!color) return;
  html.style.setProperty("--svnsea-author-color", color.css);
  html.style.setProperty("--svnsea-author-text", isLight(color) ? "#000" : "#fff");
}
function isLight(color) {
  const [r, g, b] = color.rgb.map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179;
}
const { ApplicationV2: ApplicationV2$1, DialogV2: DialogV2$1, HandlebarsApplicationMixin: HandlebarsApplicationMixin$3 } = foundry.applications.api;
const { getProperty } = foundry.utils;
const COLUMNS = [
  { key: "raises", path: "initiative", icon: "fa-star-of-life", label: "SVNSEA2E.Initiative" },
  { key: "heropts", path: "heropts", icon: "fa-sun", label: "SVNSEA2E.HeroPoints" },
  { key: "wounds", path: "wounds.value", max: "wounds.max", icon: "fa-heart", label: "SVNSEA2E.Wounds" },
  { key: "dwounds", path: "dwounds.value", max: "dwounds.max", icon: "fa-heart-crack", label: "SVNSEA2E.DramaWounds" },
  { key: "points", path: "points", icon: "fa-skull", label: "SVNSEA2E.DangerPoints", fixed: true }
];
class Toolbox extends HandlebarsApplicationMixin$3(ApplicationV2$1) {
  static DEFAULT_OPTIONS = {
    id: "svnsea-toolbox",
    classes: ["svnsea2e", "toolbox", "themed", "theme-dark"],
    window: {
      title: "SVNSEA2E.Toolbox",
      minimizable: true,
      resizable: true,
      controls: [{ icon: "fa-solid fa-gear", label: "SVNSEA2E.ToolboxConfigure", action: "configure" }]
    },
    position: { top: 20, width: 420, height: "auto" },
    actions: {
      adjust: Toolbox.#onAdjust,
      configure: Toolbox.#onConfigure,
      openSheet: Toolbox.#onOpenSheet,
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
  /** Keys of the optional columns the GM chose to show. */
  get columnKeys() {
    const chosen = game.settings.get(SYSTEM_ID, "toolboxColumns") ?? {};
    return COLUMNS.filter((column) => column.fixed || chosen[column.key] !== false).map((column) => column.key);
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
    options.position.left ??= Math.max(window.innerWidth - 770, 0);
    return options;
  }
  /** @override */
  async _prepareContext(options) {
    const actors = this.actorUuids.map((uuid) => fromUuidSync(uuid)).filter((actor) => actor);
    const keys = this.columnKeys;
    const columns = COLUMNS.filter(
      (column) => keys.includes(column.key) && actors.some((actor) => getProperty(actor.system, column.path) !== void 0)
    );
    const rows = actors.map((actor) => ({
      uuid: actor.uuid,
      name: actor.name,
      cells: columns.map((column) => {
        const value = getProperty(actor.system, column.path);
        if (value === void 0) return null;
        const max = column.max && getProperty(actor.system, column.max);
        return { key: column.key, label: column.label, text: max ? `${value}/${max}` : `${value}` };
      })
    }));
    return { columns, rows };
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
  /** +1 / -1 on a value; the updateActor hook re-renders the toolbox. */
  static async #onAdjust(event, target) {
    const actor = fromUuidSync(target.closest("[data-uuid]").dataset.uuid);
    const column = COLUMNS.find((c) => c.key === target.dataset.key);
    if (!actor || !column) return;
    const system = actor.system;
    const delta = Number(target.dataset.delta);
    const max = column.max ? getProperty(system, column.max) : Infinity;
    const value = clamp(getProperty(system, column.path) + delta, 0, max);
    if (column.key === "raises") return updateInitiative(actor.id, value);
    if (column.key === "wounds") return actor.update(system.woundUpdate(value));
    await actor.update({ [`system.${column.path}`]: value });
  }
  /** Choose the columns to show. */
  static async #onConfigure() {
    const keys = this.columnKeys;
    const content = COLUMNS.filter((column) => !column.fixed).map(
      (column) => `<label class="checkbox">
          <input type="checkbox" name="${column.key}" ${keys.includes(column.key) ? "checked" : ""} />
          <i class="fa-solid ${column.icon}"></i> ${game.i18n.localize(column.label)}
        </label>`
    ).join("");
    const chosen = await DialogV2$1.wait({
      window: { title: "SVNSEA2E.ToolboxConfigure" },
      classes: ["svnsea2e", "toolbox-config"],
      content: `<p>${game.i18n.localize("SVNSEA2E.ToolboxColumns")}</p><div class="toolbox-columns">${content}</div>`,
      buttons: [
        {
          action: "save",
          label: game.i18n.localize("SVNSEA2E.Save"),
          icon: "fa-solid fa-floppy-disk",
          default: true,
          callback: (event, button) => Object.fromEntries(COLUMNS.filter((c) => !c.fixed).map((c) => [c.key, button.form.elements[c.key].checked]))
        }
      ],
      rejectClose: false
    });
    if (!chosen) return;
    await game.settings.set(SYSTEM_ID, "toolboxColumns", chosen);
    this.render();
  }
  static #onOpenSheet(event, target) {
    fromUuidSync(target.closest("[data-uuid]").dataset.uuid)?.sheet.render(true);
  }
  static async #onRemoveActor(event, target) {
    const uuid = target.closest("[data-uuid]").dataset.uuid;
    await this._setActorUuids(this.actorUuids.filter((u) => u !== uuid));
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
  /* -------------------------------------------- */
  /*  Backgrounds                                 */
  /* -------------------------------------------- */
  /**
   * An active background grants its advantages and +1 to its skills however it is added: from the sheet, the items
   * directory, a macro... Only the client that made the change applies them.
   * @override
   */
  _onCreateDescendantDocuments(parent, collection, documents, data, options, userId) {
    super._onCreateDescendantDocuments(parent, collection, documents, data, options, userId);
    if (userId !== game.user.id || parent !== this) return;
    const backgrounds = documents.filter((item) => item.type === ItemTypes.BACKGROUND && item.system.active);
    if (backgrounds.length) this.#forEach(backgrounds, (background) => this.applyBackground(background));
  }
  /** Deleting an active background takes back what it granted. @override */
  _onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId) {
    super._onDeleteDescendantDocuments(parent, collection, documents, ids, options, userId);
    if (userId !== game.user.id || parent !== this) return;
    const backgrounds = documents.filter((item) => item.type === ItemTypes.BACKGROUND && item.system.active);
    if (backgrounds.length) this.#forEach(backgrounds, (background) => this.removeBackground(background));
  }
  /** Run an async task for each document, one after the other. */
  async #forEach(documents, task) {
    for (const document2 of documents) await task(document2);
  }
  /** Activate or deactivate a background, adding or removing what it grants. */
  async toggleBackground(background) {
    const active = !background.system.active;
    if (active) await this.applyBackground(background);
    else await this.removeBackground(background);
    await background.update({ "system.active": active });
  }
  /**
   * Add the background's advantages to the actor and raise its skills by one. The advantages are marked with the
   * background that created them, so that removing it only removes those.
   */
  async applyBackground(background) {
    const toCreate = [];
    for (const name of background.system.advantages) {
      const advantage = await findAdvantage(name);
      if (!advantage) {
        ui.notifications.error(game.i18n.format("SVNSEA2E.ItemDoesntExist", { name }));
        continue;
      }
      if (this.hasItem(ItemTypes.ADVANTAGE, advantage.name) || toCreate.some((a) => a.name === advantage.name)) {
        ui.notifications.error(game.i18n.format("SVNSEA2E.ItemExists", { type: advantage.type, name: advantage.name }));
        continue;
      }
      const data = advantage.toObject();
      delete data._id;
      foundry.utils.setProperty(data, `flags.${SYSTEM_ID}.grantedBy`, background.id);
      toCreate.push(data);
    }
    if (toCreate.length) await this.createEmbeddedDocuments("Item", toCreate);
    await this.#shiftSkills(background, 1);
    if (!background.getFlag(SYSTEM_ID, "tracksGrants")) await background.setFlag(SYSTEM_ID, "tracksGrants", true);
  }
  /** Remove the advantages the background granted and lower its skills by one. */
  async removeBackground(background) {
    await this.#shiftSkills(background, -1);
    const granted = background.getFlag(SYSTEM_ID, "tracksGrants") ? (item) => item.getFlag(SYSTEM_ID, "grantedBy") === background.id : (item) => background.system.advantages.includes(item.name);
    const ids = this.items.filter((item) => item.type === ItemTypes.ADVANTAGE && granted(item)).map((item) => item.id);
    if (ids.length) await this.deleteEmbeddedDocuments("Item", ids);
  }
  async #shiftSkills(background, delta) {
    const skills = this.system.skills;
    if (!skills) return;
    const update = {};
    for (const key of background.system.skills) {
      const skill = skills[key];
      const stored = this._source.system.skills[key]?.value;
      if (skill) update[`system.skills.${key}.value`] = clamp(stored + delta, skill.min, skill.max);
    }
    if (!foundry.utils.isEmpty(update)) await this.update(update);
  }
  /** Whether the actor has an item of this type and name. */
  hasItem(type, name) {
    return this.items.some((item) => item.type === type && item.name === name);
  }
}
const { HTMLField: HTMLField$1, SchemaField: SchemaField$2, NumberField: NumberField$2, StringField: StringField$2, ArrayField: ArrayField$2, BooleanField: BooleanField$2 } = foundry.data.fields;
const int = (initial = 0, { min = 0, max } = {}) => new NumberField$2({ required: true, integer: true, min, max, initial });
const rank = (initial, [min, max]) => new SchemaField$2({ value: int(initial, { min, max }) });
const RANK_BOUNDS = {
  heroTrait: [2, 5],
  skill: [0, 5],
  strength: [1, 20],
  influence: [0, 20],
  fear: [0, 5]
};
function setBounds(ranks, [min, max]) {
  for (const entry of Object.values(ranks)) Object.assign(entry, { min, max });
}
function clampRanks(ranks) {
  for (const entry of Object.values(ranks)) entry.value = clamp(entry.value, entry.min, entry.max);
}
function clampSource(ranks, bounds) {
  for (const entry of Object.values(ranks ?? {})) {
    if (typeof entry?.value === "number") entry.value = clamp(entry.value, ...bounds);
  }
}
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
const woundsField = () => new SchemaField$2({ value: int(0), max: int(0) });
const conceptSchema = () => ({
  nation: new StringField$2(),
  religion: new StringField$2(),
  age: int(20),
  reputation: new StringField$2(),
  concept: new HTMLField$1({ initial: "<h3>Concept</h3><h3>Biography</h3>" })
});
const detailsSchema = () => ({
  ...conceptSchema(),
  languages: new ArrayField$2(new StringField$2()),
  equipment: new StringField$2()
});
class WoundedModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      // Raises: kept on the actor, changed from the combat tracker, the toolbox and the roll cards.
      initiative: new NumberField$2({ required: true, integer: false, min: 0, initial: 0 }),
      wounds: woundsField(),
      dwounds: woundsField()
    };
  }
  /** Number of wounds in each dramatic wound group. */
  get woundsPerDramatic() {
    return 5;
  }
  /** Whether the actor can be Hard To Kill. */
  get hardToKill() {
    return false;
  }
  /** Villains and monsters: no hero points, wounds grouped by Strength. */
  get isVillain() {
    return false;
  }
  /** One extra die from the first dramatic wound. */
  get woundBonusDice() {
    return this.dwounds.value >= 1 ? 1 : 0;
  }
  /** 10s explode from the third dramatic wound. */
  get explodesTens() {
    return this.dwounds.value >= 3;
  }
  prepareBaseData() {
    super.prepareBaseData();
    this.dwounds.max = 4;
  }
  prepareDerivedData() {
    super.prepareDerivedData();
    if (this.hardToKill) this.dwounds.max += 1;
    this.wounds.max = this.dwounds.max * this.woundsPerDramatic;
    this.wounds.value = clamp(this.wounds.value, 0, this.wounds.max);
    this.dwounds.value = clamp(this.dwounds.value, 0, this.dwounds.max);
  }
  /**
   * The update that sets the wounds to `value`: marking wounds also marks the dramatic wounds they reach,
   * never removes any.
   */
  woundUpdate(value) {
    const wounds = clamp(value, 0, this.wounds.max);
    const dwounds = Math.max(this.dwounds.value, Math.min(Math.trunc(wounds / this.woundsPerDramatic), this.dwounds.max));
    return { "system.wounds.value": wounds, "system.dwounds.value": dwounds };
  }
}
class CharacterModel extends WoundedModel {
  static defineSchema() {
    return { htk: new BooleanField$2({ required: true, initial: false }), ...super.defineSchema() };
  }
  get hardToKill() {
    return this.htk;
  }
  prepareBaseData() {
    super.prepareBaseData();
    this.rollBonus = rollBonusData();
  }
}
class HeroModel extends CharacterModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      ...detailsSchema(),
      traits: new SchemaField$2(Object.fromEntries(TRAITS.map((t) => [t, rank(2, RANK_BOUNDS.heroTrait)]))),
      skills: new SchemaField$2(Object.fromEntries(SKILLS.map((s) => [s, rank(0, RANK_BOUNDS.skill)])))
    };
  }
  static migrateData(source) {
    clampSource(source.traits, RANK_BOUNDS.heroTrait);
    clampSource(source.skills, RANK_BOUNDS.skill);
    return super.migrateData(source);
  }
  prepareBaseData() {
    super.prepareBaseData();
    setBounds(this.traits, RANK_BOUNDS.heroTrait);
    setBounds(this.skills, RANK_BOUNDS.skill);
  }
  prepareDerivedData() {
    super.prepareDerivedData();
    clampRanks(this.traits);
    clampRanks(this.skills);
  }
}
class PlayerModel extends HeroModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      wealth: int(0),
      heropts: int(0),
      corruptionpts: int(0),
      redemption: new StringField$2()
    };
  }
}
class VillainousModel extends CharacterModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      traits: new SchemaField$2({
        ...this.hasInfluence ? { influence: rank(5, RANK_BOUNDS.influence) } : {},
        strength: rank(5, RANK_BOUNDS.strength)
      })
    };
  }
  static hasInfluence = true;
  static migrateData(source) {
    clampSource({ strength: source.traits?.strength }, RANK_BOUNDS.strength);
    clampSource({ influence: source.traits?.influence }, RANK_BOUNDS.influence);
    return super.migrateData(source);
  }
  get isVillain() {
    return true;
  }
  get woundsPerDramatic() {
    return this.traits.strength.value + 1;
  }
  prepareBaseData() {
    super.prepareBaseData();
    Object.assign(this.traits.strength, { min: RANK_BOUNDS.strength[0], max: RANK_BOUNDS.strength[1] });
    if (this.traits.influence) Object.assign(this.traits.influence, { min: RANK_BOUNDS.influence[0], max: RANK_BOUNDS.influence[1] });
  }
  prepareDerivedData() {
    clampRanks(this.traits);
    super.prepareDerivedData();
    this.villainy = this.traits.strength.value + (this.traits.influence?.value ?? 0);
  }
}
class VillainModel extends VillainousModel {
  static defineSchema() {
    return { ...super.defineSchema(), ...detailsSchema(), servants: new StringField$2(), redemption: new StringField$2() };
  }
}
class MonsterModel extends VillainousModel {
  static hasInfluence = false;
  static defineSchema() {
    return { ...super.defineSchema(), ...conceptSchema(), fear: rank(0, RANK_BOUNDS.fear) };
  }
  static migrateData(source) {
    clampSource({ fear: source.fear }, RANK_BOUNDS.fear);
    return super.migrateData(source);
  }
  prepareBaseData() {
    super.prepareBaseData();
    Object.assign(this.fear, { min: RANK_BOUNDS.fear[0], max: RANK_BOUNDS.fear[1] });
  }
  prepareDerivedData() {
    super.prepareDerivedData();
    clampRanks({ fear: this.fear });
  }
}
class ShipModel extends WoundedModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      class: new StringField$2(),
      cargo: new HTMLField$1(),
      origin: new StringField$2(),
      crewstatus: new StringField$2(),
      wealth: int(0),
      // The roster: every crew member (a world actor) with their role on this ship.
      crew: new ArrayField$2(new SchemaField$2({ actorId: new StringField$2({ required: true }), role: new StringField$2({ required: true }) }))
    };
  }
  /** Give a crew member a role on this ship, adding them to the crew if needed. */
  async setCrewRole(actorId, role) {
    const crew = this.crew.map((member2) => ({ ...member2 }));
    const member = crew.find((m) => m.actorId === actorId);
    if (member) member.role = role;
    else crew.push({ actorId, role });
    return this.parent.update({ "system.crew": crew });
  }
  async removeCrewMember(actorId) {
    return this.parent.update({ "system.crew": this.crew.filter((member) => member.actorId !== actorId) });
  }
}
class BruteModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      wounds: woundsField(),
      traits: new SchemaField$2({ strength: rank(5, RANK_BOUNDS.strength) }),
      ability: new SchemaField$2({ name: new StringField$2(), description: new HTMLField$1() })
    };
  }
  static migrateData(source) {
    clampSource(source.traits, RANK_BOUNDS.strength);
    return super.migrateData(source);
  }
  prepareBaseData() {
    super.prepareBaseData();
    setBounds(this.traits, RANK_BOUNDS.strength);
    this.rollBonus = rollBonusData();
  }
  prepareDerivedData() {
    super.prepareDerivedData();
    clampRanks(this.traits);
    this.wounds.max = this.traits.strength.value;
    this.wounds.value = clamp(this.wounds.value, 0, this.wounds.max);
  }
  /** The update that sets the wounds to `value`. */
  woundUpdate(value) {
    return { "system.wounds.value": clamp(value, 0, this.wounds.max) };
  }
}
class DangerPointsModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return { points: int(5) };
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
    // Up to v23.3 the selectors were Application V1 windows, always light.
    classes: ["svnsea2e", "choice-selector", "themed", "theme-light"],
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
function raisesPerCombo(threshold, increased) {
  return threshold === 15 && !increased || threshold === 20 && increased ? 2 : 1;
}
function findComboIndices(dice, combo) {
  const indices = [];
  for (const value of combo) {
    const index = dice.findIndex((die, i) => die.value === value && !indices.includes(i));
    if (index === -1) return null;
    indices.push(index);
  }
  return indices;
}
function groupDice(dice, target, increased) {
  const pool = [...dice].sort((a, b) => b.value - a.value);
  const result = { left: pool, combos: [], raises: 0 };
  const findCombo = (exactOnly) => {
    let bestOvershoot = Infinity;
    let found = null;
    const dfs = (index, sum, used) => {
      if (sum === target) {
        found = used;
        return true;
      }
      if (!exactOnly && sum > target && sum < bestOvershoot) {
        bestOvershoot = sum;
        found = used;
        return false;
      }
      if (sum >= target || index >= pool.length) return false;
      if (dfs(index + 1, sum + pool[index].value, [...used, index])) return true;
      return dfs(index + 1, sum, used);
    };
    dfs(0, 0, []);
    if (!found) return null;
    const combo = found.map((i) => pool[i].value);
    for (let j = found.length - 1; j >= 0; j--) pool.splice(found[j], 1);
    return combo;
  };
  for (const exactOnly of [true, false]) {
    let combo;
    while ((combo = findCombo(exactOnly)) !== null) {
      result.combos.push(combo.sort((a, b) => a - b).join(" + "));
      result.raises += raisesPerCombo(target, increased);
    }
  }
  return result;
}
const byValue = (a, b) => a.value - b.value;
function resolveDice(input, tables = SVNSEA2E) {
  const { addOne, joieRank = 0, reroll, rerollFace = null } = input;
  const increased = !!input.increaseThreshold;
  const valueOf = (face2) => face2 <= joieRank ? 10 : addOne ? face2 + 1 : face2;
  const dice = input.faces.map((face2) => ({ face: face2, value: valueOf(face2) })).sort(byValue);
  const target = input.threshold + (increased ? 5 : 0);
  const matches = target === 15 ? tables.match15 : target === 20 ? tables.match20 : tables.match10;
  let raises = 0;
  const combos = [];
  const takeTens = () => {
    if (target !== 10) return;
    for (let i = dice.length - 1; i >= 0 && dice[i].value >= 10; i--) {
      raises++;
      combos.push(String(dice[i].value));
      dice.splice(i, 1);
    }
  };
  takeTens();
  for (const combo of [...matches.two, ...matches.three]) {
    let indices;
    while (indices = findComboIndices(dice, combo)) {
      raises += raisesPerCombo(target, increased);
      combos.push(indices.map((i) => dice[i].value).join(" + "));
      for (const i of indices.sort((a, b) => b - a)) dice.splice(i, 1);
    }
  }
  let rerolled = null;
  if (dice.length > 0 && reroll) {
    if (rerollFace === null) return { needsReroll: true, target };
    rerolled = { from: dice[0].face, to: rerollFace };
    dice[0] = { face: rerollFace, value: valueOf(rerollFace) };
    dice.sort(byValue);
  }
  takeTens();
  let grouped = groupDice(dice, target, increased);
  combos.push(...grouped.combos);
  raises += grouped.raises;
  if (grouped.left.length > 0 && (!increased && target === 15 || increased && target === 20)) {
    const lower = groupDice(grouped.left, target - 5, increased);
    combos.push(...lower.combos);
    raises += lower.raises;
    grouped = lower;
  }
  const faces = [...input.faces];
  if (rerolled) faces[faces.indexOf(rerolled.from)] = rerolled.to;
  return {
    needsReroll: false,
    target,
    raises,
    combos,
    unused: grouped.left.map((die) => die.value),
    faces: faces.sort((a, b) => a - b),
    rerolled
  };
}
function explosionDice(dice, explosions) {
  let pending = dice.filter((face2) => face2 === 10).length;
  const used = [];
  for (const face2 of explosions) {
    if (pending === 0) break;
    used.push(face2);
    pending += face2 === 10 ? 0 : -1;
  }
  return { used, missing: pending };
}
const ROLL_MESSAGE = "roll";
const ROLL_CARD = `${TEMPLATES}/chats/roll-card.hbs`;
const EDIT_DIALOG = `${TEMPLATES}/chats/edit-roll-dialog.hbs`;
const { ArrayField: ArrayField$1, BooleanField: BooleanField$1, NumberField: NumberField$1, SchemaField: SchemaField$1, StringField: StringField$1 } = foundry.data.fields;
const count = (options = {}) => new NumberField$1({ required: true, nullable: false, integer: true, min: 0, initial: 0, ...options });
const face = () => new NumberField$1({ required: true, nullable: false, integer: true, min: 1, max: 10 });
class RollMessageModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      kind: new StringField$1({ required: true, choices: ["skill", "trait", "free"], initial: "free" }),
      pool: new SchemaField$1({
        skill: count(),
        trait: count(),
        // The free roll keeps its number of dice here. Negative to take dice away.
        bonus: new NumberField$1({ required: true, nullable: false, integer: true, initial: 0 }),
        flair: new BooleanField$1(),
        interpretation: new BooleanField$1(),
        heroPoints: count(),
        // Hero points given by other heroes: 3 dice each.
        helpers: count(),
        wound: count()
      }),
      threshold: new NumberField$1({ required: true, nullable: false, integer: true, choices: [10, 15], initial: 10 }),
      increaseThreshold: new BooleanField$1(),
      addOne: new BooleanField$1(),
      explode: new BooleanField$1(),
      reroll: new BooleanField$1(),
      joieDeVivre: new BooleanField$1(),
      joieRank: count({ max: 5 }),
      // Faces in the order they were rolled. Explosions apart: they only count while `explode` is on.
      dice: new ArrayField$1(face()),
      explosions: new ArrayField$1(face()),
      rerollFace: new NumberField$1({ required: true, nullable: true, integer: true, min: 1, max: 10, initial: null }),
      edited: new BooleanField$1()
    };
  }
  /** Number of dice of the pool, without explosions. */
  get poolSize() {
    return poolSize(this);
  }
  /** The raises, sets and leftover dice of the roll. */
  resolve() {
    return resolveRoll(this);
  }
}
function poolSize({ pool }) {
  return pool.skill + pool.trait + pool.bonus + pool.wound + (pool.flair ? 1 : 0) + (pool.interpretation ? 1 : 0) + pool.heroPoints + pool.helpers * 3;
}
function resolveRoll(data) {
  return resolveDice({
    faces: [...data.dice, ...data.explode ? explosionDice(data.dice, data.explosions).used : []],
    threshold: data.threshold,
    increaseThreshold: data.increaseThreshold,
    addOne: data.addOne,
    joieRank: data.joieDeVivre ? data.joieRank : 0,
    reroll: data.reroll,
    rerollFace: data.rerollFace
  });
}
async function rollD10s(count2) {
  const roll = await new foundry.dice.Roll(`${count2}d10`).evaluate();
  return { roll, faces: roll.dice[0].results.map((r) => r.result) };
}
async function completeDice(data) {
  const rolls = [];
  const roll = async (count2) => {
    const result = await rollD10s(count2);
    rolls.push(result.roll);
    return result.faces;
  };
  const size = poolSize(data);
  if (data.dice.length > size) data.dice = data.dice.slice(0, size);
  else if (data.dice.length < size) data.dice = [...data.dice, ...await roll(size - data.dice.length)];
  if (data.explode) {
    let missing;
    while ((missing = explosionDice(data.dice, data.explosions).missing) > 0) data.explosions = [...data.explosions, ...await roll(missing)];
    data.explosions = explosionDice(data.dice, data.explosions).used;
  } else data.explosions = [];
  const needs = resolveRoll({ ...data, rerollFace: null }).needsReroll;
  if (!needs) data.rerollFace = null;
  else if (data.rerollFace === null) [data.rerollFace] = await roll(1);
  return rolls;
}
async function renderRollCard(data, actorId) {
  const i18n = game.i18n;
  const result = resolveRoll(data);
  const joieRank = data.joieDeVivre ? data.joieRank : 0;
  const explosions = data.explode ? explosionDice(data.dice, data.explosions).used.length : 0;
  let threshold = String(result.target);
  if (data.increaseThreshold) threshold += ` ${i18n.localize("SVNSEA2E.GMIncreasedThreshold")}`;
  return foundry.applications.handlebars.renderTemplate(ROLL_CARD, {
    actorId,
    raises: result.raises,
    raisetxt: i18n.localize(result.raises > 1 ? "SVNSEA2E.Raises" : "SVNSEA2E.Raise"),
    unusedDice: result.unused.length,
    unusedDiceTxt: i18n.localize(result.unused.length > 1 ? "SVNSEA2E.UnusedDice" : "SVNSEA2E.UnusedDie"),
    dice: result.faces.map((face2) => ({ face: face2, joie: face2 <= joieRank })),
    combos: result.combos,
    unusedRolls: result.unused,
    reroll: result.rerolled && i18n.format("SVNSEA2E.Reroll", { roll1: result.rerolled.from, roll2: result.rerolled.to }),
    exploded: data.explode,
    extraDice: explosions,
    addOne: data.addOne,
    joie: joieRank > 0 && i18n.format("SVNSEA2E.JoieDiceCount", { rank: joieRank }),
    threshold: i18n.format("SVNSEA2E.RollThreshold", { threshold }),
    edited: data.edited
  });
}
function canEditRoll(message, user = game.user) {
  return message?.type === ROLL_MESSAGE && (user.isGM || message.isAuthor) && message.isContentVisible;
}
async function editRoll(message) {
  if (!canEditRoll(message)) return false;
  const source = message.system.toObject();
  const content = await foundry.applications.handlebars.renderTemplate(EDIT_DIALOG, {
    data: source,
    free: source.kind === "free",
    thresholds: { 10: "10", 15: "15" },
    threshold: String(source.threshold)
  });
  const form = await foundry.applications.api.DialogV2.wait({
    window: { title: game.i18n.localize("SVNSEA2E.EditRoll"), icon: "fa-solid fa-pen-to-square" },
    classes: ["svnsea2e", "roll-dialog", "themed", "theme-light"],
    position: { width: 420 },
    content,
    buttons: [
      { action: "save", label: game.i18n.localize("Save"), icon: "fa-solid fa-floppy-disk", default: true, callback: (event, button) => button.form },
      { action: "cancel", label: game.i18n.localize("Cancel"), callback: () => null }
    ],
    rejectClose: false
  });
  if (!form) return false;
  const data = { ...source, ...readEditForm(form), edited: true };
  if (poolSize(data) < 1) {
    ui.notifications.warn(game.i18n.localize("SVNSEA2E.NoDiceToRoll"));
    return false;
  }
  const actor = ChatMessage.implementation.getSpeakerActor(message.speaker);
  if (!await settleHeroPoints(actor, data.pool.heroPoints - source.pool.heroPoints)) return false;
  const rolls = await completeDice(data);
  await message.update({ system: data, content: await renderRollCard(data, actor?.id ?? message.speaker.actor) });
  showDice(rolls, message);
  return message;
}
function showDice(rolls, message) {
  if (!game.dice3d) return;
  const whisper = message.whisper?.length ? message.whisper : null;
  for (const roll of rolls) {
    try {
      game.dice3d.showForRoll(roll, game.user, true, whisper, message.blind)?.catch?.(() => {
      });
    } catch {
    }
  }
}
async function settleHeroPoints(actor, spent) {
  if (!spent || !actor || actor.system.isVillain || !("heropts" in actor.system)) return true;
  const available = actor.system.heropts || 0;
  if (spent > available) {
    ui.notifications.error(game.i18n.localize("SVNSEA2E.NotEnoughHero"));
    return false;
  }
  await actor.update({ "system.heropts": available - spent });
  return true;
}
function readEditForm(form) {
  const el = form.elements;
  const num = (name, min = 0) => Math.max(parseInt(el[name]?.value) || 0, min);
  const bool = (name) => !!el[name]?.checked;
  return {
    pool: {
      skill: num("skill"),
      trait: num("trait"),
      bonus: num("bonus", -Infinity),
      flair: bool("flair"),
      interpretation: bool("interpretation"),
      heroPoints: num("heroPoints"),
      helpers: num("helpers"),
      wound: num("wound")
    },
    threshold: num("threshold") === 15 ? 15 : 10,
    increaseThreshold: bool("increaseThreshold"),
    addOne: bool("addOne"),
    explode: bool("explode"),
    reroll: bool("reroll"),
    joieDeVivre: bool("joieDeVivre"),
    joieRank: Math.min(num("joieRank"), 5)
  };
}
function onGetChatMessageContextOptions(app, options) {
  options.push({
    label: "SVNSEA2E.EditRoll",
    icon: "fa-solid fa-pen-to-square",
    visible: (li) => canEditRoll(game.messages.get(li.dataset.messageId)),
    onClick: (event, li) => editRoll(game.messages.get(li.dataset.messageId))
  });
}
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
    joieRank: num("joieRank"),
    explodeDice: bool("explodeDice"),
    increaseThreshold: bool("increaseThreshold")
  };
}
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
async function rollDicePool({ actor, rolldata, options, title, kind = "free" }) {
  const system = actor.system;
  const data = {
    kind,
    pool: {
      skill: parseInt(rolldata.skilldice) || 0,
      trait: options.trait || 0,
      bonus: options.bonusDice || 0,
      flair: !!options.flairDice,
      interpretation: !!options.interpretationDice,
      heroPoints: options.useForMe || 0,
      helpers: options.useForHelpMe || 0,
      // Every character with at least one dramatic wound gets one extra die.
      wound: rolldata.skipWoundBonus ? 0 : system.woundBonusDice ?? 0
    },
    threshold: rolldata.threshold === 15 ? 15 : 10,
    increaseThreshold: !!options.increaseThreshold,
    addOne: !!options.addOneToDice,
    explode: !!(rolldata.explode || options.explodeDice),
    reroll: !!rolldata.reroll,
    joieDeVivre: !!options.joieDeVivre,
    // Joie de Vivre: the dice up to the skill rank count as 10s. Kept without it too, for "Edit Roll".
    joieRank: Math.min(Math.max(rolldata.skillRank ?? 0, 0), 5),
    dice: [],
    explosions: [],
    rerollFace: null
  };
  const poolSize$1 = poolSize(data);
  if (poolSize$1 < 1) {
    ui.notifications.warn(game.i18n.localize("SVNSEA2E.NoDiceToRoll"));
    return false;
  }
  if (!system.isVillain && !await spendHeroPoints(actor, options)) return false;
  const roll = await new foundry.dice.Roll(`${poolSize$1}d10${data.explode ? "x" : ""}`).evaluate();
  const faces = roll.dice[0].results.map((r) => r.result);
  data.dice = faces.slice(0, poolSize$1);
  data.explosions = faces.slice(poolSize$1);
  await completeDice(data);
  const chatData = ChatMessage.implementation.applyMode({
    type: ROLL_MESSAGE,
    author: game.user.id,
    speaker: ChatMessage.implementation.getSpeaker({ actor }),
    flavor: title,
    content: await renderRollCard(data, actor.id),
    system: data,
    rolls: [roll]
  });
  await ChatMessage.implementation.create(chatData);
  return roll;
}
const { DialogV2 } = foundry.applications.api;
const renderTemplate = (path, data) => foundry.applications.handlebars.renderTemplate(path, data);
async function promptRoll(title, template, data, { cancel = false } = {}) {
  const content = await renderTemplate(template, data);
  const buttons = [
    {
      action: "roll",
      label: game.i18n.localize("SVNSEA2E.Roll"),
      icon: "fa-solid fa-dice-d10",
      default: true,
      callback: (event, button) => ({ options: readRollForm(button.form), form: button.form })
    }
  ];
  if (cancel) buttons.push({ action: "cancel", label: game.i18n.localize("Cancel"), callback: () => null });
  return DialogV2.wait({
    window: { title },
    // Up to v23.3 these were Application V1 dialogs, always light.
    classes: ["svnsea2e", "roll-dialog", "themed", "theme-light"],
    position: { width: 400 },
    content,
    buttons,
    rejectClose: false
  });
}
function effectDefaults(actor, { skill, dice = true } = {}) {
  const bonus = actor.system.rollBonus;
  if (!bonus) return { dice: 0 };
  const relevant = (key) => {
    if (!key?.startsWith("system.rollBonus.")) return false;
    if (key.startsWith("system.rollBonus.skills.")) return dice && key === `system.rollBonus.skills.${skill}`;
    return dice || key !== "system.rollBonus.dice";
  };
  const names = /* @__PURE__ */ new Set();
  for (const effect of actor.allApplicableEffects()) {
    if (effect.active && effect.system.changes.some((change) => relevant(change.key))) names.add(effect.name);
  }
  return {
    ...bonus,
    dice: dice ? bonus.dice + (skill ? bonus.skills[skill] ?? 0 : 0) : 0,
    effects: [...names].sort((a, b) => a.localeCompare(b)).join(", ")
  };
}
async function rollSkill(actor, skill) {
  const system = actor.system;
  const rank2 = system.skills[skill].value;
  const rolldata = {
    threshold: rank2 >= 4 ? 15 : 10,
    explode: rank2 === 5 || system.explodesTens,
    reroll: rank2 > 2,
    skilldice: rank2,
    skillRank: rank2
  };
  const traits = {};
  for (const [key, trait] of Object.entries(system.traits)) traits[CONFIG.SVNSEA2E.traits[key]] = trait.value;
  const skillLabel = CONFIG.SVNSEA2E.skills[skill];
  const result = await promptRoll(
    game.i18n.format("SVNSEA2E.ApproachPromptTitle", { skill: skillLabel }),
    `${TEMPLATES}/chats/skill-roll-dialog.hbs`,
    { data: system, traits, bonus: effectDefaults(actor, { skill }) }
  );
  if (!result) return false;
  const traitSelect = result.form.elements.trait;
  return rollDicePool({
    actor,
    rolldata,
    options: result.options,
    kind: "skill",
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
    explode: system.explodesTens ?? false,
    reroll: false,
    skilldice: 0,
    skillRank: 0
  };
  const title = game.i18n.format("SVNSEA2E.TraitRollTitle", { trait: CONFIG.SVNSEA2E.traits[trait] });
  const result = await promptRoll(title, `${TEMPLATES}/chats/trait-roll-dialog.hbs`, {
    data: system,
    traitmax: system.traits[trait].value,
    bonus: effectDefaults(actor)
  });
  if (!result) return false;
  return rollDicePool({ actor, rolldata, options: result.options, title, kind: "trait" });
}
async function rollFreeDice(actor) {
  const result = await promptRoll(
    game.i18n.localize("SVNSEA2E.Roll"),
    `${TEMPLATES}/items/parts/roll-throw.hbs`,
    { bonus: effectDefaults(actor, { dice: false }) },
    { cancel: true }
  );
  if (!result) return false;
  const diceCount = Math.max(parseInt(result.form.elements.diceNumber?.value) || 1, 1);
  const { addOneToDice, joieDeVivre, joieRank, explodeDice, increaseThreshold } = result.options;
  return rollDicePool({
    actor,
    rolldata: {
      skilldice: 0,
      // Joie de Vivre needs the rank of the skill: the number of dice is not it.
      skillRank: Math.max(joieRank, 0),
      threshold: 10,
      explode: false,
      reroll: false,
      skipWoundBonus: true
    },
    options: {
      trait: 0,
      // The free roll keeps its number of dice as bonus dice.
      bonusDice: diceCount,
      flairDice: false,
      interpretationDice: false,
      useForMe: 0,
      useForHelpMe: 0,
      addOneToDice,
      joieDeVivre,
      explodeDice,
      increaseThreshold
    },
    title: game.i18n.localize("SVNSEA2E.GenericRoll"),
    kind: "free"
  });
}
const { HandlebarsApplicationMixin: HandlebarsApplicationMixin$1 } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;
const ITEM_SECTIONS = {
  [ItemTypes.ADVANTAGE]: { label: "SVNSEA2E.Advantage", addTitle: "SVNSEA2E.AddAdvantage", cssClass: "advantage", used: true },
  [ItemTypes.DUEL_STYLE]: { label: "SVNSEA2E.DuelingStyles", addTitle: "SVNSEA2E.AddDuelStyle", cssClass: "duelingstyle", used: true },
  [ItemTypes.BACKGROUND]: { label: "SVNSEA2E.Backgrounds", addTitle: "SVNSEA2E.AddBackground", cssClass: "background", used: true, toggle: true },
  [ItemTypes.SECRET_SOCIETY]: { label: "SVNSEA2E.SecretSociety", addTitle: "SVNSEA2E.AddSecretSociety", cssClass: "secretsociety", favor: true },
  [ItemTypes.MONSTER_QUALITY]: { label: "SVNSEA2E.MonsterQualities", addTitle: "SVNSEA2E.AddMonsterQuality", used: true },
  [ItemTypes.SCHEME]: { label: "SVNSEA2E.Schemes", addTitle: "SVNSEA2E.AddScheme", used: true },
  [ItemTypes.VIRTUE]: { label: "SVNSEA2E.Virtue", addTitle: "SVNSEA2E.AddVirtue", cssClass: "story", used: true },
  [ItemTypes.HUBRIS]: { label: "SVNSEA2E.Hubris", addTitle: "SVNSEA2E.AddHubris", cssClass: "story", used: true },
  [ItemTypes.STORY]: { label: "SVNSEA2E.Stories", addTitle: "SVNSEA2E.AddStory", cssClass: "story" },
  [ItemTypes.ARTIFACT]: { label: "SVNSEA2E.Artifacts", addTitle: "SVNSEA2E.AddArtifact", cssClass: "artifacts", used: true },
  [ItemTypes.SORCERY]: { addTitle: "SVNSEA2E.Sorcery", cssClass: "sorcery", used: true },
  [ItemTypes.SHIP_ADVENTURE]: { label: "SVNSEA2E.Adventures", addTitle: "SVNSEA2E.AddShipAdventure", cssClass: "story", rowClass: "adventure", noThrow: true },
  [ItemTypes.SHIP_BACKGROUND]: { label: "SVNSEA2E.Backgrounds", addTitle: "SVNSEA2E.AddShipBackground", cssClass: "story", rowClass: "background", noThrow: true }
};
function itemSections(actor, types) {
  return types.map((entry) => {
    const [type, options] = Array.isArray(entry) ? entry : [entry, {}];
    const section = { type, ...ITEM_SECTIONS[type], ...options, items: itemsOfType(actor, type) };
    section.rowClass ??= section.cssClass;
    return section;
  });
}
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
      selectLanguages: SvnSea2EActorSheet.#onSelectLanguages,
      setRank: SvnSea2EActorSheet.#onSetRank,
      setWounds: SvnSea2EActorSheet.#onSetWounds,
      rollSkill: SvnSea2EActorSheet.#onRollSkill,
      rollTrait: SvnSea2EActorSheet.#onRollTrait,
      freeRoll: SvnSea2EActorSheet.#onFreeRoll,
      ...EFFECT_ACTIONS
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
      editable: this.isEditable,
      cssClass: actor.isOwner ? "editable" : "locked",
      config: CONFIG.SVNSEA2E,
      tabs: this._prepareTabs("primary"),
      isCorrupt: system.corruptionpts > 0,
      isPlayerCharacter: actor.type === ActorType.PLAYER,
      isVillain: actor.type === ActorType.VILLAIN,
      isMonster: actor.type === ActorType.MONSTER,
      hasSkills: system.skills !== void 0,
      hasLanguages: system.languages !== void 0,
      name: actor.name,
      img: actor.img,
      traits: this._prepareTraits(),
      selectedlangs: this._prepareLanguages(),
      effects: prepareEffects(actor)
    });
    if (system.fear) context.fearLocked = this._isModified("system.fear.value");
    if (typeof system.concept === "string") {
      context.enrichedConcept = await enrichHTML(system.concept, { secrets: actor.isOwner, relativeTo: actor });
    }
    this._prepareItems(context);
    return context;
  }
  /** @override */
  _getTabsConfig(group) {
    return withEffectsTab(super._getTabsConfig(group));
  }
  /** @override */
  _prepareTabs(group) {
    return this._getTabsConfig(group) ? super._prepareTabs(group) : {};
  }
  /** Add the actor's items, grouped by type, to the context. */
  _prepareItems(context) {
  }
  /** Whether an active effect changes this value: the sheet shows the result, but cannot edit it. */
  _isModified(path) {
    return foundry.utils.hasProperty(this.actor.overrides ?? {}, path);
  }
  /** Traits with their localized label. */
  _prepareTraits() {
    if (!this.actor.system.traits) return [];
    return Object.entries(this.actor.system.traits).map(([name, trait]) => ({
      ...trait,
      name,
      label: CONFIG.SVNSEA2E.traits[name],
      locked: this._isModified(`system.traits.${name}.value`)
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
    if (this.isEditable) {
      for (const row of this.element.querySelectorAll("li.draggable")) {
        row.setAttribute("draggable", "true");
        row.addEventListener("dragstart", this.#onDragRow.bind(this));
      }
    }
    for (const section of this.#collapsedSections) {
      const header = this.element.querySelector(`.item-header[data-section="${section}"]`);
      if (header) this.#setSectionCollapsed(header, true);
    }
  }
  /** Rows of items, effects (of the actor or of one of its items) and ship crew members. */
  #onDragRow(event) {
    const { itemId, effectId, actorId } = event.currentTarget.dataset;
    const item = itemId ? this.actor.items.get(itemId) : null;
    const dragged = effectId ? (item ?? this.actor).effects.get(effectId) : item ?? game.actors.get(actorId);
    if (dragged) event.dataTransfer.setData("text/plain", JSON.stringify(dragged.toDragData()));
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
    await this.actor.createEmbeddedDocuments("Item", [{ name: game.i18n.localize(`SVNSEA2E.New${type}`), type }]);
  }
  static #onEditItem(event, target) {
    this._getItem(target)?.sheet.render(true);
  }
  static async #onDeleteItem(event, target) {
    if (!this.isEditable) return;
    await this._getItem(target)?.delete();
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
    if (item) await this.actor.toggleBackground(item);
  }
  static #onToggleSection(event, target) {
    const section = target.dataset.section;
    const collapsed = !this.#collapsedSections.has(section);
    if (collapsed) this.#collapsedSections.add(section);
    else this.#collapsedSections.delete(section);
    this.#setSectionCollapsed(target, collapsed);
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
  /**
   * Click on a rank circle (trait, skill, corruption, fear). Clicking the first circle of a rank already at 1 clears
   * it; a rank never goes below its minimum (2 for hero traits, 1 for Strength).
   */
  static async #onSetRank(event, target) {
    const name = target.dataset.name;
    if (!this.isEditable || this._isModified(name)) return;
    let value = parseInt(target.dataset.value);
    const rank2 = foundry.utils.getProperty(this.actor, name.replace(/\.value$/, ""));
    const current = typeof rank2 === "object" ? rank2.value : rank2;
    if (value === 1 && current === 1) value = 0;
    value = Math.max(value, rank2?.min ?? 0);
    if (value !== current) await this.actor.update({ [name]: value });
  }
  /** Click on a wound heart. */
  static async #onSetWounds(event, target) {
    if (!this.isEditable) return;
    const clicked = parseInt(target.dataset.value);
    if (Number.isNaN(clicked)) return;
    const system = this.actor.system;
    if (target.dataset.type === "dwounds") {
      const dwounds = clicked === system.dwounds.value ? clicked - 1 : clicked;
      return this.actor.update({ "system.dwounds.value": dwounds });
    }
    const value = system.wounds.value === 1 && clicked === 1 ? 0 : clicked;
    await this.actor.update(system.woundUpdate(value));
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
    if (item.type !== ItemTypes.SORCERY && this.actor.hasItem(item.type, item.name)) {
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
    }
    const [created] = await this.actor.createEmbeddedDocuments("Item", [item.toObject()]);
    return created ?? null;
  }
}
const ACTOR_TEMPLATES = `${TEMPLATES}/actors`;
const { ADVANTAGE, ARTIFACT, BACKGROUND, DUEL_STYLE, HUBRIS, MONSTER_QUALITY, SCHEME, SECRET_SOCIETY, SORCERY, STORY, VIRTUE } = ItemTypes;
const tab = (id, label) => ({ id, label: `SVNSEA2E.${label}` });
const scrollable = [".sheet-body .tab", ".sheet-body"];
function prepareCharacterItems(sheet, context) {
  const actor = sheet.actor;
  context.skills = skillsToSheetData(actor.system).map((skill) => ({
    ...skill,
    locked: sheet._isModified(`system.skills.${skill.name}.value`)
  }));
  context.itemLists = {
    advantages: itemSections(actor, [ADVANTAGE, DUEL_STYLE, BACKGROUND, SECRET_SOCIETY]),
    sorcery: itemSections(actor, [SORCERY]),
    inventory: itemSections(actor, [ARTIFACT]),
    fate: itemSections(actor, context.isPlayerCharacter ? [VIRTUE, HUBRIS, STORY] : [VIRTUE, HUBRIS])
  };
}
class PlayerCharacterSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["pc"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/playercharacter.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab("concept", "Concept"),
        tab("traits", "Traits"),
        tab("advantages", "Features"),
        tab("fate", "Fate"),
        tab("inventory", "Inventory"),
        tab("sorcery", "Sorcery")
      ],
      initial: "traits"
    }
  };
  _prepareItems(context) {
    prepareCharacterItems(this, context);
  }
}
class HeroSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["hero"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/hero.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab("traits", "Traits"),
        tab("advantages", "Advantages"),
        tab("sorcery", "Sorcery"),
        tab("inventory", "Inventory"),
        tab("fate", "Fate"),
        tab("concept", "Concept")
      ],
      initial: "traits"
    }
  };
  _prepareItems(context) {
    prepareCharacterItems(this, context);
  }
}
class VillainSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["villain"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/villain.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [
        tab("traits", "Traits"),
        tab("advantages", "Features"),
        tab("sorcery", "Sorcery"),
        tab("inventory", "Inventory"),
        tab("fate", "Fate"),
        tab("concept", "Concept")
      ],
      initial: "traits"
    }
  };
  _prepareItems(context) {
    const actor = this.actor;
    context.itemLists = {
      advantages: itemSections(actor, [ADVANTAGE, DUEL_STYLE, MONSTER_QUALITY, SCHEME]),
      sorcery: itemSections(actor, [SORCERY]),
      inventory: itemSections(actor, [ARTIFACT]),
      fate: itemSections(actor, [VIRTUE, HUBRIS])
    };
  }
}
class MonsterSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["monster"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/monster.hbs`, scrollable } };
  static TABS = {
    primary: {
      tabs: [tab("features", "Features"), tab("fate", "Fate"), tab("concept", "Concept")],
      initial: "features"
    }
  };
  _prepareItems(context) {
    const actor = this.actor;
    context.itemLists = {
      features: itemSections(actor, [[MONSTER_QUALITY, { used: false }]]),
      fate: itemSections(actor, [VIRTUE, HUBRIS])
    };
  }
}
class BruteSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = { classes: ["brute"] };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/brute.hbs`, scrollable: [".sheet-body"] } };
  _prepareItems(context) {
    context.itemLists = { features: itemSections(this.actor, [ADVANTAGE, DUEL_STYLE]) };
  }
}
class DangerPointsSheet extends SvnSea2EActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["dangerpts"],
    position: { width: 450, height: "auto" },
    actions: { adjustPoints: DangerPointsSheet.#onAdjustPoints }
  };
  static PARTS = { sheet: { template: `${ACTOR_TEMPLATES}/dangerpts.hbs` } };
  static async #onAdjustPoints(event, target) {
    if (!this.isEditable) return;
    const points = Math.max(0, (parseInt(this.actor.system.points) || 0) + parseInt(target.dataset.delta));
    await this.actor.update({ "system.points": points });
  }
}
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
    context.crew = this._prepareCrew();
    return context;
  }
  _prepareItems(context) {
    context.itemLists = { features: itemSections(this.actor, [ItemTypes.SHIP_ADVENTURE, ItemTypes.SHIP_BACKGROUND]) };
  }
  /** The roster: every role with the crew members currently assigned to it. */
  _prepareCrew() {
    const crew = Object.fromEntries(
      Object.entries(CONFIG.SVNSEA2E.crewRoles).map(([role, label]) => [role, { label, cssClass: role, role, actors: [] }])
    );
    for (const { actorId, role } of this.actor.system.crew) {
      const member = game.actors.get(actorId);
      if (member && crew[role]) crew[role].actors.push(member);
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
  /** An actor dropped on a role header joins the crew with that role. */
  async _onDropActor(event, actor) {
    if (!this.isEditable || actor.pack) return null;
    const role = event.target.closest("[data-role]")?.dataset.role;
    if (!role) return null;
    await this.actor.system.setCrewRole(actor.id, role);
    return actor;
  }
  static async #onRemoveCrew(event, target) {
    if (!this.isEditable) return;
    const actorId = target.closest("[data-actor-id]")?.dataset.actorId;
    if (actorId) await this.actor.system.removeCrewMember(actorId);
  }
}
const DEFAULT_ITEM_ICONS = ["icons/svg/item-bag.svg", CONST.DEFAULT_TOKEN];
const CHAT_TEMPLATES = {
  [ItemTypes.BACKGROUND]: `${TEMPLATES}/items/parts/skill-throw-background.hbs`,
  default: `${TEMPLATES}/items/parts/skill-throw.hbs`
};
const ENRICHED_FIELDS = ["quirk", "bonus", "concern", "earnfavor", "callupon", "reward", "endings", "steps"];
class SvnSea2EItem extends Item {
  /** Use the system icon for new items that still have the default artwork. */
  async _preCreate(data, options, user) {
    if (await super._preCreate(data, options, user) === false) return false;
    if (!this.img || DEFAULT_ITEM_ICONS.includes(this.img)) {
      this.updateSource({ img: `${SYSTEM_PATH}/icons/${this.type}.jpg` });
    }
  }
  /**
   * Data used to display the item in chat or in the expandable summary of the actor sheets.
   * @param {object} [options]
   * @param {boolean} [options.secrets]  Whether to reveal secret blocks.
   */
  async getChatData({ secrets = this.isOwner } = {}) {
    const data = this.system.toObject(false);
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
        normal: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
        reducecost: new NumberField({ integer: true, min: 0 })
      }),
      knack: new BooleanField({ initial: false }),
      innate: new BooleanField({ initial: false })
    };
  }
  /** Costs saved before they had to be whole numbers. */
  static migrateData(source) {
    for (const key of ["normal", "reducecost"]) {
      const cost = source.cost?.[key];
      if (typeof cost === "number") source.cost[key] = Math.max(Math.round(cost), 0);
    }
    return super.migrateData(source);
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
  static INFLUENCE_MAX = 40;
  static defineSchema() {
    const value = new NumberField({ required: true, integer: true, min: 0, max: this.INFLUENCE_MAX, initial: 0 });
    return { ...baseSchema(), influence: new SchemaField({ value }) };
  }
  static migrateData(source) {
    const influence = source.influence;
    if (typeof influence?.value === "number") influence.value = clamp(influence.value, 0, this.INFLUENCE_MAX);
    return super.migrateData(source);
  }
  prepareBaseData() {
    super.prepareBaseData();
    Object.assign(this.influence, { min: 0, max: SchemeModel.INFLUENCE_MAX });
  }
}
class SecretSocietyModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...baseSchema(),
      concern: new HTMLField(),
      earnfavor: new HTMLField(),
      callupon: new HTMLField(),
      favor: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
    };
  }
  /** Up to v24 the favor was saved as text ("2", "" or even "<p>2</p>"). */
  static migrateData(source) {
    if (typeof source.favor === "string") source.favor = Math.max(parseInt(source.favor.replace(/<[^>]*>/g, "")) || 0, 0);
    return super.migrateData(source);
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
const ITEM_LAYOUTS = {
  [ItemTypes.ADVANTAGE]: { tabs: ["description", "attributes"] },
  [ItemTypes.ARTIFACT]: { header: true },
  [ItemTypes.BACKGROUND]: { header: true, tabs: ["description", "quirk", "details"] },
  [ItemTypes.DUEL_STYLE]: { tabs: ["description", "bonus"] },
  [ItemTypes.SCHEME]: { header: true },
  [ItemTypes.SECRET_SOCIETY]: { header: true, tabs: ["description", "concern", "earnfavor", "callupon"], width: 800 },
  [ItemTypes.SORCERY]: { header: true, width: 750 },
  [ItemTypes.STORY]: { header: true, tabs: ["description", "reward", "endings", "steps"] }
};
const PARTIAL_TABS = /* @__PURE__ */ new Set(["attributes", "details"]);
const TAB_LABELS = { earnfavor: "SVNSEA2E.EarnFavor", callupon: "SVNSEA2E.UseFavor" };
const tabLabel = (id) => TAB_LABELS[id] ?? `SVNSEA2E.${id[0].toUpperCase()}${id.slice(1)}`;
class SvnSea2EItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["svnsea2e", "sheet", "item", "themed", "theme-light"],
    position: { width: 600, height: 700 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      selectSkills: SvnSea2EItemSheet.#onSelectSkills,
      selectAdvantages: SvnSea2EItemSheet.#onSelectAdvantages,
      ...EFFECT_ACTIONS
    }
  };
  static PARTS = { sheet: { template: `${ITEM_TEMPLATES}/item.hbs`, scrollable: [".sheet-body .tab"] } };
  get layout() {
    return ITEM_LAYOUTS[this.item.type] ?? {};
  }
  /** @override */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    const width = ITEM_LAYOUTS[options.document?.type]?.width;
    if (width) options.position.width = width;
    return options;
  }
  /** @override */
  _getTabsConfig(group) {
    if (group !== "primary") return null;
    const tabs = (this.layout.tabs ?? ["description"]).map((id) => ({ id, label: tabLabel(id) }));
    return withEffectsTab({ tabs, initial: "description" });
  }
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.item;
    const system = item.system;
    const tabs = this._prepareTabs("primary");
    Object.assign(context, {
      item,
      system,
      editable: this.isEditable,
      cssClass: item.isOwner ? "editable" : "locked",
      config: CONFIG.SVNSEA2E,
      tabs,
      itemType: CONFIG.SVNSEA2E.itemTypes[item.type],
      name: item.name,
      img: item.img,
      headerPartial: this.layout.header ? `${ITEM_TEMPLATES}/parts/header-${item.type}.hbs` : null,
      bodyTabs: Object.values(tabs).filter((tab2) => tab2.id !== "effects").map((tab2) => ({ ...tab2, editor: !PARTIAL_TABS.has(tab2.id), partial: `${ITEM_TEMPLATES}/parts/tab-${tab2.id}.hbs` })),
      effects: prepareEffects(item),
      enriched: {}
    });
    const enrichOptions = { secrets: item.isOwner, relativeTo: item, rollData: item.actor?.getRollData() };
    for (const tab2 of context.bodyTabs.filter((t) => t.editor)) {
      context.enriched[tab2.id] = await enrichHTML(system[tab2.id], enrichOptions);
    }
    if (item.type === ItemTypes.BACKGROUND) context.selectedskills = system.skills.map((s) => CONFIG.SVNSEA2E.skills[s]);
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
Hooks.once("init", () => {
  console.log(`7th Sea 2E | Initializing 7th Sea Second Edition System
${SVNSEA2E.ASCII}`);
  game.svnsea2e = {
    applications: { SvnSea2EActor, SvnSea2EItem },
    config: SVNSEA2E,
    migrations,
    rolls: { rollDicePool, rollSkill, rollTrait, rollFreeDice, editRoll },
    updateInitiative,
    toolbox: new Toolbox()
  };
  CONFIG.SVNSEA2E = SVNSEA2E;
  CONFIG.SVNSEA2E.natTypes = { ...SVNSEA2E.nations, gisles: "SVNSEA2E.RegionGlamourIsles" };
  CONFIG.Combat.initiative = { formula: "1d20", decimals: 2 };
  CONFIG.Actor.documentClass = SvnSea2EActor;
  CONFIG.Item.documentClass = SvnSea2EItem;
  CONFIG.ActiveEffect.documentClass = SvnSea2EActiveEffect;
  Object.assign(CONFIG.Actor.dataModels, {
    [ActorType.BRUTE]: BruteModel,
    [ActorType.DANGERPOINTS]: DangerPointsModel,
    [ActorType.HERO]: HeroModel,
    [ActorType.MONSTER]: MonsterModel,
    [ActorType.PLAYER]: PlayerModel,
    [ActorType.SHIP]: ShipModel,
    [ActorType.VILLAIN]: VillainModel
  });
  CONFIG.ChatMessage.dataModels[ROLL_MESSAGE] = RollMessageModel;
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
  DocumentSheetConfig.registerSheet(Item, SYSTEM_ID, SvnSea2EItemSheet, { types: Object.values(ItemTypes), makeDefault: true });
}
Hooks.once("setup", () => {
  const lists = [
    "natTypes",
    "artifactTypes",
    "crewStatuses",
    "durations",
    "itemTypes",
    "languages",
    "nations",
    "traits",
    "skills",
    "sorceryTypes",
    "sorceryCats",
    "sorcerySubcats",
    "storyStatuses"
  ];
  for (const list of [...lists, "crewRoles"]) {
    const entries = Object.entries(CONFIG.SVNSEA2E[list]).map(([key, label]) => [key, game.i18n.localize(label)]);
    if (lists.includes(list)) entries.sort((a, b) => a[1].localeCompare(b[1]));
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
for (const hook of ["createActiveEffect", "updateActiveEffect", "deleteActiveEffect"]) {
  Hooks.on(hook, (effect) => {
    const actor = effect.actor;
    if (actor && game.svnsea2e.toolbox.shows(actor)) game.svnsea2e.toolbox.render();
  });
}
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
Hooks.on("renderActiveEffectConfig", onRenderActiveEffectConfig);
Hooks.on("renderChatMessageHTML", onRenderChatMessage);
Hooks.on("getChatMessageContextOptions", onGetChatMessageContextOptions);
//# sourceMappingURL=svnsea2e.mjs.map
