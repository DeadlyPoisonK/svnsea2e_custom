var we = Object.defineProperty;
var Ve = (i, e, t) => e in i ? we(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var ie = (i, e, t) => (Ve(i, typeof e != "symbol" ? e + "" : e, t), t);
const h = {};
h.ASCII = `
==================================================
  _____ _   _       ____
 |___  | |_| |__   / ___|  ___  __ _
    / /| __| '_ \\  \\___ \\ / _ \\/ _\` |
   / / | |_| | | |  ___) |  __/ (_| |
  /_/   \\__|_| |_| |____/ \\___|\\__,_|
==================================================`;
h.itemTypes = {
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
h.actorTypes = {
  brute: "SVNSEA2E.Brute",
  playercharacter: "SVNSEA2E.PlayerCharacter",
  monster: "SVNSEA2E.Monster",
  villain: "SVNSEA2E.Villain",
  ship: "SVNSEA2E.Ship",
  hero: "SVNSEA2E.Hero"
};
h.nations = {
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
h.languages = {
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
h.traits = {
  brawn: "SVNSEA2E.TraitBrawn",
  finesse: "SVNSEA2E.TraitFinesse",
  resolve: "SVNSEA2E.TraitResolve",
  wits: "SVNSEA2E.TraitWits",
  panache: "SVNSEA2E.TraitPanache",
  influence: "SVNSEA2E.TraitInfluence",
  strength: "SVNSEA2E.TraitStrength"
};
h.skills = {
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
h.storyStatuses = {
  none: "SVNSEA2E.Empty",
  abandoned: "SVNSEA2E.StatusAbandoned",
  complete: "SVNSEA2E.StatusComplete",
  inprogress: "SVNSEA2E.StatusInProgress",
  future: "SVNSEA2E.StatusFuture"
};
h.sorceryTypes = {
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
h.durations = {
  none: "SVNSEA2E.Empty",
  scene: "SVNSEA2E.Scene"
};
h.sorceryCats = {
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
h.sorcerySubcats = {
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
h.crewStatuses = {
  none: "SVNSEA2E.Empty",
  happy: "SVNSEA2E.Happy",
  dissatisfied: "SVNSEA2E.Dissatisfied",
  mutinous: "SVNSEA2E.Mutinous"
};
h.artifactTypes = {
  deathtoken: "SVNSEA2E.DeathToken",
  syrneth: "SVNSEA2E.Syrneth",
  thiqa: "SVNSEA2E.Thiqa",
  tailsman: "SVNSEA2E.Tailsman",
  inscription: "SVNSEA2E.Inscription",
  mbey: "SVNSEA2E.Mbey",
  wonder: "SVNSEA2E.Wonder",
  tatoo: "SVNSEA2E.Tatoo"
};
h.shipRoles = {
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
h.match10 = {
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
h.match15 = {
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
h.match20 = {
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
const Ie = function () {
  game.settings.register("svnsea2e", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: !1,
    type: String,
    default: 0
  });
  // Actors the GM pinned to the toolbox, kept between sessions.
  game.settings.register("svnsea2e", "toolboxActors", {
    name: "Toolbox actors",
    scope: "client",
    config: !1,
    type: Array,
    default: []
  });
  // Optional toolbox columns, by key: false hides one. Columns added later show up until the GM hides them.
  game.settings.register("svnsea2e", "toolboxColumns", {
    name: "Toolbox columns",
    scope: "client",
    config: !1,
    type: Object,
    default: {}
  });
}, ke = async function () {
  const i = [
    // Actor Sheet Partials
    "systems/svnsea2e/templates/actors/parts/actor-name.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-traits.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-concept.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-advantages.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-sorcery.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-inventory.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-fate.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-villainy.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-vtraits.hbs",
    "systems/svnsea2e/templates/actors/parts/actor-wounds.hbs",
    // Item Sheet Partials
    "systems/svnsea2e/templates/items/parts/item-header.hbs",
    "systems/svnsea2e/templates/items/parts/item-description.hbs"
  ];
  return loadTemplates(i);
}, l = {
  PLAYER: "playercharacter",
  HERO: "hero",
  VILLAIN: "villain",
  MONSTER: "monster",
  BRUTE: "brute",
  SHIP: "ship",
  DANGERPOINTS: "dangerpts"
}, p = {
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
}, {
  HTMLField: Oe,
  SchemaField: j,
  NumberField: D,
  StringField: _e
} = foundry.data.fields, Ce = {
  wounds: new j({
    value: new D({ required: !0, integer: !0, min: 0, initial: 0 }),
    min: new D({ required: !0, integer: !0, min: 0, initial: 0 }),
    max: new D({ required: !0, integer: !0, min: 0, initial: 20 })
  }),
  traits: new j({
    strength: new j({
      value: new D({ required: !0, integer: !0, min: 1, initial: 5 }),
      min: new D({ required: !0, integer: !0, min: 1, initial: 1 }),
      max: new D({ required: !0, integer: !0, min: 1, initial: 20 })
    })
  }),
  ability: new j({
    name: new _e(),
    description: new Oe()
  })
};
class Te extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return Ce;
  }
}
const {
  NumberField: Me
} = foundry.data.fields, De = {
  points: new Me({ required: !0, integer: !0, min: 0, initial: 5 })
};
class xe extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return De;
  }
}
const {
  HTMLField: Fe,
  SchemaField: _,
  NumberField: N,
  StringField: x,
  ArrayField: Le,
  BooleanField: Bh
} = foundry.data.fields, F = () => ({
  htk: new Bh({ required: !0, initial: !1 }),
  initiative: new N({ required: !0, integer: !1, min: 0, initial: 0 }),
  wounds: new _({
    value: new N({ required: !0, integer: !0, min: 0, initial: 0 }),
    min: new N({ required: !0, integer: !0, min: 0, initial: 0 }),
    max: new N({ required: !0, integer: !0, min: 0, initial: 20 })
  }),
  dwounds: new _({
    value: new N({ required: !0, integer: !0, min: 0, initial: 0 }),
    min: new N({ required: !0, integer: !0, min: 0, initial: 0 }),
    max: new N({ required: !0, integer: !0, min: 0, initial: 4 })
  })
}), X = () => ({
  nation: new x(),
  religion: new x(),
  age: new N({ required: !0, integer: !0, min: 0, initial: 20 }),
  reputation: new x(),
  languages: new Le(new x()),
  equipment: new x(),
  concept: new Fe({ initial: "<h3>Concept</h3><h3>Biography</h3>" })
}), he = () => ({
  traits: new _({
    brawn: g(2),
    finesse: g(2),
    resolve: g(2),
    wits: g(2),
    panache: g(2)
  }),
  skills: new _({
    aim: g(0),
    athletics: g(0),
    brawl: g(0),
    convince: g(0),
    empathy: g(0),
    hide: g(0),
    intimidate: g(0),
    notice: g(0),
    perform: g(0),
    ride: g(0),
    sailing: g(0),
    scholarship: g(0),
    tempt: g(0),
    theft: g(0),
    warfare: g(0),
    weaponry: g(0)
  })
}), ge = () => ({
  traits: new _({
    influence: new _({
      value: new N({ required: !0, integer: !0, min: 0, initial: 5 }),
      min: new N({ required: !0, integer: !0, min: 0, initial: 0 }),
      max: new N({ required: !0, integer: !0, min: 0, initial: 20 })
    }),
    strength: new _({
      value: new N({ required: !0, integer: !0, min: 1, initial: 5 }),
      min: new N({ required: !0, integer: !0, min: 1, initial: 1 }),
      max: new N({ required: !0, integer: !0, min: 0, initial: 20 })
    })
  })
}), g = (i = 0) => new _({
  value: new N({ required: !0, integer: !0, min: 0, initial: i }),
  min: new N({ required: !0, integer: !0, min: 0, initial: 0 }),
  max: new N({ required: !0, integer: !0, min: 0, initial: 5 })
}), Re = {
  ...F(),
  ...X(),
  ...he()
};
class He extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return Re;
  }
}
foundry.data.fields;
const $e = {
  ...F(),
  ...ge(),
  fear: g()
};
class Ge extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return $e;
  }
}
const {
  NumberField: P,
  StringField: je
} = foundry.data.fields, Pe = {
  ...F(),
  ...X(),
  ...he(),
  wealth: new P({ required: !0, integer: !0, min: 0, initial: 0 }),
  heropts: new P({ required: !0, integer: !0, min: 0, initial: 0 }),
  vile: new P({ required: !0, integer: !0, min: 0, initial: 0 }),
  corruptionpts: new P({ required: !0, integer: !0, min: 0, initial: 0 }),
  redemption: new je()
};
class qe extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return Pe;
  }
}
const {
  NumberField: ze,
  StringField: q,
  HTMLField: Be
} = foundry.data.fields, Ue = {
  ...F(),
  background: new q(),
  class: new q(),
  cargo: new Be(),
  origin: new q(),
  crewstatus: new q(),
  wealth: new ze({ required: !0, integer: !0, min: 0, initial: 0 })
};
class Ye extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return Ue;
  }
}
const {
  StringField: ne
} = foundry.data.fields, We = {
  ...F(),
  ...X(),
  ...ge(),
  servants: new ne(),
  servants: new ne()
};
class Ke extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return We;
  }
}
const {
  HTMLField: Qe,
  StringField: Je
} = foundry.data.fields, V = () => ({
  description: new Qe(),
  infosource: new Je(),
  used: new foundry.data.fields.BooleanField({ initial: !1 })
}), {
  HTMLField: Ss,
  SchemaField: Xe,
  NumberField: re,
  StringField: hs,
  FilePathField: gs,
  ArrayField: Es,
  BooleanField: oe
} = foundry.data.fields, Ze = {
  ...V(),
  cost: new Xe({
    normal: new re({ initial: 1, required: !0 }),
    reducecost: new re()
  }),
  knack: new oe({ initial: !1 }),
  innate: new oe({ initial: !1 }),
  used: new oe({ initial: !1 })
};
class et extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return Ze;
  }
}
const {
  StringField: tt
} = foundry.data.fields, st = {
  ...V(),
  artifactType: new tt()
};
class at extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return st;
  }
}
const {
  HTMLField: it,
  StringField: U,
  ArrayField: le
} = foundry.data.fields, nt = {
  ...V(),
  quirk: new it(),
  skills: new le(new U()),
  advantages: new le(new U()),
  nation: new U(),
  active: new oe({ initial: !0 })
};
class rt extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return nt;
  }
}
const {
  HTMLField: ot
} = foundry.data.fields, lt = {
  ...V(),
  bonus: new ot()
};
class ct extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return lt;
  }
}
const ut = {
  ...V()
};
class dt extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return ut;
  }
}
const {
  SchemaField: mt,
  NumberField: Y
} = foundry.data.fields, pt = {
  ...V(),
  influence: new mt({
    value: new Y({ required: !0, integer: !0, min: 0, initial: 0 }),
    min: new Y({ required: !0, integer: !0, min: 0, initial: 0 }),
    max: new Y({ required: !0, integer: !0, min: 0, initial: 40 })
  })
};
class St extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return pt;
  }
}
const ht = {
  ...V()
};
class gt extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return ht;
  }
}
const Et = {
  ...V()
};
class ft extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return Et;
  }
}
foundry.data.fields;
const yt = {
  ...V()
};
class At extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return yt;
  }
}
const Nt = {
  ...V()
};
class bt extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return Nt;
  }
}
const {
  HTMLField: W,
  StringField: vt
} = foundry.data.fields, wt = {
  ...V(),
  concern: new W(),
  earnfavor: new W(),
  callupon: new vt(),
  favor: new W()
};
class Vt extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return wt;
  }
}
const {
  StringField: z
} = foundry.data.fields, It = {
  ...V(),
  sorctype: new z(),
  sorcdur: new z(),
  sorccat: new z(),
  sorcsubcat: new z()
};
class kt extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return It;
  }
}
const {
  HTMLField: K,
  StringField: Ot
} = foundry.data.fields, _t = {
  ...V(),
  reward: new K(),
  endings: new K(),
  steps: new K(),
  status: new Ot({ initial: "current" })
};
class Ct extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return _t;
  }
}

class ce extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
    const e = this.system;
    this.type === l.PLAYER && this._preparePlayerCharacterData(e), this.type === l.HERO && this._prepareHeroData(e), (this.type === l.VILLAIN || this.type === l.MONSTER) && this._prepareVillainData(e), this.type === l.BRUTE && this._prepareBruteData(e), this.type === l.SHIP && this._prepareShipData(e);
  }
  /**
   * Keep the value within the minimum and maxium values
   */
  _validateMinMaxData(e, t, s) {
    return parseInt(e) > parseInt(s) ? s : parseInt(e) < parseInt(t) ? t : e;
  }
  /**
   * Prepare Character type specific data
   */
  _preparePlayerCharacterData(e) {
    this._prepareWounds(e), this._prepareTraits(e), this._prepareSkills(e);
  }
  /**
   * Prepare Hero type specific data
   */
  _prepareHeroData(e) {
    this._prepareWounds(e), this._prepareTraits(e), this._prepareSkills(e);
  }
  /**
   * Prepare Villain type specific data
   */
  _prepareVillainData(e) {
    this._prepareTraits(e),
     e.villainy = parseInt(e.traits.strength.value) + parseInt(e.traits.influence.value);
     const dwMax = e.htk ? 5 : 4;
    e.dwounds.max = dwMax; 
    e.wounds.max = (parseInt(e.traits.strength.value) + 1) * dwMax; 
    
    e.wounds.value = this._validateMinMaxData(
      e.wounds.value,
      e.wounds.min,
      e.wounds.max
    );
    if (e.dwounds) {
      e.dwounds.value = this._validateMinMaxData(
        e.dwounds.value,
        e.dwounds.min,
        e.dwounds.max
      );
    }
  }
  /**
   * Prepare Brute type specific data
   */
  _prepareBruteData(e) {
    e.traits.strength.value = this._validateMinMaxData(
      e.traits.strength.value,
      e.traits.strength.min,
      e.traits.strength.max
    ), e.wounds.max = e.traits.strength.value, parseInt(e.wounds.max) < parseInt(e.wounds.value) && (e.wounds.value = e.wounds.max);
  }
  /**
   * Prepare Ship type specific data
   */
  _prepareShipData(e) {
  }
  /**
   * Remove a member from the crew
   */
  async removeFromCrew() {
    await this.unsetFlag("svnsea2e", "crewMember");
  }
  /**
   * Set a crew member's role
   */
  async setCrewMemberRole(e, t) {
    return this.setFlag("svnsea2e", "crewMember", {
      shipId: e,
      role: t
    });
  }
  /**
   *
   */
  _prepareTraits(e) {
    for (const t of Object.values(e.traits))
      t.value = this._validateMinMaxData(t.value, t.min, t.max);
  }
  /**
   *
   */
  _prepareSkills(e) {
    for (const t of Object.values(e.skills))
      t.value = this._validateMinMaxData(t.value, t.min, t.max);
  }
  /**
   * Establish the wound values based on the min and max for the actor type
   */
  _prepareWounds(e) {
    // Si la base de datos se llegara a desincronizar, esto la fuerza a obedecer la regla
    if (e.htk === true) {
      e.wounds.max = 25;
      e.dwounds.max = 5;
    } else {
      e.wounds.max = 20;
      e.dwounds.max = 4;
    }

    // Validamos para que el valor numérico no rompa las barras
    e.wounds.value = this._validateMinMaxData(
      e.wounds.value,
      e.wounds.min,
      e.wounds.max
    );

    if (e.dwounds) {
      e.dwounds.value = this._validateMinMaxData(
        e.dwounds.value,
        e.dwounds.min,
        e.dwounds.max
      );
    }
  }
}


