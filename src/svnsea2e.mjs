import { SVNSEA2E } from './config.js';
import { ActorType, ItemTypes, SYSTEM_ID } from './enums.js';
import { registerSystemSettings } from './settings.js';
import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from './templates.js';
import { invalidateAdvantageCache } from './helpers.js';
import * as migrations from './migration.js';
import { onRenderCombatTracker, updateInitiative } from './combat.js';
import { registerChatListeners } from './chat.js';
import { Toolbox } from './toolbox/toolbox.js';

import { SvnSea2EActor } from './actor/actor.js';
import * as actorModels from './actor/models.js';
import {
  BruteSheet,
  DangerPointsSheet,
  HeroSheet,
  MonsterSheet,
  PlayerCharacterSheet,
  VillainSheet,
} from './actor/sheets/sheets.js';
import { ShipSheet } from './actor/sheets/ship.js';

import { SvnSea2EItem } from './item/item.js';
import * as itemModels from './item/models.js';
import * as itemSheets from './item/sheets.js';
import { rollDicePool } from './roll/roll.js';
import { rollFreeDice, rollSkill, rollTrait } from './roll/dialogs.js';

Hooks.once('init', () => {
  console.log(`7th Sea 2E | Initializing 7th Sea Second Edition System\n${SVNSEA2E.ASCII}`);

  game.svnsea2e = {
    applications: { SvnSea2EActor, SvnSea2EItem },
    config: SVNSEA2E,
    migrations,
    rolls: { rollDicePool, rollSkill, rollTrait, rollFreeDice },
    updateInitiative,
    toolbox: new Toolbox(),
  };

  CONFIG.SVNSEA2E = SVNSEA2E;
  CONFIG.SVNSEA2E.natTypes = { ...SVNSEA2E.nations, gisles: 'SVNSEA2E.RegionGlamourIsles' };
  CONFIG.Combat.initiative = { formula: '1d20', decimals: 2 };

  CONFIG.Actor.documentClass = SvnSea2EActor;
  CONFIG.Item.documentClass = SvnSea2EItem;

  Object.assign(CONFIG.Actor.dataModels, {
    [ActorType.BRUTE]: actorModels.BruteModel,
    [ActorType.DANGERPOINTS]: actorModels.DangerPointsModel,
    [ActorType.HERO]: actorModels.HeroModel,
    [ActorType.MONSTER]: actorModels.MonsterModel,
    [ActorType.PLAYER]: actorModels.PlayerModel,
    [ActorType.SHIP]: actorModels.ShipModel,
    [ActorType.VILLAIN]: actorModels.VillainModel,
  });
  Object.assign(CONFIG.Item.dataModels, {
    [ItemTypes.ADVANTAGE]: itemModels.AdvantageModel,
    [ItemTypes.ARTIFACT]: itemModels.ArtifactModel,
    [ItemTypes.BACKGROUND]: itemModels.BackgroundModel,
    [ItemTypes.DUEL_STYLE]: itemModels.DuelStyleModel,
    [ItemTypes.MONSTER_QUALITY]: itemModels.MonsterQualityModel,
    [ItemTypes.SCHEME]: itemModels.SchemeModel,
    [ItemTypes.SECRET_SOCIETY]: itemModels.SecretSocietyModel,
    [ItemTypes.SHIP_ADVENTURE]: itemModels.ShipAdventureModel,
    [ItemTypes.SHIP_BACKGROUND]: itemModels.ShipBackgroundModel,
    [ItemTypes.SORCERY]: itemModels.SorceryModel,
    [ItemTypes.STORY]: itemModels.StoryModel,
    [ItemTypes.VIRTUE]: itemModels.VirtueModel,
    [ItemTypes.HUBRIS]: itemModels.HubrisModel,
  });

  registerSystemSettings();
  registerSheets();
  registerHandlebarsHelpers();
  return preloadHandlebarsTemplates();
});