class Tt extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "language-selector",
      classes: ["svnsea2e"],
      title: game.i18n.localize("SVNSEA2E.ActorLangSelect"),
      template: "systems/svnsea2e/templates/apps/language-selector.hbs",
      width: 320,
      height: "auto",
      choices: {},
      minimum: 0,
      maximum: null
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData() {
    const e = this.object.system.languages, t = foundry.utils.duplicate(this.options.choices);
    for (const [s, a] of Object.entries(t))
      t[s] = {
        label: a,
        chosen: e ? e.includes(s) : !1
      };
    return {
      choices: t
    };
  }
  /* -------------------------------------------- */
  /** @override */
  _updateObject(e, t) {
    const s = {}, a = [];
    for (const [n, r] of Object.entries(t))
      r && a.push(n);
    if (s["system.languages"] = a, this.options.minimum && a.length < this.options.minimum)
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          min: this.options.minimum
        })
      );
    if (this.options.maximum && a.length > this.options.maximum)
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          max: this.options.maximum
        })
      );
    this.object.update(s);
  }
}

// ==========================================
// ACTION SEQUENCE (same rules as v24 on Foundry 14)
// The raises of the round are the initiative of each combatant; the actor keeps a copy in `system.initiative` (shown
// by the toolbox and the sheets, used out of combat). During a combat the combatant is the source: with unlinked
// tokens each token has its own combatant and its own actor, so they do not overwrite each other.
//
// The first roll of a combatant in a round sets its raises (`flags.svnsea2e.roll` remembers the round and the raises).
// Later rolls of that round leave them alone; the button of the roll card sets them on purpose. A new round clears them.
// ==========================================

/** Rounds 0 (before the combat begins, when the approaches are rolled) and 1 are the same round of raises. */
const raisesRound = (combat) => Math.max(combat.round ?? 0, 1);

/** Villains (and their monsters and brutes) act first on ties with heroes. */
const actsFirstOnTies = (combatant) => [l.VILLAIN, l.MONSTER, l.BRUTE].includes(combatant.actor?.type);

/** Turn order: most raises first, then villains, then by name. Without raises at the end. */
function compareTurns(a, ia, b, ib) {
  ia = Number.isFinite(ia) ? ia : -Infinity;
  ib = Number.isFinite(ib) ? ib : -Infinity;
  return (
    ib - ia ||
    Number(actsFirstOnTies(b)) - Number(actsFirstOnTies(a)) ||
    (a.name ?? "").localeCompare(b.name ?? "") ||
    (a.id > b.id ? 1 : -1)
  );
}

class SvnSea2ECombat extends Combat {
  /** @override Called unbound by Combat#setupTurns. */
  _sortCombatants(a, b) {
    return compareTurns(a, a.initiative, b, b.initiative);
  }

  /**
   * Set the raises of some combatants (updates with `_id` and `initiative`).
   * @param {object[]} updates
   * @param {object} [options]
   * @param {boolean} [options.keepTurn=true]   Keep the turn on the current combatant. Without it the turn keeps its
   *   place: at the beginning of the round, the first one, on whoever has the most raises.
   */
  async updateRaises(updates, { keepTurn = true } = {}) {
    if (!updates.length) return;
    const options = { turnEvents: false };
    if (!keepTurn && this.turn !== null) options.combatTurn = this.turn;
    await this.updateEmbeddedDocuments("Combatant", updates, options);
  }

  /**
   * The turn that keeps the current combatant after these changes of initiative, or null when nothing moves. Foundry
   * keeps the turn index, so the turn would jump to whoever takes that place in the new order.
   * @param {object[]} updates   Combatant changes with `_id`.
   */
  turnKeepingCurrent(updates) {
    const current = this.combatant;
    if (!current || this.turn === null || !updates.some((u) => "initiative" in u)) return null;
    const values = new Map(updates.filter((u) => "initiative" in u).map((u) => [u._id, u.initiative]));
    const value = (c) => (values.has(c.id) ? values.get(c.id) : c.initiative);
    const order = this.combatants.contents.sort((a, b) => compareTurns(a, value(a), b, value(b)));
    const turn = order.findIndex((c) => c.id === current.id);
    return turn === this.turn ? null : turn;
  }

  /** @override The raises come from the rolls of the system: Foundry's d20 initiative is not rolled. */
  async rollInitiative() {
    return this;
  }

  /** @override A new round clears the raises; the active GM does it, as a player may advance the round. */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
    if ("round" in changed && options.direction > 0 && changed.round > 1 && game.user.isActiveGM) this.clearRaises();
  }

  /** Clear the raises of every combatant. Their marks of having rolled belong to the past round: they no longer count. */
  async clearRaises() {
    const updates = this.combatants.filter((c) => c.initiative !== null).map((c) => ({ _id: c.id, initiative: null }));
    await this.updateRaises(updates, { keepTurn: false });
  }
}

class SvnSea2ECombatant extends Combatant {
  /** @override Any change of raises (rolls, buttons, the tracker's own field) keeps the turn on the same combatant. */
  static async _preUpdateOperation(documents, operation, user) {
    const combat = operation.parent ?? documents[0]?.parent;
    if (combat?.turnKeepingCurrent && operation.combatTurn === undefined) {
      const turn = combat.turnKeepingCurrent(operation.updates ?? []);
      if (turn !== null) operation.combatTurn = turn;
    }
    return super._preUpdateOperation(documents, operation, user);
  }

  /** The roll that set the raises of the current round, if any: `{round, raises}`. */
  get raisesRoll() {
    const roll = this.getFlag("svnsea2e", "roll");
    return roll && this.parent && roll.round === raisesRound(this.parent) ? roll : null;
  }

  /** @override Keep the copy of the raises on the actor (the token's actor when unlinked). */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
    if (userId !== game.user.id || !("initiative" in changed)) return;
    const actor = this.actor;
    const value = changed.initiative ?? 0;
    if (actor?.isOwner && "initiative" in actor.system && actor.system.initiative !== value) {
      actor.update({ "system.initiative": value });
    }
  }
}

/** The actor of a roll card: v23.4 cards keep its UUID (the token's actor when unlinked), older ones its id. */
function actorFrom(ref) {
  if (!ref) return null;
  if (typeof ref !== "string") return ref;
  return ref.includes(".") ? fromUuidSync(ref) : game.actors.get(ref);
}

/** Combatants of the actor in the active combats that the user may change. */
function combatantsOf(actor) {
  return game.combats
    .filter((combat) => combat.active)
    .flatMap((combat) => combat.combatants.filter((c) => c.isOwner && c.actor && (c.actor === actor || c.actor.uuid === actor.uuid)));
}

/** Group the combatant updates by combat and apply them. */
async function updateCombatants(updates, options) {
  const byCombat = new Map();
  for (const [combatant, update] of updates) {
    const combat = combatant.parent;
    if (!byCombat.has(combat)) byCombat.set(combat, []);
    byCombat.get(combat).push({ _id: combatant.id, ...update });
  }
  for (const [combat, list] of byCombat) await combat.updateRaises(list, options);
}

/**
 * Set the initiative (raises) of an actor: on its combatants in the active combats, which copy it to the actor, or
 * on the actor alone when it is not in a combat.
 * @param {Actor|string} i   The actor, its UUID or (v23.3 cards and macros) the id of a world actor.
 * @param {number|string} e  The raises.
 */
async function Q(i, e) {
  const actor = actorFrom(i);
  let initiative = parseFloat(e);
  if (!actor || Number.isNaN(initiative)) return;
  initiative = Math.max(0, initiative);

  const combatants = combatantsOf(actor);
  if (!combatants.length) {
    if (actor.isOwner && "initiative" in actor.system) await actor.update({ "system.initiative": initiative });
    return;
  }
  await updateCombatants(combatants.map((c) => [c, { initiative }]));
}

/** The first roll of a combatant in the round sets its raises. The turn keeps its place, on the most raises. */
async function setRaisesFromRoll(actor, raises) {
  if (!actor?.uuid) return;
  const combatants = combatantsOf(actor).filter((c) => !c.raisesRoll);
  await updateCombatants(
    combatants.map((c) => [c, { initiative: raises, "flags.svnsea2e.roll": { round: raisesRound(c.parent), raises } }]),
    { keepTurn: false }
  );
}

const Ee = (i, e) => Object.entries(i.skills).map(([t, s]) => ({
  ...s,
  name: t,
  label: e.SVNSEA2E.skills[t]
})).sort((t, s) => t.label.localeCompare(s.label)), m = (actor, type) => actor.items.filter((i) => i.type === type).sort((a, b) => a.name.localeCompare(b.name));
/**
 * Index entries ({name, uuid}) of every advantage in the Item compendiums, the system's first: they win over a copy
 * with the same name in a module or world compendium. Built from the lightweight compendium indexes.
 */
async function Mt() {
  const found = [];
  const packs = [...game.packs].sort((a, b) => (b.metadata.packageName === "svnsea2e") - (a.metadata.packageName === "svnsea2e"));
  for (const pack of packs) {
    if (pack.documentName !== "Item") continue;
    const index = await pack.getIndex({ fields: ["type"] });
    for (const entry of index) {
      if (entry.type === "advantage") found.push({ name: entry.name, uuid: entry.uuid ?? pack.getUuid(entry._id) });
    }
  }
  return found;
}

/**
 * Find an advantage by name: an exact match among world items first, then in the compendiums (an exact match, then a
 * case-insensitive one).
 * @returns {Promise<Item|null>}
 */
async function findAdvantage(name) {
  const worldItem = game.items.find((i) => i.type === "advantage" && i.name === name);
  if (worldItem) return worldItem;
  const entries = await Mt();
  const lower = name.toLowerCase();
  const entry = entries.find((e) => e.name === name) ?? entries.find((e) => e.name.toLowerCase() === lower);
  return entry ? fromUuid(entry.uuid) : null;
}
const Dt = ["highland", "avalon", "inismore"], xt = (i) => Dt.includes(i.system.nation);

// ==========================================
// ROLL ENGINE (same rules as v24 on Foundry 14)
// From the dice rolled and the options of the roll to the raises. Nothing here rolls dice: when the rank 3 reroll
// is missing the result says so and the caller rolls it and asks again.
// ==========================================

/** Raises earned by one set: 2 for a 15 (or a 20 when the GM raised the threshold), 1 otherwise. */
function raisesPerCombo(threshold, increased) {
  return (threshold === 15 && !increased) || (threshold === 20 && increased) ? 2 : 1;
}

/** Indices of the values of `combo` inside `dice`, each one a different die, or null when a value is missing. */
function findComboIndices(dice, combo) {
  const indices = [];
  for (const value of combo) {
    const index = dice.findIndex((die, i) => die.value === value && !indices.includes(i));
    if (index === -1) return null;
    indices.push(index);
  }
  return indices;
}

/**
 * Group the dice into sets reaching `target`: first every exact sum, then the sets that overshoot the least.
 * @returns {{left: object[], combos: string[], raises: number}} left are the dice not used.
 */
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

/**
 * Count the raises of a pool.
 * @param {object} input
 * @param {number[]} input.faces           Faces of every die of the pool, explosions included, as rolled (1 to 10).
 * @param {number} input.threshold         Threshold of the skill: 10, or 15 from rank 4.
 * @param {boolean} input.increaseThreshold The GM raised the threshold by 5.
 * @param {boolean} input.addOne           +1 to every die.
 * @param {number} input.joieRank          Joie de Vivre: faces up to this count as 10s (0 without it).
 * @param {boolean} input.reroll           Skill rank 3+: the lowest leftover die is rolled again.
 * @param {number|null} input.rerollFace   The new face of that die, once rolled.
 */
function resolveDice(input) {
  const { addOne, joieRank = 0, reroll, rerollFace = null } = input;
  const increased = !!input.increaseThreshold;
  // Joie de Vivre: the dice equal to or lower than the skill rank (before the +1) count as 10s.
  const valueOf = (face) => (face <= joieRank ? 10 : addOne ? face + 1 : face);
  const dice = input.faces.map((face) => ({ face, value: valueOf(face) })).sort(byValue);
  const target = input.threshold + (increased ? 5 : 0);
  const matches = target === 15 ? CONFIG.SVNSEA2E.match15 : target === 20 ? CONFIG.SVNSEA2E.match20 : CONFIG.SVNSEA2E.match10;

  let raises = 0;
  const combos = [];

  // Each die of 10 or more is a raise on its own when the threshold is 10.
  const takeTens = () => {
    if (target !== 10) return;
    for (let i = dice.length - 1; i >= 0 && dice[i].value >= 10; i--) {
      raises++;
      combos.push(String(dice[i].value));
      dice.splice(i, 1);
    }
  };

  takeTens();

  // Exact pairs, then exact triples, from the match tables.
  for (const combo of [...matches.two, ...matches.three]) {
    let indices;
    while ((indices = findComboIndices(dice, combo))) {
      raises += raisesPerCombo(target, increased);
      combos.push(indices.map((i) => dice[i].value).join(" + "));
      for (const i of indices.sort((a, b) => b - a)) dice.splice(i, 1);
    }
  }

  // Skill rank 3+: reroll the lowest leftover die.
  let rerolled = null;
  if (dice.length > 0 && reroll) {
    if (rerollFace === null) return { needsReroll: true, target };
    rerolled = { from: dice[0].face, to: rerollFace };
    dice[0] = { face: rerollFace, value: valueOf(rerollFace) };
    dice.sort(byValue);
  }

  takeTens();

  // Whatever is left is grouped as efficiently as possible.
  let grouped = groupDice(dice, target, increased);
  combos.push(...grouped.combos);
  raises += grouped.raises;
  if (grouped.left.length > 0 && ((!increased && target === 15) || (increased && target === 20))) {
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
    rerolled,
  };
}

const formNumber = (field) => parseInt(field?.value) || 0, formChecked = (field) => !!field?.checked;

/** Dice added by the options of the roll dialog: bonus, flair, interpretation and hero points (3 dice each from helpers). */
const Ft = function (i) {
  return formNumber(i.bonusDice) + (formChecked(i.flairDice) ? 1 : 0) + (formChecked(i.interpretationDice) ? 1 : 0) + formNumber(i.useForMe) + formNumber(i.useForHelpMe) * 3;
};

/** Hero points spent on the roll. Returns false when the hero does not have enough of them. */
const Lt = async function (i, e) {
  const spent = formNumber(i.useForMe), available = e.system.heropts || 0;
  if (spent > available) {
    ui.notifications.error(game.i18n.localize("SVNSEA2E.NotEnoughHero"));
    return false;
  }
  // Up to v23.3 this updated "data.heropts", which no longer exists: the points were never spent.
  if (spent > 0) await e.update({ "system.heropts": available - spent });
  return true;
};

/**
 * Roll a dice pool, sort it into raises and post the result card to the chat.
 * @param {object} rolldata   skilldice, skillRank (for Joie de Vivre), threshold (10 or 15), explode, reroll, skipWoundBonus.
 * @param {Actor} actor
 * @param {object} data       The actor's system data.
 * @param {HTMLFormElement|object} form  The roll dialog (or an object with the same fields).
 */