function registerSheets() {
  const { DocumentSheetConfig } = foundry.applications.apps;

  // Remove the core sheets so ours are the only choice.
  for (const sheet of [foundry.appv1?.sheets?.ActorSheet, foundry.applications.sheets.ActorSheetV2]) {
    if (sheet) DocumentSheetConfig.unregisterSheet(Actor, 'core', sheet);
  }
  for (const sheet of [foundry.appv1?.sheets?.ItemSheet, foundry.applications.sheets.ItemSheetV2]) {
    if (sheet) DocumentSheetConfig.unregisterSheet(Item, 'core', sheet);
  }

  const register = (documentClass, sheet, type) =>
    DocumentSheetConfig.registerSheet(documentClass, SYSTEM_ID, sheet, { types: [type], makeDefault: true });

  register(Actor, PlayerCharacterSheet, ActorType.PLAYER);
  register(Actor, HeroSheet, ActorType.HERO);
  register(Actor, BruteSheet, ActorType.BRUTE);
  register(Actor, MonsterSheet, ActorType.MONSTER);
  register(Actor, VillainSheet, ActorType.VILLAIN);
  register(Actor, ShipSheet, ActorType.SHIP);
  register(Actor, DangerPointsSheet, ActorType.DANGERPOINTS);

  register(Item, itemSheets.AdvantageSheet, ItemTypes.ADVANTAGE);
  register(Item, itemSheets.ArtifactSheet, ItemTypes.ARTIFACT);
  register(Item, itemSheets.BackgroundSheet, ItemTypes.BACKGROUND);
  register(Item, itemSheets.DuelStyleSheet, ItemTypes.DUEL_STYLE);
  register(Item, itemSheets.MonsterQualitySheet, ItemTypes.MONSTER_QUALITY);
  register(Item, itemSheets.SchemeSheet, ItemTypes.SCHEME);
  register(Item, itemSheets.SecretSocietySheet, ItemTypes.SECRET_SOCIETY);
  register(Item, itemSheets.ShipAdventureSheet, ItemTypes.SHIP_ADVENTURE);
  register(Item, itemSheets.ShipBackgroundSheet, ItemTypes.SHIP_BACKGROUND);
  register(Item, itemSheets.SorcerySheet, ItemTypes.SORCERY);
  register(Item, itemSheets.StorySheet, ItemTypes.STORY);
  register(Item, itemSheets.VirtueSheet, ItemTypes.VIRTUE);
  register(Item, itemSheets.HubrisSheet, ItemTypes.HUBRIS);
}

/** Localize and sort the configuration lists once translations are available. */
Hooks.once('setup', () => {
  const lists = [
    'actorTypes', 'natTypes', 'artifactTypes', 'crewStatuses', 'durations', 'itemTypes', 'languages', 'nations',
    'traits', 'shipRoles', 'skills', 'sorceryTypes', 'sorceryCats', 'sorcerySubcats', 'storyStatuses',
  ];
  for (const list of lists) {
    const entries = Object.entries(CONFIG.SVNSEA2E[list]).map(([key, label]) => [key, game.i18n.localize(label)]);
    entries.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.SVNSEA2E[list] = Object.fromEntries(entries);
  }
});

Hooks.once('ready', async () => {
  registerChatListeners();
  await migrations.migrateWorldIfNeeded();
  game.svnsea2e.toolbox.render(true);
});

// Keep the toolbox up to date when one of its actors changes (the hook runs on every client).
Hooks.on('updateActor', (actor) => {
  if (game.svnsea2e.toolbox.shows(actor)) game.svnsea2e.toolbox.render();
});

for (const hook of ['createItem', 'updateItem', 'deleteItem']) Hooks.on(hook, invalidateAdvantageCache);

// "Open Toolbox" button at the top of the actors directory, for the GM.
Hooks.on('renderActorDirectory', (app, html) => {
  if (!game.user.isGM || html.querySelector('.svnsea2e-toolbox-button')) return;
  const header = html.querySelector('.directory-header');
  if (!header) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'header-actions action-buttons flexrow svnsea2e-toolbox-button';
  const button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = `<i class="fa-solid fa-toolbox"></i> ${game.i18n.localize('SVNSEA2E.OpenToolbox')}`;
  button.addEventListener('click', () => game.svnsea2e.toolbox.render(true));
  wrapper.append(button);
  header.insertBefore(wrapper, header.querySelector('search'));
});

Hooks.on('renderCombatTracker', onRenderCombatTracker);