async function de({
  rolldata: i = {},
  actor: e = {},
  data: t = {},
  form: s = {},
  template: a,
  title: n
}) {
  // Every character with at least one dramatic wound gets one extra die.
  const woundBonus = !i.skipWoundBonus && t.dwounds && t.dwounds.value >= 1 ? 1 : 0;
  const poolSize = (parseInt(i.skilldice) || 0) + formNumber(s.trait) + Ft(s) + woundBonus;
  if (poolSize < 1) {
    ui.notifications.warn(game.i18n.localize("SVNSEA2E.NoDiceToRoll"));
    return false;
  }
  // Hero points are spent only when there are dice to roll.
  if (e.type !== l.VILLAIN && e.type !== l.MONSTER && !(await Lt(s, e)))
    return false;

  const increased = formChecked(s.increaseThreshold),
    addOne = formChecked(s.addOneToDice),
    explode = !!(i.explode || formChecked(s.explodeDice)),
    // Joie de Vivre: the dice up to the skill rank count as 10s (trait rolls have no skill: rank 0).
    joieRank = formChecked(s.joieDeVivreAdvantage) ? Math.min(Math.max(parseInt(i.skillRank) || 0, 0), 5) : 0;

  // Foundry rolls the explosions after the dice of the pool, in the same term.
  const roll = await new Roll(`${poolSize}d10${explode ? "x" : ""}`).evaluate();
  const faces = roll.dice[0].results.map((r) => r.result);
  const input = { faces, threshold: i.threshold === 15 ? 15 : 10, increaseThreshold: increased, addOne, joieRank, reroll: !!i.reroll };
  let result = resolveDice(input);
  if (result.needsReroll) {
    const rerollRoll = await new Roll("1d10").evaluate();
    result = resolveDice({ ...input, rerollFace: rerollRoll.total });
  }

  let threshold = String(result.target);
  increased && (threshold += " " + game.i18n.localize("SVNSEA2E.GMIncreasedThreshold"));
  const unused = result.unused.length, A = {
    actor: e,
    // The token's actor when unlinked, so the initiative button finds its combatant.
    actorUuid: e.uuid,
    raisetxt: result.raises > 1 ? game.i18n.localize("SVNSEA2E.Raises") : game.i18n.localize("SVNSEA2E.Raise"),
    unusedDiceTxt: unused > 1 ? game.i18n.localize("SVNSEA2E.UnusedDice") : game.i18n.localize("SVNSEA2E.UnusedDie"),
    data: t,
    exploded: explode,
    explosions: game.i18n.format("SVNSEA2E.RollsExploded"),
    extraDice: faces.length - poolSize,
    hasAddOneToDice: addOne,
    addOneToDiced: game.i18n.format("SVNSEA2E.AddOneToDiced"),
    labels: t.labels,
    rolls: result.faces,
    raises: result.raises,
    rCombos: game.i18n.localize("SVNSEA2E.RaiseCombos"),
    combos: result.combos,
    rerolled: !!result.rerolled,
    reroll: result.rerolled ? game.i18n.format("SVNSEA2E.Reroll", { roll1: result.rerolled.from, roll2: result.rerolled.to }) : "",
    unusedDice: unused,
    unusedRolls: result.unused,
    dicesNumber: poolSize,
    threshold: game.i18n.format("SVNSEA2E.RollThreshold", {
      threshold
    })
  }, ve = await renderTemplate(a, A), te = game.settings.get("core", "rollMode"), se = {
    user: game.user.id,
    type: CONST.CHAT_MESSAGE_STYLES.OTHER,
    content: ve,
    image: e.img,
    speaker: {
      actor: e.id,
      token: e.token,
      alias: e.name
    },
    flavor: n,
    blind: te === "blindroll",
    // Toggle default roll mode
    whisper: ["gmroll", "blindroll"].includes(te) ? ChatMessage.getWhisperRecipients("GM") : void 0
  };
  game.dice3d && await game.dice3d.showForRoll(roll);
  await ChatMessage.create(se);
  // In an action sequence, the first roll of the round sets the raises of the actor's combatants.
  await setRaisesFromRoll(e, result.raises);
  return roll;
}
class M extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 1050,
      height: 750
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData(e) {
    const t = super.getData(e), s = t.document, a = s.system, { isOwner: n, limited: r } = this.document, o = {
      owner: n,
      limited: r,
      options: this.options,
      editable: this.isEditable,
      cssClass: n ? "editable" : "locked",
      isCorrupt: a.corruptionpts > 0,
      isPlayerCharacter: s.type === l.PLAYER,
      isHero: s.type === l.HERO,
      isVillain: s.type === l.VILLAIN,
      isMonster: s.type === l.MONSTER,
      isNotBrute: s.type !== l.BRUTE,
      hasSkills: typeof a.skills < "u",
      hasLanguages: typeof a.languages < "u",
      config: CONFIG.SVNSEA2E,
      dtypes: ["String", "Number", "Boolean"],
      // Core Actor data:
      name: s.name,
      img: s.img,
      initiative: a.initiative,
      age: a.age,
      nation: a.nation,
      wealth: a.wealth,
      heropts: a.heropts,
      corruptionpts: a.corruptionpts,
      wounds: a.wounds,
      woundsRemaining: (() => {
        if (!a.wounds) return 0;
        let divisor = 5;
        if (s.type === l.VILLAIN || s.type === l.MONSTER) {
          divisor = parseInt(a.traits?.strength?.value || 0) + 1;
        }
        const totalWounds = (a.dwounds?.value || 0) + (a.wounds.value || 0);
        return Math.max(0, (a.wounds.max || 0) - totalWounds);
      })(),
      dwounds: a.dwounds,
      htk: a.htk,
      traits: this._prepareTraits(s),
      languageChoices: this._prepareLanguages(s),
      languages: a.languages,
      // Concept tab.
      religion: a.religion,
      reputation: a.reputation,
      concept: a.concept,
      arcana: a.arcana,
      // Inventory Tab
      equipment: a.equipment,
      // Fate Tab
      redemption: a.redemption
    };
    return s.type === l.PLAYER ? this._prepareCharacterItems(t, o) : s.type === l.HERO ? this._prepareHeroItems(t, o) : s.type === l.VILLAIN ? this._prepareVillainItems(t, o) : s.type === l.MONSTER ? this._prepareMonsterItems(t, o) : s.type === l.SHIP ? (this._prepareShipItems(t, o), this._processFlags(a, s.flags, o)) : s.type === l.DANGERPOINTS ? o.points = a.points : s.type === l.BRUTE && (o.ability = a.ability, this._prepareBruteItems(t, o)), o;
  }
  /* -------------------------------------------- */
  _prepareButtonTitles(e) {
    for (const t of Object.values(e))
      t.editlabel = game.i18n.format("SVNSEA2E.EditLabel", {
        label: e.name
      }), t.deletelabel = game.i18n.format("SVNSEA2E.DeleteLabel", {
        label: e.name
      });
  }
  /* -------------------------------------------- */
  /**
   * Returns a sheet-friendly list of traits with the localized label.
   *
   * @param actor
   * @returns {(*&{name: *, label: *})[]|*[]}
   * @private
   */
  _prepareTraits(e) {
    return [l.SHIP, l.DANGERPOINTS].includes(e.type) ? [] : Object.entries(e.system.traits).map(([t, s]) => ({
      ...s,
      name: t,
      label: CONFIG.SVNSEA2E.traits[t]
    }));
  }
  /* -------------------------------------------- */
  /** @override */
  activateListeners(e) {
    if (super.activateListeners(e), !!this.options.editable && (
      // ... listeners existentes ...
      e.find(".language-selector").on("click", this._onLanguageSelector.bind(this)),
      e.find(".add-1-initiative").on("click", this._onAddInitiative.bind(this)),
      e.find(".minus-1-initiative").on("click", this._onMinusInitiative.bind(this)),
      e.find(".item-create").on("click", this._onItemCreate.bind(this)),
      e.find(".item-edit").on("click", this._onItemEdit.bind(this)),
      e.find(".item-delete").on("click", this._onItemDelete.bind(this)),
      e.find(".item-throw").on("click", this._onItemThrow.bind(this)),
      e.find(".item h4.item-name").on("click", (t) => this._onItemSummary(t)),
      e.find(".htk-control").click(this._onToggleHtK.bind(this)),
      e.find(".item-check").on("click", this._onItemCheck.bind(this)),
      e.find(".item-toggle").on("click", this._onToggleBackground.bind(this)),
      e.find(".item-header").click(this._onToggleSection.bind(this)),
      e.find(".roll-throw").on("click", this._onRollThrow.bind(this)),
      e.find('.initiative-input').on('change', this._onInitiativeChange.bind(this)),
      e.find('.initiative-input').on('keydown', (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Evita que el formulario haga submit
          this._onInitiativeChange(event); // Fuerza la actualización
          event.currentTarget.blur(); // Quita el foco del input
        }
      }),

      // Lógica original para Heroes y Villanos (.rollable)
      this.actor.type === l.PLAYER || this.actor.type === l.HERO ?
        e.find(".rollable").on("click", this._onHeroRoll.bind(this)) :
        (this.actor.type === l.VILLAIN || this.actor.type === l.MONSTER) && e.find(".rollable").on("click", this._onVillainRoll.bind(this)),

      // --- NUEVO LISTENER PARA TRAITS (.rollableT) ---
      // Esto buscará cualquier elemento con la clase "rollableT" y ejecutará _onTraitRoll
      e.find(".rollableT").on("click", this._onTraitRoll.bind(this)),
      // -----------------------------------------------

      // ... resto de listeners ...
      e.find(".fillable.fa-circle").on("click", (t) => this._processCircle(t)),
      this.actor.type === l.BRUTE ?
        e.find(".fillable.fa-heart").on("click", (t) => this._processBruteWounds(t)) :
        e.find(".fillable.fa-heart").on("click", this._processWounds.bind(this)),
      this.actor.isOwner
    )) {
      const t = (s) => this._onDragItemStart(s);
      e.find("li.item").each((s, a) => {
        a.classList.contains("inventory-header") || (a.setAttribute("draggable", !0), a.addEventListener("dragstart", t, !1));
      });
    }
  }
  _onItemThrow(e) {
    e.preventDefault();
    const t = e.currentTarget.closest(".item"),
      itemId = t.dataset.itemId;
    const item = this.actor.items.get(itemId);

    if (item) return item.ItemThrow();
  }
  async _onItemCheck(e) {
    // 1. Detenemos al navegador. Solo la Base de Datos dictará si está marcado.
    e.preventDefault();

    const li = e.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);

    if (item) {
      // 2. Guardamos en la BD. Al completarse, Foundry recargará la hoja y dibujará el tick.
      await item.update({ "system.used": !item.system.used });
    }
  }
  async _onRollThrow(e) {
    e.preventDefault();

    // Ruta a tu plantilla simple (la que subiste roll-throw.hbs)
    const template = "systems/svnsea2e/templates/items/parts/roll-throw.hbs";

    // Renderizamos el diálogo pequeño
    const htmlContent = await renderTemplate(template, {});

    return new Promise((resolve) => {
      new Dialog({
        title: game.i18n.localize("SVNSEA2E.Roll"), // "Tirada" o título genérico
        content: htmlContent,
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice-d20"></i>',
            label: game.i18n.localize("SVNSEA2E.Roll"),
            callback: async (html) => {
              // 1. Obtener número de dados del input
              let numDice = parseInt(html.find("#dice-number").val(), 10);
              if (isNaN(numDice) || numDice < 1) numDice = 1;

              // 1b. Leer las casillas de Advantages / Danger Points del diálogo
              const addOneToDiceChecked = html.find("#addOneToDice").is(":checked");
              const joieDeVivreChecked = html.find("#joieDeVivreAdvantage").is(":checked");
              const explodeDiceChecked = html.find("#explodeDice").is(":checked");
              const increaseThresholdChecked = html.find("#increaseThreshold").is(":checked");
              // Joie de Vivre needs the rank of the skill: the number of dice is not it.
              const joieRank = parseInt(html.find("#joieRank").val(), 10) || 0;

              // 2. Ejecutar la función 'de' (la lógica interna de tiradas)
              // NOTA: 'de' espera un formulario complejo, así que creamos un objeto 'fakeForm'
              // con valores en 0/false para que solo cuente los dados que pusimos manuales,
              // salvo las casillas de Advantages/Danger Points que sí se leen del diálogo.
              await de({
                rolldata: {
                  skilldice: numDice, // Aquí van tus dados manuales
                  threshold: 10,      // Dificultad estándar
                  explode: false,     // La explosión manual se maneja vía explodeDice
                  reroll: false,
                  skillRank: joieRank,
                  skipWoundBonus: true
                },
                actor: this.actor,
                data: this.actor.system,
                template: "systems/svnsea2e/templates/chats/roll-card.hbs",
                title: "Tirada Genérica", // Título en el chat

                // Objeto que simula ser el formulario de Skills/Traits
                form: {
                  trait: { value: 0 },
                  flairDice: { checked: false },
                  interpretationDice: { checked: false },
                  useForMe: { value: 0 },
                  useForHelpMe: { value: 0 },
                  bonusDice: { value: 0 },
                  increaseThreshold: { checked: increaseThresholdChecked },
                  addOneToDice: { checked: addOneToDiceChecked },
                  joieDeVivreAdvantage: { checked: joieDeVivreChecked },
                  explodeDice: { checked: explodeDiceChecked }
                }
              });
              resolve();
            }
          },
          cancel: {
            label: game.i18n.localize("Cancel"),
            callback: () => resolve()
          }
        },
        default: "roll"
      }).render(true);
    });
  }
  _onToggleSection(event) {
    event.preventDefault();

    // El elemento header al que hicimos click
    const header = $(event.currentTarget);

    // Buscar todos los elementos 'li' (items) que están DEBAJO de este header
    // Y detenerse cuando encontremos el SIGUIENTE header (.item-header) o se acabe la lista.
    const items = header.nextUntil(".item-header");

    // Alternar visibilidad (slide up / slide down)
    items.slideToggle(200);

    // Opcional: Si quisieras rotar un icono de flecha, aquí añadirías la clase
    // header.find("i").toggleClass("fa-rotate-90");
  }
  async _onToggleBackground(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);

    if (!item) return;

    // 1. Determinar el nuevo estado
    const isCurrentlyActive = item.system.active;
    const newState = !isCurrentlyActive;

    // 2. Ejecutar la lógica (sin notificaciones)
    if (newState === true) {
      await this._processBackgroundDrop(item);
    } else {
      await this._processBackgroundDelete(item.system);
    }

    // 3. Guardar el nuevo estado visual
    await item.update({ "system.active": newState });
  }
  _onAddInitiative(e) {
    e.preventDefault();
    const t = (this.actor.system.initiative || 0) + 1;
    Q(this.actor, t);
  }
  async _onInitiativeChange(event) {
    event.preventDefault();
    event.stopPropagation();

    const input = event.currentTarget;
    let newInitiative = parseInt(input.value, 10);

    // Validación: asegurar que sea un número y no menor a 0
    if (isNaN(newInitiative) || newInitiative < 0) {
      newInitiative = 0;
    }

    // Usamos la función global 'Q' de tu sistema actual.
    // 'Q' se encarga de: 
    // 1. Actualizar 'system.initiative' en el Actor.
    // 2. Buscar si el actor está en el Combat Tracker y actualizarlo ahí también.
    Q(this.actor, newInitiative);

    // Quitar el foco para confirmar visualmente el cambio
    input.blur();
  }
  _onMinusInitiative(e) {
    e.preventDefault();
    const t = (this.actor.system.initiative || 0) - 1;
    Q(this.actor, t);
  }
  /* -------------------------------------------- */
  /**
   * Choices of the languages <multi-select> as {key: label}. Stored keys that are not in the configuration are kept
   * as choices too, so that saving the sheet does not drop them.
   * @param {Object} actor       The actor
   * @private
   */
  _prepareLanguages(e) {
    const languages = e.system.languages;
    if (!languages) return {};
    const choices = { ...CONFIG.SVNSEA2E.languages };
    for (const lang of languages) choices[lang] ??= lang;
    return choices;
  }
  /* -------------------------------------------- */
  /**
   * Process the effects of clicking on a circle
   * @param {Object} event      event sent
   * @private
   */
  async _processCircle(e) {
    const t = this.document, s = t.system, a = e.target.dataset;
    let n = {}, r = parseInt(a.value), o = 0;
    if (r === 1) {
      switch (a.type) {
        case "skill":
          o = s.skills[a.key].value;
          break;
        case "trait":
          a.key === "influence" || a.key === "strength" ? o = s.traits[a.key].value : r = 2;
          break;
        case "corrupt":
          o = s[a.key];
          break;
        case "fear":
          o = s[a.key].value;
          break;
      }
      o === 1 && (r = 0);
    }
    return n[a.name] = r, t.update(n);
  }
  /* -------------------------------------------- */
  /**
   * When a wound heart is click properly set the values
   * @param {Object} event      event sent
   * @private
   */
  _processBruteWounds(e) {
    const t = this.document, s = t.system;
    let a = {};
    a["system.wounds.value"] = e.target.dataset.value, s.wounds.value == 1 && e.target.dataset.value == 1 && (a["system.wounds.value"] = 0), t.update(a);
  }


  /* -------------------------------------------- */
  /**
   * When a wound heart is click properly set the values
   * @param {Object} event      event sent
   * @private
   */

  _processWounds(event) {
    event.preventDefault();
    const actor = this.document;
    if (!actor) return;
    const system = actor.system;
    const dataset = event.currentTarget.dataset;

    let updateObj = {};
    let wounds = system.wounds.value;
    let dwounds = system.dwounds.value;
    const clickValue = parseInt(dataset.value);

    if (isNaN(clickValue)) return;

    // --- LÓGICA MATEMÁTICA DINÁMICA ---
    let divisor = 5; // Por defecto para Héroes
    if (actor.type === "villain" || actor.type === "monster") {
      // Para Villanos la división de la herida dramática es (Fuerza + 1)
      divisor = parseInt(system.traits.strength.value) + 1;
    }

    if (dataset.type === 'wounds') {
      wounds = clickValue;
      // Calculamos dramáticas automáticamente
      const dwestimate = Math.trunc(wounds / divisor);
      if (dwestimate > dwounds) dwounds = dwestimate;
      if (clickValue === 1 && system.wounds.value === 1) wounds = 0;
    } else {
      if (clickValue > dwounds) {
        dwounds = clickValue;
      } else if (clickValue === dwounds) {
        dwounds = dwounds - 1; 
      } else {
        dwounds = clickValue;
      }
      // Las heridas dramáticas no deben modificar las normales (hay habilidades
      // que curan/causan una sin afectar la otra).
    }

    updateObj['system.wounds.value'] = wounds;
    updateObj['system.dwounds.value'] = dwounds;

    // Seguro para HTK
    if (system.htk === true) {
      if (actor.type === "villain" || actor.type === "monster") {
        if (system.dwounds.max !== 5) updateObj['system.dwounds.max'] = 5;
        if (system.wounds.max !== divisor * 5) updateObj['system.wounds.max'] = divisor * 5;
      } else {
        if (system.dwounds.max !== 5) updateObj['system.dwounds.max'] = 5;
        if (system.wounds.max !== 25) updateObj['system.wounds.max'] = 25;
      }
    } else {
      // Failsafe para cuando no lo tienen activo
      if (actor.type === "villain" || actor.type === "monster") {
        if (system.dwounds.max !== 4) updateObj['system.dwounds.max'] = 4;
        if (system.wounds.max !== divisor * 4) updateObj['system.wounds.max'] = divisor * 4;
      }
    }
    actor.update(updateObj);
  }


  /* -------------------------------------------- */
  /**
   * Handle spawning the languageSelector application which allows a checkbox of multiple language options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onLanguageSelector(e) {
    e.preventDefault();
    const t = e.currentTarget, s = {
      title: game.i18n.localize("SVNSEA2E.Languages"),
      choices: CONFIG.SVNSEA2E[t.dataset.options]
    };
    new Tt(this.actor, s).render(!0);
  }
  /* -------------------------------------------- */
  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset.
   * @param {Event} event          The originating click event.
   * @returns {Promise<Item5e[]>}  The newly created item.
   * @private
   */
  _onItemCreate(e) {
    e.preventDefault();
    const t = e.currentTarget, s = t.dataset.type, a = {
      name: game.i18n.localize(`SVNSEA2E.New${s}`),
      img: `systems/svnsea2e/icons/${s}.jpg`,
      type: s,
      data: foundry.utils.deepClone(t.dataset)
    };
    return delete a.data.type, this.actor.createEmbeddedDocuments("Item", [a]);
  }
  /* -------------------------------------------- */
  /**
   * Handle editing an existing Owned Item for the Actor.
   * @param {Event} event    The originating click event.
   * @returns {ItemSheet5e}  The rendered item sheet.
   * @private
   */
  _onItemEdit(e) {
    e.preventDefault();
    const t = e.currentTarget.closest(".item");
    return this.actor.items.get(t.dataset.itemId).sheet.render(!0);
  }
  /* -------------------------------------------- */
  /**
   * Handle deleting a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemDelete(e) {
    e.preventDefault();
    const t = e.currentTarget.closest(".item"), s = this.actor.items.get(t.dataset.itemId);
    if (s)
      return s.system.type === "background" && await this._processBackgroundDelete(s.system.data), s.delete();
  }
  /* -------------------------------------------- */
  /**
   * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
   * @private
   */
  async _onItemSummary(e) {
    e.preventDefault();
    const t = $(e.currentTarget).closest(".item"), a = await this.actor.items.get(t.data("itemId")).getChatData({ secrets: this.actor.owner });
    if (t.hasClass("expanded")) {
      const n = t.children(".item-summary");
      n.slideUp(200, () => n.remove());
    } else {
      const n = $(`<div class="item-summary">${a.description}</div>`), r = $(
        `<div class="item-metdata">${a.metadatahtml}</div>`
      );
      n.append(r), t.append(n.hide()), n.slideDown(200);
    }
    t.toggleClass("expanded");
  }
  /* -------------------------------------------- */
  /** @override */
  async _onDrop(e) {
    e.preventDefault();
    let t;
    try {
      t = JSON.parse(e.dataTransfer.getData("text/plain"));
    } catch {
      return !1;
    }
    if (!t)
      return !1;
    if (t.type === "Item")
      return this._onDropItem(e, t);
    if (t.type === "Actor")
      return this._onDropActor(e, t);
  }
  /* -------------------------------------------- */
  /**
   * Handle dropping an Actor on the sheet to trigger a Polymorph workflow
   * @param {DragEvent} event   The drop event
   * @param {Object} data       The data transfer
   * @return {Object}           OwnedItem data _getIndexeso create
   * @private
   */
  async _onDropActor(e, t) {
  }
  /* -------------------------------------------- */
  /**
   * Handle dropping of an item reference or item data onto an Actor Sheet
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {Object} data         The data transfer extracted from the event
   * @return {Object}             OwnedItem data to create
   * @private
   */
  async _onDropItem(e, t) {
    if (!this.actor.isOwner)
      return !1;
    const s = await Item.implementation.fromDropData(t), a = this.actor;
    if (t.actorId === a.id || a.isToken && t.tokenId === a.token.id)
      return this._onSortItem(e, s);
    const r = await this._doesActorHaveItem(s.type, s.name);
    if (s.type !== "sorcery" && r)
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.ItemExists", {
          type: s.type,
          name: s.name
        })
      );
    if (s.type === "background") {
      const bgNation = s.system.nation;
      if (
        // Glamour Isles backgrounds apply to Highland, Avalon and Inismore; other nation specific ones to that nation.
        bgNation === "gisles" ? !xt(this.actor) : bgNation && bgNation !== "none" && bgNation !== this.actor.system.nation
      )
        // Only a warning: characters of mixed nationality may still take the background.
        ui.notifications.warn(
          game.i18n.format("SVNSEA2E.WrongNation", {
            bgnation: game.i18n.localize(
              CONFIG.SVNSEA2E.natTypes[s.system.nation] ?? s.system.nation
            ),
            anation: game.i18n.localize(
              CONFIG.SVNSEA2E.nations[this.actor.system.nation] ?? ""
            ),
            name: s.name
          })
        );
      await this._processBackgroundDrop(s);
    }
    return await this.actor.createEmbeddedDocuments("Item", [s]);
  }
  async _updateBackgroundSkills(e, t) {
    const s = this.actor.system, a = e.system.skills.reduce((n, r) => {
      const o = s.skills[r].value + t, d = Math.max(Math.min(o, 5), 0);
      return { ...n, [`system.skills.${r}.value`]: d };
    }, {});
    await this.actor.update(a);
  }
  /* -------------------------------------------- */
  /**
   * Process for modifying the character sheet when a background is dropped on it.
   * Backgrounds increase skills and add advantages
   * @param item for the item that has been dropped on the character sheet
   */
  async _processBackgroundDrop(e) {
    const t = e.system;
    for (const s of t.advantages) {
      const o = await findAdvantage(s);
      if (!o) {
        ui.notifications.error(
          game.i18n.format("SVNSEA2E.ItemDoesntExist", {
            name: s
          })
        );
        continue;
      }
      const d = await this._doesActorHaveItem(
        "advantage",
        o.name
      );
      if (o.type !== "sorcery" && d) {
        ui.notifications.error(
          game.i18n.format("SVNSEA2E.ItemExists", {
            type: o.type,
            name: o.name
          })
        );
        continue;
      }
      await this.actor.createEmbeddedDocuments("Item", [
        foundry.utils.duplicate(o)
      ]);
    }
    await this._updateBackgroundSkills(e, 1);
  }
  /* -------------------------------------------- */
  /**
   * Process for modifying the character sheet when a background is dropped on it.
   * Backgrounds increase skills and add advantages
   * @param itemData data for the item that is being deleted
   */
  async _processBackgroundDelete(itemData) {
    // 1. CORRECCIÓN: Usar 'this.actor.system' en lugar de 'this.actor.data.data'
    const actorSystem = this.actor.system;
    const updateData = {};

    // Restar puntos a las habilidades
    for (let n = 0; n < itemData.skills.length; n++) {
      const skillKey = itemData.skills[n];
      // Aseguramos que el valor no baje de 0
      const newValue = Math.max(0, actorSystem.skills[skillKey].value - 1);

      // 2. CORRECCIÓN: La ruta de actualización es 'system.skills...'
      updateData[`system.skills.${skillKey}.value`] = newValue;
    }

    // Ejecutar actualización de habilidades
    if (!foundry.utils.isEmpty(updateData)) {
      await this.actor.update(updateData);
    }

    // Borrar las ventajas asociadas
    const currentAdvantages = await this._getAdvantages(); // Esta función devuelve los items
    const advantagesToDelete = [];

    for (let n = 0; n < itemData.advantages.length; n++) {
      const advName = itemData.advantages[n];

      for (let r = 0; r < currentAdvantages.length; r++) {
        // 3. CORRECCIÓN: Usar 'name' directo, no 'data.name'
        if (currentAdvantages[r].name === advName) {
          advantagesToDelete.push(currentAdvantages[r].id);
        }
      }
    }

    if (advantagesToDelete.length > 0) {
      await this.actor.deleteEmbeddedDocuments("Item", advantagesToDelete);
    }
  }
  /* -------------------------------------------- */
  /**
   * Determine if the actor as any item records associated with it.
   * @private
   */
  async _doesActorHaveItem(e, t) {
    return !!this.actor.items.find(
      (a) => a.name === t && a.type === e
    );
  }
  /* -------------------------------------------- */
  /**
   * Retrive the names of advantages
   * @private
   */
  async _getAdvantageNames() {
    return this.actor.items.filter((e) => e.type === "advantage").map((e) => e.name);
  }
  /* -------------------------------------------- */
  /**
   * Retrieve all advantages the character has assigned
   * @private
   */
  async _getAdvantages() {
    return this.actor.items.filter((e) => e.type === "advantage");
  }
  /* -------------------------------------------- */
  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */


  async _onHeroRoll(e) {
    e.preventDefault();
    const s = e.currentTarget.dataset, a = this.actor, n = this.actor.system;
    let r = n.skills[s.label].value, o = {
      threshold: 10,
      explode: !1,
      reroll: !1,
      skilldice: r,
      // Rank of the skill rolled, for Joie de Vivre.
      skillRank: r
    };
    r > 2 && (o.reroll = !0), r >= 4 && (o.threshold = 15), (r === 5 || n.dwounds.value >= 3) && (o.explode = !0);
    const d = {};
    for (const b of Object.keys(n.traits))
      d[CONFIG.SVNSEA2E.traits[b]] = n.traits[b].value;
    const f = n.dwounds.value >= 1 ? 1 : 0, y = "systems/svnsea2e/templates/chats/skill-roll-dialog.hbs", c = { data: n, traits: d, initialBonusDice: f }, C = await renderTemplate(y, c), w = game.i18n.format("SVNSEA2E.ApproachPromptTitle", {
      skill: CONFIG.SVNSEA2E.skills[s.label]
    });
    return new Promise((b) => {
      new Dialog(
        {
          title: w,
          content: C,
          buttons: {
            roll: {
              icon: '<img src="systems/svnsea2e/icons/d10.svg" class="d10">',
              label: game.i18n.localize("SVNSEA2E.Roll"),
              callback: (v) => de({
                rolldata: o,
                actor: a,
                data: n,
                form: v[0].querySelector("form"),
                template: "systems/svnsea2e/templates/chats/roll-card.hbs",
                title: game.i18n.format("SVNSEA2E.ApproachRollChatTitle", {
                  trait: v[0].querySelector("form").trait[v[0].querySelector("form").trait.selectedIndex].text,
                  skill: CONFIG.SVNSEA2E.skills[s.label]
                })
              })
            }
          }
        },
        {}
      ).render(!0);
    });
  }

  async _onToggleHtK(event) {
    event.preventDefault();

    const currentStatus = this.actor.system.htk;
    const newStatus = !currentStatus;

    let updateData = {
      "system.htk": newStatus
    };

    if (this.actor.type === "villain" || this.actor.type === "monster") {
      // Dinámico para Villanos: divisor * 5 (HTK) o divisor * 4 (Normal)
      const divisor = parseInt(this.actor.system.traits.strength.value) + 1;
      
      if (newStatus === true) {
        updateData["system.wounds.max"] = divisor * 5;
        updateData["system.dwounds.max"] = 5;
      } else {
        updateData["system.wounds.max"] = divisor * 4;
        updateData["system.dwounds.max"] = 4;

        if (this.actor.system.wounds.value > divisor * 4) {
          updateData["system.wounds.value"] = divisor * 4;
        }
        if (this.actor.system.dwounds.value > 4) {
          updateData["system.dwounds.value"] = 4;
        }
      }
    } else {
      // Estático para Héroes (25 / 20)
      if (newStatus === true) {
        updateData["system.wounds.max"] = 25;
        updateData["system.dwounds.max"] = 5;
      } else {
        updateData["system.wounds.max"] = 20;
        updateData["system.dwounds.max"] = 4;

        if (this.actor.system.wounds.value > 20) {
          updateData["system.wounds.value"] = 20;
        }
        if (this.actor.system.dwounds.value > 4) {
          updateData["system.dwounds.value"] = 4;
        }
      }
    }

    await this.actor.update(updateData);
  }




  /**
   * Maneja el clic en un Rasgo (Trait) para tirar solo dados de Rasgo.
   * Reemplaza a tu antiguo _onHeroRollT
   */
  /* Dentro de SvnSea2EActorSheet */


  async _onTraitRoll(e) {
    e.preventDefault();
    const s = e.currentTarget.dataset,
      a = this.actor,
      n = this.actor.system;
    let r = {
      threshold: 10,
      // 10s explode from the third dramatic wound, on every roll.
      explode: !!(n.dwounds && n.dwounds.value >= 3),
      reroll: !1,
      skilldice: 0
    };
    const o = "systems/svnsea2e/templates/chats/trait-roll-dialog.hbs", 
          d = (n.dwounds && n.dwounds.value >= 1) ? 1 : 0, 
          f = {
      data: n,
      traitmax: n.traits[s.label].value,
      initialBonusDice: d
    }, y = await renderTemplate(o, f), c = game.i18n.format("SVNSEA2E.TraitRollTitle", {
      trait: CONFIG.SVNSEA2E.traits[s.label]
    });
    return new Promise(() => {
      new Dialog(
        {
          title: c,
          content: y,
          buttons: {
            roll: {
              icon: '<img src="systems/svnsea2e/icons/d10.svg" class="d10">',
              label: game.i18n.localize("SVNSEA2E.Roll"),
              callback: (C) => de({
                rolldata: r,
                actor: a,
                data: n,
                form: C[0].querySelector("form"),
                template: "systems/svnsea2e/templates/chats/roll-card.hbs",
                title: c
              })
            }
          }
        },
        {}
      ).render(!0);
    });
  }

  /* -------------------------------------------- */
  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onVillainRoll(e) {
    e.preventDefault();
    const s = e.currentTarget.dataset, a = this.actor, n = this.actor.system;
    let r = {
      threshold: 10,
      explode: (n.dwounds && n.dwounds.value >= 3) ? !0 : !1,
      reroll: !1,
      skilldice: 0
    };
    const o = "systems/svnsea2e/templates/chats/trait-roll-dialog.hbs", d = n.dwounds.value >= 1 ? 1 : 0, f = {
      data: n,
      traitmax: n.traits[s.label].value,
      initialBonusDice: d
    }, y = await renderTemplate(o, f), c = game.i18n.format("SVNSEA2E.TraitRollTitle", {
      trait: CONFIG.SVNSEA2E.traits[s.label]
    });
    return new Promise(() => {
      new Dialog(
        {
          title: c,
          content: y,
          buttons: {
            roll: {
              icon: '<img src="systems/svnsea2e/icons/d10.svg" class="d10">',
              label: game.i18n.localize("SVNSEA2E.Roll"),
              callback: (C) => de({
                rolldata: r,
                actor: a,
                data: n,
                form: C[0].querySelector("form"),
                template: "systems/svnsea2e/templates/chats/roll-card.hbs",
                title: c
              })
            }
          }
        },
        {}
      ).render(!0);
    });
  }

  /* -------------------------------------------- */

}
class Rt extends M {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "actor", "brute"],
      template: "systems/svnsea2e/templates/actors/brute.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentS: "ability"
        }
      ]
    });
  }

  // NUEVO: Le enseñamos a la hoja de Brutos a recolectar Ventajas y Estilos
  _prepareBruteItems(e, t) {
    t.advantages = m(e, "advantage");
    t.duelstyles = m(e, "duelstyle");
  }
}
class Ht extends M {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "actor"],
      template: "systems/svnsea2e/templates/actors/dangerpts.hbs",
      tabs: [
        {
          contentSelector: ".sheet-body"
        }
      ],
      width: 450,
      height: 250
    });
  }
  /**
   * Activate event listeners using the prepared sheet HTML
   *
   * @param {JQuery} html The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(e) {
    super.activateListeners(e),
      e.find(".dpminus").on("click", this._decreaseDP.bind(this, 1)),
      e.find(".dpmminus").on("click", this._decreaseDP.bind(this, 2)),
      e.find(".dpplus").on("click", this._increaseDP.bind(this, 1)),
      e.find(".dppplus").on("click", this._increaseDP.bind(this, 2));
  }
  _decreaseDP(e, t) {
    let s = 0;
    this.actor.system.points > e && (s = parseInt(this.actor.system.points) - parseInt(e)), this.actor.update({
      system: {
        points: s
      }
    }).then(this.render(!1));
  }
  _increaseDP(e, t) {
    const s = parseInt(this.actor.system.points) + parseInt(e);
    this.actor.update({
      system: {
        points: s
      }
    }).then(this.render(!1));
  }
}
class HeroSheet extends M {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "actor", "hero"],
      template: "systems/svnsea2e/templates/actors/hero.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "traits"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareHeroItems(e, t) {
    t.skills = Ee(e.document.system, CONFIG), t.advantages = m(e, "advantage"), t.backgrounds = m(e, "background"), t.sorcery = m(e, "sorcery"), t.secretsocieties = m(e, "secretsociety"), t.stories = m(e, "story"), t.duelstyles = m(e, "duelstyle"), t.artifacts = m(e, "artifact"), t.virtues = m(e, "virtue"), t.hubriss = m(e, "hubris");
  }
}
class Gt extends M {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "actor", "monster"],
      template: "systems/svnsea2e/templates/actors/monster.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "features"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actor The actor data to prepare.
   * @param {Object} sheetData The sheet to prepare.
   *
   * @return {undefined}
   */
  _prepareMonsterItems(e, t) {
    t.fear = e.document.system.fear, t.monsterqualities = m(e, "monsterquality"), t.virtues = m(e, "virtue"), t.hubriss = m(e, "hubris");
  }
}
class jt extends M {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "actor", "pc"],
      template: "systems/svnsea2e/templates/actors/playercharacter.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "traits"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(e, t) {
    t.skills = Ee(e.document.system, CONFIG), t.advantages = m(e, "advantage"), t.backgrounds = m(e, "background"), t.sorcery = m(e, "sorcery"), t.secretsocieties = m(e, "secretsociety"), t.stories = m(e, "story"), t.duelstyles = m(e, "duelstyle"), t.artifacts = m(e, "artifact"), t.virtues = m(e, "virtue"), t.hubriss = m(e, "hubris");
  }
}
class Pt extends M {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "actor", "ship"],
      template: "systems/svnsea2e/templates/actors/ship.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "roster"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareShipItems(e, t) {
    const s = e.document.system;
    t.adventures = m(e, "shipadventure"), t.backgrounds = m(e, "shipbackground"), t.origin = s.origin, t.class = s.class, t.crewstatus = s.crewstatus, t.cargo = s.cargo;
  }
  /**
   * Process any flags that the actor might have that would affect the sheet .
   *
   * @param {Obejct} data The data object to update with any flag data.
   * @param {Object} flags The set of flags for the Actor
   */
  _processFlags(e, t, s) {
    let a = t.svnsea2e;
    a || (a = {}), a.shipsCrew || (a.shipsCrew = {}), a.shipsCrew.members || (a.shipsCrew.members = []);
    const n = {
      captain: {
        label: game.i18n.localize("SVNSEA2E.Captain"),
        cssClass: "captain",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "captain"
        }
      },
      firstmate: {
        label: game.i18n.localize("SVNSEA2E.FirstMate"),
        cssClass: "firstmate",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "firstmate"
        }
      },
      quartermaster: {
        label: game.i18n.localize("SVNSEA2E.QuaterMaster"),
        cssClass: "quartermaster",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "quartermaster"
        }
      },
      accountant: {
        label: game.i18n.localize("SVNSEA2E.Accountant"),
        cssClass: "accountant",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "accountant"
        }
      },
      boatswain: {
        label: game.i18n.localize("SVNSEA2E.Boatswain"),
        cssClass: "boatswain",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "boatswain"
        }
      },
      shipsmaster: {
        label: game.i18n.localize("SVNSEA2E.ShipsMaster"),
        cssClass: "shipsmaster",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "shipsmaster"
        }
      },
      captaintops: {
        label: game.i18n.localize("SVNSEA2E.CaptainTops"),
        cssClass: "captaintops",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "captaintops"
        }
      },
      surgeon: {
        label: game.i18n.localize("SVNSEA2E.Surgeon"),
        cssClass: "surgeon",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "surgeon"
        }
      },
      cook: {
        label: game.i18n.localize("SVNSEA2E.Cook"),
        cssClass: "cook",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "cook"
        }
      },
      mastergunner: {
        label: game.i18n.localize("SVNSEA2E.MasterGunner"),
        cssClass: "mastergunner",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "mastergunner"
        }
      },
      mastermariner: {
        label: game.i18n.localize("SVNSEA2E.MasterMariner"),
        cssClass: "mastermariner",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "mastermariner"
        }
      },
      midshipmen: {
        label: game.i18n.localize("SVNSEA2E.Midshipmen"),
        cssClass: "midshipmen",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "midshipmen"
        }
      },
      powdermonkey: {
        label: game.i18n.localize("SVNSEA2E.PowderMonkey"),
        cssClass: "powdermonkey",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "powdermonkey"
        }
      },
      ableseaman: {
        label: game.i18n.localize("SVNSEA2E.AbleSeaman"),
        cssClass: "ableseaman",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "ableseaman"
        }
      },
      seaman: {
        label: game.i18n.localize("SVNSEA2E.Seaman"),
        cssClass: "seaman",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "seaman"
        }
      }
    }, [
      r,
      o,
      d,
      f,
      y,
      c,
      C,
      w,
      b,
      v,
      O,
      L,
      R,
      H,
      T
    ] = a.shipsCrew.members.reduce(
      (S, G) => {
        const E = game.actors.get(G);
        if (!E)
          return S;
        const A = E.getFlag("svnsea2e", "crewMember") || null;
        return A && (A.role === "ableseaman" ? S[0].push(E) : A.role === "accountant" ? S[1].push(E) : A.role === "boatswain" ? S[2].push(E) : A.role === "captain" ? S[3].push(E) : A.role === "captaintops" ? S[4].push(E) : A.role === "cook" ? S[5].push(E) : A.role === "firstmate" ? S[6].push(E) : A.role === "mastergunner" ? S[7].push(E) : A.role === "mastermariner" ? S[8].push(E) : A.role === "midshipmen" ? S[9].push(E) : A.role === "powdermonkey" ? S[10].push(E) : A.role === "quartermaster" ? S[11].push(E) : A.role === "seaman" ? S[12].push(E) : A.role === "shipsmaster" ? S[13].push(E) : A.role === "surgeon" && S[14].push(E)), S;
      },
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
    );
    n.ableseaman.actors = r, n.accountant.actors = o, n.boatswain.actors = d, n.captain.actors = f, n.captaintops.actors = y, n.cook.actors = c, n.firstmate.actors = C, n.mastergunner.actors = w, n.mastermariner.actors = b, n.midshipmen.actors = v, n.powdermonkey.actors = O, n.quartermaster.actors = L, n.seaman.actors = R, n.shipsmaster.actors = H, n.surgeon.actors = T, s.crew = Object.values(n);
  }
  /**
   * Activate event listeners using the prepared sheet HTML
   *
   * @param {HTML} html The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(e) {
    if (super.activateListeners(e), !this.options.editable)
      return;
    e.find(".roster .item-delete").click(this._onRemoveFromCrew.bind(this));
    const t = (s) => this._onDragCrewStart(s);
    e.find(".roster li.item").each((s, a) => {
      a.setAttribute("draggable", !0), a.addEventListener("dragstart", t, !1);
    }), e.find(".roster .items-list").each((s, a) => {
      a.addEventListener("dragover", this._onCrewDragOver.bind(this), !1);
    }), e.find(".roster li.item-header").each((s, a) => {
      a.addEventListener("dragenter", this._onCrewDragEnter, !1), a.addEventListener("dragleave", this._onCrewDragLeave, !1);
    });
  }
  /** @override */
  async _onDrop(e) {
    e.preventDefault();
    let t;
    try {
      t = JSON.parse(e.dataTransfer.getData("text/plain"));
    } catch {
      return !1;
    }
    if (!t)
      return !1;
    if (t.type === "Item")
      return this._onDropItem(e, t);
    if (t.type === "Actor")
      return this._onCrewDrop(e, t);
  }
  /**
   * Handles drop events for the Crew list
   *
   * @param {Event}  event The originating drop event
   * @param {object} data  The data transfer object.
   */
  async _onCrewDrop(e, t) {
    if (e.preventDefault(), $(e.target).css("background", ""), !t.uuid)
      return !1;
    const s = this.actor.getFlag("svnsea2e", "shipsCrew");
    let a;
    s ? a = foundry.utils.duplicate(s) : a = {
      members: []
    };
    const n = await Actor.implementation.fromDropData(t);
    if (!n)
      return !1;
    a.members ? a.members.includes(n.id) || a.members.push(n.id) : a.members = [n.id];
    const r = e.target.dataset.role;
    return await n.setCrewMemberRole(this.actor.id, r), this.actor.update({
      "flags.svnsea2e.shipsCrew": a
    }).then(this.render(!1)), !1;
  }
  /**
   * Handles dragenter for the crews tab
   * @param {Event} event The originating dragenter event
   */
  _onCrewDragEnter(e) {
    $(e.target).css("background", "rgba(0,0,0,0.3)");
  }
  /**
   * Handles dragleave for the crews tab
   * @param {Event} event The originating dragleave event
   */
  _onCrewDragLeave(e) {
    $(e.target).css("background", "");
  }
  /**
   * Handle dragging crew members on the sheet.
   *
   * @param {Event} event Originating dragstart event
   */
  _onDragCrewStart(e) {
    const t = e.currentTarget.dataset.actorId, s = game.actors.get(t), a = {
      type: "Actor",
      id: s.id,
      data: s.data
    };
    this.actor.isToken && (a.tokenId = t), e.dataTransfer.setData("text/plain", JSON.stringify(a));
  }
  /**
   * Handles ondragover for crew drag-n-drop
   *
   * @param {Event} event Orgininating ondragover event
   */
  _onCrewDragOver(e) {
    e.preventDefault(), e.dataTransfer.dropEffect = "move";
  }
  /**
   * Handles updating this crew's role on the ship.
   *
   * @param {Event} event The originating click event
   */
  async _onChangeCrewRole(e) {
    e.preventDefault();
    const t = e.currentTarget.parentElement.dataset.actorId;
    await game.actors.get(t).setCrewMemberRole(this.actor.id);
  }
  /**
   * Remove an actor from the crew.
   *
   * @param {Event} event The originating click event
   */
  async _onRemoveFromCrew(e) {
    e.preventDefault();
    const t = $(e.currentTarget).parents(".item").data("actorId"), s = game.actors.get(t);
    await s.removeFromCrew();
    const a = this.actor.getFlag("svnsea2e", "shipsCrew");
    if (!a)
      return;
    const n = a.members.filter((r) => r !== s.id);
    await this.actor.update({
      "flags.svnsea2e.shipsCrew.members": n
    });
  }
}
class qt extends M {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "actor", "villain"],
      template: "systems/svnsea2e/templates/actors/villain.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "traits"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareVillainItems(e, t) {
    t.villainy = e.document.system.villainy, t.advantages = m(e, "advantage"), t.artifacts = m(e, "artifact"), t.sorcery = m(e, "sorcery"), t.schemes = m(e, "scheme"), t.virtues = m(e, "virtue"), t.hubriss = m(e, "hubris"), t.monsterqualities = m(e, "monsterquality"); t.duelstyles = m(e, "duelstyle");
  }
}
class Se extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
    const e = this.system;
    this.type === p.SCHEME ? this._prepareSchemeData(e) : e.type === p.ADVANTAGE && this._prepareAdvantageData(e);
  }
  /**
   * Prepare an object of chat data used to display a card for the Item in the chat log
   * @param {Object} htmlOptions    Options used by the TextEditor.enrichHTML function
   * @return {Object}               An object of chat data to render
   */
  async getChatData(e) {
    const t = foundry.utils.duplicate(this.system);
    t.metadatahtml = "", t.description = await TextEditor.enrichHTML(t.description, {
      htmlOptions: e,
      async: !0
    });
    const s = this[`_${this.type}ChatData`];
    return s && await s.bind(this)(t, e), t;
  }
  /**
   * Prepare chat data for an advantage
   * @param {Object} data    Options used by the TextEditor.enrichHTML function
   * @return {Object}               An object of chat data to render
   */
  _advantageChatData(e, t) {
    const s = e.cost.normal === 1 ? game.i18n.localize("SVNSEA2E.Point") : game.i18n.localize("SVNSEA2E.Points");
    return e.metadatahtml = `<ul class="details-list"><li class="tag">${e.cost.normal} ${s}</li>`, e.metadatahtml += e.cost.specreq ? '<li class="tag">' + e.cost.specreq + "</li>" : "", e.metadatahtml += e.knack ? '<li class="tag">' + game.i18n.localize("SVNSEA2E.Knack") + "</li>" : "", e.metadatahtml += e.innate ? '<li class="tag">' + game.i18n.localize("SVNSEA2E.Innate") + "</li>" : "", e.metadatahtml += "</ul>", e;
  }
  _artifactChatData(e, t) {
    const s = e.artifactType === "none" ? "" : CONFIG.SVNSEA2E.artifactTypes[e.artifactType];
    return e.metadatahtml = `<ul class="details-list"><li class="tag">${s}</li></ul>`, e;
  }
  _backgroundChatData(e, t) {
    let s = "";
    e.skills.forEach(
      (n) => s += `<li class="tag">${CONFIG.SVNSEA2E.skills[n]}</li>`
    );
    let a = "";
    for (let n = 0; n < e.advantages.length; n++)
      a += `<li class="tag">${e.advantages[n]}</li>`;
    return e.metadatahtml = `<h5>${game.i18n.localize("SVNSEA2E.Quirk")}</h5>
    <p>${e.quirk}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Skills")}</h5>
    <ul class="skills-list">
    ${s}
    </ul>
    <h5>${game.i18n.localize("SVNSEA2E.Advantages")}</h5>
    <ul class="advantages-list">
    ${a}
    </ul>
`, e;
  }
  async _duelstyleChatData(e, t) {
    // Some compendium styles keep their bonus in the description: the chat card shows that instead of an empty bonus.
    if (!e.bonus?.replace(/<[^>]*>/g, "").trim()) {
      e.bonus = e.description;
      return e;
    }
    e.bonus = await TextEditor.enrichHTML(e.bonus, { async: !0 });
    return e.metadatahtml = `
    <h5>${game.i18n.format("SVNSEA2E.Bonus")}</h5>
    <p>${e.bonus}</p>
      `, e;
  }
  _schemeChatData(e, t) {
    return e.metadatahtml = "<p>" + game.i18n.format("SVNSEA2E.ChatInfluence", {
      influence: e.influence.toString()
    }) + "</p>", e;
  }
  _secretsocietyChatData(e, t) {
    return e.metadatahtml = `
    <h5>${game.i18n.localize("SVNSEA2E.Concern")}</h5>
    <p>${e.concern}</p>
    <h5>${game.i18n.localize("SVNSEA2E.EarnFavor")}</h5>
    <p>${e.earnfavor}</p>
    <h5>${game.i18n.localize("SVNSEA2E.UseFavor")}</h5>
    <p>${e.callupon}</p>
`, e;
  }
  _sorceryChatData(e, t) {
    return e.metadatahtml = `
    <ul class="tag-list">
    <li class="tag">${CONFIG.SVNSEA2E.sorceryTypes[e.sorctype]}</li>
    <li class="tag">${CONFIG.SVNSEA2E.sorcerySubcats[e.sorcsubcat]} ${CONFIG.SVNSEA2E.sorceryCats[e.sorccat]}</li>
    <li class="tag">${game.i18n.localize("SVNSEA2E.Duration")}: ${CONFIG.SVNSEA2E.durations[e.sorcdur]}</li>
    </ul>
`, e;
  }
  _storyChatData(e, t) {
    return e.metadatahtml = `
    <h5>${game.i18n.localize("SVNSEA2E.Status")}</h5>
    <p>${CONFIG.SVNSEA2E.storyStatuses[e.status]}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Endings")}</h5>
    <p>${e.endings}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Steps")}</h5>
    <p>${e.steps}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Reward")}</h5>
    <p>${e.reward}</p>
`, e;
  }
  _validateMinMaxData(e, t, s) {
    return e > s ? s : e < t ? t : e;
  }
  /**
   * Prepare advantage type specific data
   */
  _prepareAdvantageData(e) {
    e.cost.norm = this._validateMinMaxData(
      e.cost.norm,
      e.cost.min,
      e.cost.max
    );
  }
  /**
   * Prepare scheme type specific data
   */
  _prepareSchemeData(e) {
    e.influence.value = this._validateMinMaxData(
      e.influence.value,
      e.influence.min,
      e.influence.max
    );
  }

  async ItemThrow() {
    const itemData = await this.getChatData();

    // Mapeo de plantillas (ajustado a las rutas de tu sistema)
    const templates = {
      "advantage": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "background": 'systems/svnsea2e/templates/items/parts/skill-throw-background.hbs',
      "sorcery": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "secretsociety": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "story": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "duelstyle": 'systems/svnsea2e/templates/items/parts/skill-throw-duelstyle.hbs',
      "artifact": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "virtue": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "hubris": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "scheme": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs',
      "monsterquality": 'systems/svnsea2e/templates/items/parts/skill-throw.hbs'
    };

    const template = templates[this.type] || templates["advantage"];

    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: await renderTemplate(template, {
        ...itemData,
        name: this.name,
        img: this.img,
        item: this // Para compatibilidad con {{item.name}} en tus .hbs [cite: 5]
      }),
      type: CONST.CHAT_MESSAGE_STYLES.OTHER,
      roll: true
    };

    return ChatMessage.create(chatData);
  }
}

class zt extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "skill-selector",
      classes: ["svnsea2e"],
      title: game.i18n.localize("SVNSEA2E.BackgroundSkillSelect"),
      template: "systems/svnsea2e/templates/apps/skill-selector.hbs",
      width: 320,
      height: "auto",
      choices: {},
      minimum: 0,
      maximum: null
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData() {
    const e = this.object.system.skills, t = foundry.utils.duplicate(this.options.choices);
    for (const [s, a] of Object.entries(t))
      t[s] = {
        label: a,
        chosen: e ? e.includes(s) : !1
      };
    return {
      choices: t
    };
  }
  /* -------------------------------------------- */
  /** @override */
  _updateObject(e, t) {
    const s = {}, a = [];
    for (const [n, r] of Object.entries(t))
      r && a.push(n);
    if (s["system.skills"] = a, this.options.minimum && a.length < this.options.minimum)
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          min: this.options.minimum
        })
      );
    if (this.options.maximum && a.length > this.options.maximum)
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          max: this.options.maximum
        })
      );
    this.object.update(s);
  }
}
class Bt extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "advantage-selector",
      classes: ["svnsea2e"],
      title: game.i18n.localize("SVNSEA2E.BackgroundAdvantageSelect"),
      template: "systems/svnsea2e/templates/apps/advantage-selector.hbs",
      width: 320,
      height: "auto",
      choices: {},
      minimum: 0,
      maximum: null
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData() {
    const e = this.object.system.advantages, t = foundry.utils.duplicate(this.options.choices);
    for (const [s, a] of Object.entries(t))
      t[s] = {
        label: a,
        chosen: e ? e.includes(a) : !1
      };
    return {
      choices: t
    };
  }
  /* -------------------------------------------- */
  /** @override */
  _updateObject(e, t) {
    const s = {}, a = [];
    for (const [n, r] of Object.entries(t))
      r && a.push(n);
    if (s["system.advantages"] = a, this.options.minimum && a.length < this.options.minimum)
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          min: this.options.minimum
        })
      );
    if (this.options.maximum && a.length > this.options.maximum)
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          max: this.options.maximum
        })
      );
    this.object.update(s);
  }
}
class I extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["svnsea2e", "sheet", "item"],
      width: 600,
      height: 700
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData(e) {
    const s = super.getData(e).document, a = s.system, { isOwner: n } = this.document, r = {
      owner: n,
      itemType: h.itemTypes[s.type],
      options: this.options,
      editable: this.isEditable,
      cssClass: n ? "editable" : "locked",
      config: CONFIG.SVNSEA2E,
      dtypes: ["String", "Number", "Boolean"],
      name: s.name,
      img: s.img,
      type: s.type,
      infosource: a.infosource,
      description: a.description,
      quirk: a.quirk
    };
    return s.type === "background" ? (r.selectedskills = a.skills.map(
      (o) => CONFIG.SVNSEA2E.skills[o]
    ), r.selectedadvantages = a.advantages, r.nation = a.nation) : s.type === "advantage" ? (r.normalCost = a.cost.normal, r.reducedCost = a.cost.reducecost, r.knack = a.knack, r.innate = a.innate) : s.type === "duelstyle" ? r.bonus = a.bonus : s.type === "scheme" ? r.influence = a.influence : s.type === "secretsociety" ? (r.concern = a.concern, r.favor = a.favor, r.earnFavor = a.earnfavor, r.callUpon = a.callupon) : s.type === "sorcery" ? (r.sorceryType = a.sorctype, r.sorceryDuration = a.sorcdur, r.sorceryCategory = a.sorccat, r.sorcerySubCategory = a.sorcsubcat) : s.type === "story" ? (r.storyStatus = a.status, r.reward = a.reward, r.endings = a.endings, r.steps = a.steps) : s.type === "artifact" && (r.artifactType = a.artifactType), r;
  }
  /* -------------------------------------------- */
  /** @override */
  setPosition(e = {}) {
    const t = super.setPosition(e), s = this.element.find(".sheet-body"), a = t.height - 192;
    return s.css("height", a), t;
  }
  /* -------------------------------------------- */
  /** @override */
  activateListeners(e) {
    super.activateListeners(e), e.find(".skill-selector").on("click", this._onSkillSelector.bind(this)), e.find(".advantage-selector").on("click", this._onAdvantageSelector.bind(this));
  }
  /* -------------------------------------------- */
  _advCompare(e, t) {
    for (const s in e)
      if (e[s] === t)
        return !0;
    return !1;
  }
  async _getAllAdvantages() {
    const e = [];
    
    // PASO 1: Buscar en los Items sueltos del mundo
    // CORRECCIÓN: Usar .contents en lugar de .directory.documents
    const t = game.items.contents; 
    
    // Verificamos que 't' exista antes de intentar leer su .length
    if (t) {
      for (let r = 0; r < t.length; r++) {
        if (t[r].type === "advantage") {
          e.push(t[r].name);
        }
      }
    }
      
    // PASO 2: Buscar en los Compendios (Packs)
    const s = Array.from(game.packs); 
    const a = foundry.utils.duplicate(e);
    
    for (var n = 0; n < s.length; n++) {
      const r = s[n];
      if (r.metadata.type === "Item" || r.metadata.entity === "Item") {
        const o = await r.getIndex();
        for (let d = 0; d < o.length; d++) {
          const doc = await r.getDocument(o[d]._id);
          if (doc && doc.type === "advantage" && !a.includes(doc.name)) {
            e.push(doc.name);
          }
        }
      }
    }
    
    return e;
  }
  /* -------------------------------------------- */
  /**
   * Handle spawning the skillSelector application which allows a checkbox of multiple skill options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onSkillSelector(e) {
    e.preventDefault();
    const t = e.currentTarget, s = {
      title: game.i18n.localize("SVNSEA2E.Skills"),
      choices: CONFIG.SVNSEA2E[t.dataset.options]
    };
    new zt(this.item, s).render(!0);
  }
  /* -------------------------------------------- */
  /**
   * Handle spawning the advantageSelector application which allows a checkbox of multiple advantage options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  async _onAdvantageSelector(e) {
    e.preventDefault();
    const t = {
      title: game.i18n.localize("SVNSEA2E.Advantages"),
      choices: await this._getAllAdvantages()
    };
    new Bt(this.item, t).render(!0);
  }
}
class Ut extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/advantage.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class Yt extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/artifact.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class Wt extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/background.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class Kt extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/duelstyle.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class Qt extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/monsterquality.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class Jt extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/scheme.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class Xt extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/secretsociety.hbs",
      width: 800,
      height: 700,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class Zt extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/shipadventure.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class es extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/shipbackground.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class ts extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/sorcery.hbs",
      width: 750,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class ss extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/story.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
function as() {
  // Listener original para el botón de iniciativa
  $(document).on("click", ".initiative-tracker-add", is);

  // NUEVO: Listener manual para nuestro acordeón de dados
  $(document).on("click", ".svnsea-dice-total", function (e) {
    e.preventDefault();
    // Busca la caja de detalles justo debajo del título y la desliza
    $(this).siblings(".svnsea-dice-tooltip").slideToggle(200);
  });
}
function is(i) {
  i.stopPropagation(); 
  i.preventDefault();
  console.log("7th Sea 2E | Add to initiative tracker");
  const e = i.currentTarget.dataset;
  Q(e.actor, e.raise);
}
class ns extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/arcana.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
class rs extends I {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/svnsea2e/templates/items/arcana.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
}
const fe = async function () {
  ui.notifications.info(
    `Applying 7th Sea 2E System Migration for version ${game.system.version}. Please be patient and do not close your game or shut down your server.`,
    {
      permanent: !0
    }
  );
  for (const e of game.actors.values())
    try {
      const t = Z(e);
      foundry.utils.isEmpty(t) || (console.log(`Migrating Actor entity ${e.name}`), await e.update(t, {
        enforceTypes: !1
      }));
    } catch (t) {
      console.error(t);
    }
  for (const e of game.items.values())
    try {
      const t = ee(e);
      foundry.utils.isEmpty(t) || (console.log(`Migrating Item entity ${e.name}`), await e.update(t, {
        enforceTypes: !1
      }));
    } catch (t) {
      console.error(t);
    }
  const i = game.packs.filter((e) => e.metadata.package === "world" && ["Actor", "Item", "Scene"].includes(e.metadata.entity));
  for (let e of i)
    await ye(e);
  game.settings.set("svnsea2e", "systemMigrationVersion", game.system.version), ui.notifications.info(
    `7th Sea 2E System Migration to version ${game.system.version} completed!`,
    {
      permanent: !0
    }
  );
}, ye = async function (i) {
  const e = i.metadata.entity;
  if (["Actor", "Item", "Scene"].includes(e)) {
    await i.migrate();
    for (let t of i)
      try {
        let s = null;
        e === "Item" ? s = ee(t.data) : e === "Actor" ? s = Z(t.data) : e === "Scene" && (s = Ae(t.data)), foundry.utils.isEmpty(s) || (expandObject(s), s._id = t._id, await i.updateEntity(s), console.log(
          `Migrated ${e} entity ${t.name} in Compendium ${i.collection}`
        ));
      } catch (s) {
        console.error(s);
      }
    console.log(
      `Migrated all ${e} entities from Compendium ${i.collection}`
    );
  }
}, Z = function (i) {
  const e = {};
  return i.type === l.PLAYER && i.system.wealth == null && (e.wealth = 0), i.type !== l.DANGERPOINTS && i.type !== l.BRUTE && i.system.wounds.max != 20 && (e["wounds.max"] = 20), (i.type === l.PLAYER || i.type === l.HERO || i.type === l.VILLAIN) && i.system.nation === "rahuris" && (e.nation = "rahuri"), (i.type === l.VILLAIN || i.type === l.MONSTER) && i.system.traits.strength.max != 10 && (e["traits.strength.max"] = 20, e["traits.influence.max"] = 20, e["traits.influence.min"] = 0), i.type === l.BRUTE && (e["traits.strength.max"] = 20), i.type === l.DANGERPOINTS && i.system.points < 5 && (e.points = 5), i.type === l.MONSTER && i.system.fear.max != 5 && (e["fear.value"] = 0, e["fear.min"] = 0, e["fear.max"] = 5), i.type === l.SHIP && i.system.crewstatus == null && (i.system.crewstatus == null && (e.crewstatus = ""), aactor.system.wealth == null && (e.wealth = "0")), (i.type === l.PLAYER || i.type === l.HERO || i.type === l.VILLAIN) && i.system.arcana && (Ne(i), be(i), i.update({ data: { arcana: null } })), e;
}, ee = function (i) {
  const e = {};
  return i.type === "secretsociety" && typeof i.system.favor > "u" && (e.favor = 0), i.type === "story" && typeof i.system.status > "u" && (e.status = ""), e;
}, Ae = function (i) {
  return {};
}, Ne = function (i) {
  const e = i.system.arcana.virtue;
  if (e.name) {
    const t = {
      name: e.name,
      img: "systems/svnsea2e/icons/virtue.jpg",
      type: "virtue",
      data: {
        description: e.description
      }
    };
    i.document.createEmbeddedDocuments("Item", [t]);
  }
}, be = function (i) {
  const e = i.system.arcana.hubris;
  if (e.name) {
    const t = {
      name: e.name,
      img: "systems/svnsea2e/icons/hubris.jpg",
      type: "hubris",
      data: {
        description: e.description
      }
    };
    i.document.createEmbeddedDocuments("Item", [t]);
  }
}, os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  migrateActorData: Z,
  migrateCompendium: ye,
  migrateHubris: be,
  migrateItemData: ee,
  migrateSceneData: Ae,
  migrateVirtue: Ne,
  migrateWorld: fe
}, Symbol.toStringTag, { value: "Module" })), ls = "system.svnsea2e", cs = {
  characterChange: "characterChanged"
};
/** Refresh the toolbox when one of its actors changes (the hook runs on every client). */
function us(actor) {
  const toolbox = game.svnsea2e.toolbox;
  if (actor && toolbox.shows(actor)) toolbox.render();
}

/**
 * Values the toolbox can show, as paths inside actor.system. An actor type without the value leaves its cell empty.
 * `max` is the path of the upper bound; `fixed` columns are always shown (danger points actors have nothing else).
 */
const TOOLBOX_COLUMNS = [
  { key: "raises", path: "initiative", icon: "fa-star-of-life", label: "SVNSEA2E.Initiative" },
  { key: "heropts", path: "heropts", icon: "fa-sun", label: "SVNSEA2E.HeroPoints" },
  { key: "wounds", path: "wounds.value", max: "wounds.max", icon: "fa-heart", label: "SVNSEA2E.Wounds" },
  { key: "dwounds", path: "dwounds.value", max: "dwounds.max", icon: "fa-heart-crack", label: "SVNSEA2E.DramaWounds" },
  { key: "points", path: "points", icon: "fa-skull", label: "SVNSEA2E.DangerPoints", fixed: true }
];

const toolboxClamp = (value, min, max) => Math.min(Math.max(Number(value) || 0, min), max);

/**
 * The update that sets the wounds of an actor to `value`. Like the hearts of the sheet: marking wounds also marks the
 * dramatic wounds they reach (every 5 wounds, or Strength + 1 for villains and monsters), never removes any.
 */
function toolboxWoundUpdate(actor, value) {
  const system = actor.system;
  const wounds = toolboxClamp(value, 0, system.wounds.max);
  if (!system.dwounds) return { "system.wounds.value": wounds };
  const perDramatic = [l.VILLAIN, l.MONSTER].includes(actor.type) ? (parseInt(system.traits.strength.value) || 0) + 1 : 5;
  const dwounds = Math.max(system.dwounds.value, Math.min(Math.trunc(wounds / perDramatic), system.dwounds.max));
  return { "system.wounds.value": wounds, "system.dwounds.value": dwounds };
}

/**
 * GM toolbox: a small window listing some values of the actors dropped on it, with +/- buttons to change them.
 * The list and the chosen columns are remembered between sessions.
 */
class ds extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
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
      adjust: ds.#onAdjust,
      configure: ds.#onConfigure,
      openSheet: ds.#onOpenSheet,
      removeActor: ds.#onRemoveActor
    }
  };

  static PARTS = {
    items: { template: "systems/svnsea2e/templates/toolbox/toolbox.hbs" }
  };

  /** UUIDs of the actors shown in the toolbox. */
  get actorUuids() {
    return game.settings.get("svnsea2e", "toolboxActors") ?? [];
  }

  async _setActorUuids(uuids) {
    await game.settings.set("svnsea2e", "toolboxActors", uuids);
    this.render();
  }

  /** Keys of the optional columns the GM chose to show. */
  get columnKeys() {
    const chosen = game.settings.get("svnsea2e", "toolboxColumns") ?? {};
    return TOOLBOX_COLUMNS.filter((column) => column.fixed || chosen[column.key] !== false).map((column) => column.key);
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
    const getProperty = foundry.utils.getProperty;
    const actors = this.actorUuids.map((uuid) => fromUuidSync(uuid)).filter((actor) => actor);
    // Only the chosen columns that at least one of the actors has.
    const keys = this.columnKeys;
    const columns = TOOLBOX_COLUMNS.filter(
      (column) => keys.includes(column.key) && actors.some((actor) => getProperty(actor.system, column.path) !== undefined)
    );
    const rows = actors.map((actor) => ({
      uuid: actor.uuid,
      name: actor.name,
      cells: columns.map((column) => {
        const value = getProperty(actor.system, column.path);
        if (value === undefined) return null;
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
    const getProperty = foundry.utils.getProperty;
    const actor = fromUuidSync(target.closest("[data-uuid]").dataset.uuid);
    const column = TOOLBOX_COLUMNS.find((c) => c.key === target.dataset.key);
    if (!actor || !column) return;
    const system = actor.system;
    const delta = Number(target.dataset.delta);
    const max = column.max ? getProperty(system, column.max) : Infinity;
    const value = toolboxClamp(getProperty(system, column.path) + delta, 0, max);

    // Raises are also the initiative of the actor's combatants.
    if (column.key === "raises") return Q(actor, value);
    if (column.key === "wounds") return actor.update(toolboxWoundUpdate(actor, value));
    await actor.update({ [`system.${column.path}`]: value });
  }

  /** Choose the columns to show. */
  static async #onConfigure() {
    const keys = this.columnKeys;
    const content = TOOLBOX_COLUMNS.filter((column) => !column.fixed)
      .map(
        (column) => `<label class="checkbox">
          <input type="checkbox" name="${column.key}" ${keys.includes(column.key) ? "checked" : ""} />
          <i class="fa-solid ${column.icon}"></i> ${game.i18n.localize(column.label)}
        </label>`
      )
      .join("");
    const chosen = await foundry.applications.api.DialogV2.wait({
      window: { title: "SVNSEA2E.ToolboxConfigure" },
      classes: ["svnsea2e", "toolbox-config"],
      content: `<p>${game.i18n.localize("SVNSEA2E.ToolboxColumns")}</p><div class="toolbox-columns">${content}</div>`,
      buttons: [
        {
          action: "save",
          label: game.i18n.localize("SVNSEA2E.Save"),
          icon: "fa-solid fa-floppy-disk",
          default: true,
          callback: (event, button) =>
            Object.fromEntries(TOOLBOX_COLUMNS.filter((c) => !c.fixed).map((c) => [c.key, button.form.elements[c.key].checked]))
        }
      ],
      rejectClose: false
    });
    if (!chosen) return;
    await game.settings.set("svnsea2e", "toolboxColumns", chosen);
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
Hooks.once("init", async function () {
  console.log(`7th Sea 2E | Initializing 7th Sea Second Edition System
    ${h.ASCII}`), game.svnsea2e = {
      applications: {
        SvnSea2EActor: ce,
        SvnSea2EItem: Se
      },
      config: h,
      migrations: os,
      toolbox: new ds()
    }, CONFIG.Combat.initiative = {
      // The initiative is the raises of the round, set by the rolls; the formula is never rolled.
      formula: "1d20",
      decimals: 0
    }, CONFIG.Combat.documentClass = SvnSea2ECombat, CONFIG.Combatant.documentClass = SvnSea2ECombatant, CONFIG.SVNSEA2E = h, CONFIG.SVNSEA2E.natTypes = foundry.utils.duplicate(h.nations), CONFIG.SVNSEA2E.natTypes.gisles = "SVNSEA2E.RegionGlamourIsles", CONFIG.Actor.documentClass = ce, CONFIG.Item.documentClass = Se, CONFIG.Actor.dataModels[l.BRUTE] = Te, CONFIG.Actor.dataModels[l.DANGERPOINTS] = xe, CONFIG.Actor.dataModels[l.HERO] = He, CONFIG.Actor.dataModels[l.MONSTER] = Ge, CONFIG.Actor.dataModels[l.PLAYER] = qe, CONFIG.Actor.dataModels[l.SHIP] = Ye, CONFIG.Actor.dataModels[l.VILLAIN] = Ke, CONFIG.Item.dataModels[p.ADVANTAGE] = et, CONFIG.Item.dataModels[p.ARTIFACT] = at, CONFIG.Item.dataModels[p.BACKGROUND] = rt, CONFIG.Item.dataModels[p.DUEL_STYLE] = ct, CONFIG.Item.dataModels[p.MONSTER_QUALITY] = dt, CONFIG.Item.dataModels[p.SCHEME] = St, CONFIG.Item.dataModels[p.SECRET_SOCIETY] = Vt, CONFIG.Item.dataModels[p.SHIP_ADVENTURE] = gt, CONFIG.Item.dataModels[p.SHIP_BACKGROUND] = ft, CONFIG.Item.dataModels[p.VIRTUE] = At, CONFIG.Item.dataModels[p.HUBRIS] = bt, CONFIG.Item.dataModels[p.SORCERY] = kt, CONFIG.Item.dataModels[p.STORY] = Ct, Ie(), Actors.unregisterSheet("core", ActorSheet), Actors.registerSheet("svnsea2e", jt, {
      types: [l.PLAYER],
      makeDefault: !0
    }), Actors.registerSheet("svnsea2e", HeroSheet, {
      types: [l.HERO],
      makeDefault: !0
    }), Actors.registerSheet("svnsea2e", Rt, {
      types: [l.BRUTE],
      makeDefault: !0
    }), Actors.registerSheet("svnsea2e", Gt, {
      types: [l.MONSTER],
      makeDefault: !0
    }), Actors.registerSheet("svnsea2e", qt, {
      types: [l.VILLAIN],
      makeDefault: !0
    }), Actors.registerSheet("svnsea2e", Pt, {
      types: [l.SHIP],
      makeDefault: !0
    }), Actors.registerSheet("svnsea2e", Ht, {
      types: [l.DANGERPOINTS],
      makeDefault: !0
    }), Items.unregisterSheet("core", ItemSheet), Items.registerSheet("svnsea2e", Ut, {
      types: [p.ADVANTAGE],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", Yt, {
      types: [p.ARTIFACT],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", Wt, {
      types: [p.BACKGROUND],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", Kt, {
      types: [p.DUEL_STYLE],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", Qt, {
      types: [p.MONSTER_QUALITY],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", Jt, {
      types: [p.SCHEME],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", Xt, {
      types: [p.SECRET_SOCIETY],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", Zt, {
      types: [p.SHIP_ADVENTURE],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", es, {
      types: [p.SHIP_BACKGROUND],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", ts, {
      types: [p.SORCERY],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", ss, {
      types: [p.STORY],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", rs, {
      types: [p.VIRTUE],
      makeDefault: !0
    }), Items.registerSheet("svnsea2e", ns, {
      types: [p.HUBRIS],
      makeDefault: !0
    }), Handlebars.registerHelper("concat", function () {
      var i = "";
      for (var e in arguments)
        typeof arguments[e] != "object" && (i += arguments[e]);
      return i;
    }), Handlebars.registerHelper("toLowerCase", function (i) {
      return i.toLowerCase();
    }), Handlebars.registerHelper("capitalize", function (i) {
      return i.charAt(0).toUpperCase() + i.slice(1);
    }), 
    
    Handlebars.registerHelper("for", function (i, e, t, s) {
      var a = "";
      const n = parseInt(i) + parseInt(e);

      // CORRECCIÓN FINAL: Agrupamiento dinámico.
      // Lee los datos del personaje y divide el Máximo de Heridas entre el Máximo de Dramáticas.
      let r = 5;
      if (this.wounds && this.wounds.max && this.dwounds && this.dwounds.max > 0) {
        r = Math.floor(this.wounds.max / this.dwounds.max);
      }

      for (var o = i; o < n; o += t) {
        s.data.index = o;
        s.data.first = o === 0;
        s.data.last = o === e;
        s.data.mod = Math.trunc(o / r);
        s.data.remain = o % r;
        a += s.fn(this);
      }
      return a;
    }), 
    
    Handlebars.registerHelper("iff", function (i, e, t, s) {
      var a = !1;
      switch (e) {
        case "==":
          a = i == t;
          break;
        case "!=":
          a = i != t;
          break;
        case ">=":
          a = i >= t;
          break;
        case "<=":
          a = i <= t;
          break;
        case ">":
          a = i > t;
          break;
        case "<":
          a = i < t;
          break;
        default:
          throw "Unknown operator " + e;
      }
      return a ? s.fn(this) : s.inverse(this);
    }), ke();
});
Hooks.once("ready", async function () {
  game.svnsea2e.packAdvs = await ms(), console.log("7th Sea 2E | Loaded Compendium Advantages"), game.settings.get("svnsea2e", "systemMigrationVersion"), game.user.isGM && fe(), as(), game.svnsea2e.toolbox.render(!0);
});
Hooks.once("setup", function () {
  const i = [
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
  ], e = [];
  for (const t of i) {
    const s = Object.entries(CONFIG.SVNSEA2E[t]).map((a) => [a[0], game.i18n.localize(a[1])]);
    e.includes(t) || s.sort((a, n) => a[1].localeCompare(n[1])), CONFIG.SVNSEA2E[t] = s.reduce((a, n) => (a[n[0]] = n[1], a), {});
  }
});
Hooks.on("preCreateItem", function (i, e, t) {
  // Solo sobreescribimos la imagen si NO tiene imagen personalizada.
  // Es decir, si está vacía o tiene el icono de bolsa por defecto de Foundry.
  if (!i.img || i.img === "icons/svg/item-bag.svg" || i.img === "icons/svg/mystery-man.svg") {
    i.updateSource({
      img: "systems/svnsea2e/icons/" + i.type + ".jpg"
    });
  }
});
Hooks.on("preCreateActor", function (i, e, t, s) {
  if (!i.img || i.img === "icons/svg/mystery-man.svg") {
    i.updateSource({
      img: "systems/svnsea2e/icons/" + i.type + ".jpg"
    });
  }
});
Hooks.on("updateActor", function (actor) {
  us(actor);
});
Hooks.on("renderActorDirectory", (i, e, t) => {
  if (game.user.isGM) {
    const s = document.createElement("div");
    s.className = "header-actions action-buttons flexrow";
    const a = document.createElement("button");
    a.style.width = "95%", a.innerHTML = game.i18n.localize("SVNSEA2E.OpenToolbox"), a.addEventListener("click", () => {
      game.svnsea2e.toolbox.render(!0);
    });
    const n = e == null ? void 0 : e.querySelector(".directory-header"), r = n.querySelector("search");
    s.appendChild(a), n.insertBefore(s, r);
  }
});

// Paints the message header with its author's player color; the CSS falls back to the system red.
Hooks.on("renderChatMessageHTML", (message, html) => {
  const color = message.author?.color;
  if (!color) return;
  // Whether black text contrasts better than white on this color (WCAG relative luminance).
  const [r, g, b] = color.rgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const light = 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179;
  html.style.setProperty("--svnsea-author-color", color.css);
  html.style.setProperty("--svnsea-author-text", light ? "#000" : "#fff");
});

// Combat tracker: -1 / +1 raise buttons around each combatant's raises, and no d20 initiative buttons (the raises
// come from the rolls).
Hooks.on("renderCombatTracker", (app, html) => {
  for (const action of ["rollAll", "rollNPC"]) {
    const button = html.querySelector(`[data-action="${action}"]`);
    if (!button) continue;
    const spacer = document.createElement("div");
    spacer.className = "spacer";
    button.replaceWith(spacer);
  }

  const combat = app.viewed;
  if (!combat) return;
  for (const row of html.querySelectorAll(".combatant[data-combatant-id]")) {
    const combatant = combat.combatants.get(row.dataset.combatantId);
    const initiative = row.querySelector(".token-initiative");
    if (!initiative || initiative.querySelector(".combat-btn, .no-raises")) continue;
    initiative.querySelector('[data-action="rollInitiative"]')?.remove();
    if (!Number.isFinite(combatant?.initiative)) {
      const empty = document.createElement("span");
      empty.className = "no-raises";
      empty.textContent = "–";
      initiative.append(empty);
    }
    if (!combatant?.actor || !combatant.isOwner) continue;

    const makeButton = (delta) => {
      const button = document.createElement("a");
      button.className = `combat-btn ${delta > 0 ? "add" : "sub"}`;
      button.dataset.tooltip = delta > 0 ? "+1 Raise" : "-1 Raise";
      button.innerHTML = `<i class="fa-solid fa-${delta > 0 ? "plus" : "minus"}"></i>`;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        combat.updateRaises([{ _id: combatant.id, initiative: Math.max(0, (combatant.initiative || 0) + delta) }]);
      });
      // Keep double clicks on the buttons from opening the actor sheet.
      button.addEventListener("dblclick", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      return button;
    };
    initiative.prepend(makeButton(-1));
    initiative.append(makeButton(1));
  }
});

// No "Re-roll Initiative" in the context menu of the combatants.
Hooks.on("getCombatTrackerContextOptions", (app, options) => {
  const index = options.findIndex((option) => option.name === "COMBAT.CombatantReroll");
  if (index >= 0) options.splice(index, 1);
});

async function ms() {
  const i = [], e = Array.from(game.packs);
  for (var t = 0; t < e.length; t++) {
    const s = e[t];
    if (s.metadata.type === "Item" || s.metadata.entity === "Item") {
      const a = await s.getIndex();
      for (let n = 0; n < a.length; n++) {
        const doc = await s.getDocument(a[n]._id);
        if (doc && doc.type === "advantage") {
            i.push(doc.toObject ? doc.toObject() : doc.data || doc);
        }
      }
    }
  }
  return i;
}


//# sourceMappingURL=svnsea2e.mjs.map

