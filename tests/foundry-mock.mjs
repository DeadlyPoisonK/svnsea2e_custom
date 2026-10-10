// Minimal mock of the Foundry v14 API, enough to run the system bundle in Node with jsdom.
// Behaviors mirror Foundry where the system depends on them (option merging, tabs, actions, documents).
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import Handlebars from 'handlebars';

export function installMocks(repo) {
  const dom = new JSDOM('<!doctype html><body></body>');
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Event: dom.window.Event });
  globalThis.Handlebars = Handlebars;
  const log = { chat: [], notifications: [], updates: [], dialogs: [] };
  // Actors of unlinked tokens, by token id (tests register them).
  const tokenActors = new Map();

  // ---------- utils ----------
  const getProperty = (o, p) => p.split('.').reduce((a, k) => a?.[k], o);
  const hasProperty = (o, p) => getProperty(o, p) !== undefined;
  const setProperty = (o, p, v) => { const ks = p.split('.'); const last = ks.pop(); let t = o; for (const k of ks) t = t[k] ??= {}; t[last] = v; };
  const deepClone = (o) => { if (o && typeof o === 'object' && !Array.isArray(o) && Object.getPrototypeOf(o) !== Object.prototype) throw new Error('deepClone: unsupported class instance'); return structuredClone(o); };
  const isEmpty = (o) => !o || Object.keys(o).length === 0;
  const isNewerVersion = (a, b) => { const pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number); for (let i = 0; i < Math.max(pa.length, pb.length); i++) { if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0); } return false; };

  // ---------- data fields ----------
  class Field { constructor(opts = {}) { this.opts = opts; } initial() { return this.opts.initial; } }
  class SchemaField extends Field { constructor(fields, opts) { super(opts); this.fields = fields; } initial() { return Object.fromEntries(Object.entries(this.fields).map(([k, f]) => [k, f.initial()])); } }
  class ArrayField extends Field { initial() { return []; } }
  class StringField extends Field { initial() { return this.opts.initial ?? ''; } }
  class HTMLField extends StringField {}
  class NumberField extends Field { initial() { return this.opts.initial ?? null; } }
  class BooleanField extends Field { initial() { return this.opts.initial ?? false; } }
  // Like Foundry: the instance holds the (migrated) source plus derived values, with the document as `parent`.
  class TypeDataModel {
    constructor(source, { parent } = {}) { Object.assign(this, source); Object.defineProperty(this, 'parent', { value: parent, enumerable: false }); }
    static defineSchema() { return {}; }
    static initialData() { return Object.fromEntries(Object.entries(this.defineSchema()).map(([k, f]) => [k, f.initial()])); }
    static migrateData(source) { return source; }
    prepareBaseData() {}
    prepareDerivedData() {}
    toObject() { return structuredClone({ ...this }); }
  }
  class ForcedDeletion {}

  // ---------- handlebars ----------
  const tplRoot = path.join(repo, 'templates');
  const cache = {};
  const getTemplate = (p) => {
    if (!cache[p]) {
      const file = path.join(tplRoot, p.replace('systems/svnsea2e/templates/', ''));
      cache[p] = Handlebars.compile(fs.readFileSync(file, 'utf8'));
    }
    return cache[p];
  };
  const renderTemplate = async (p, data) => getTemplate(p)(data, { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true });
  const loadTemplates = async (paths) => paths.map((p) => { Handlebars.registerPartial(p, getTemplate(p)); return getTemplate(p); });
  Handlebars.registerHelper('localize', (k) => (typeof k === 'string' ? (game.i18n.lang[k] ?? k) : k));
  Handlebars.registerHelper('checked', (v) => (v ? 'checked' : ''));
  Handlebars.registerHelper('disabled', (v) => (v ? 'disabled' : ''));
  Handlebars.registerHelper('not', (v) => !v);
  Handlebars.registerHelper('ifThen', (c, a, b) => (c ? a : b));
  Handlebars.registerHelper('concat', (...a) => { a.pop(); return new Handlebars.SafeString(a.join('')); });
  Handlebars.registerHelper('selectOptions', (choices, o) => new Handlebars.SafeString(Object.entries(choices ?? {}).map(([k, v]) => `<option value="${k}" ${k === o.hash.selected ? 'selected' : ''}>${v}</option>`).join('')));

  // ---------- applications ----------
  class ApplicationV2 {
    static DEFAULT_OPTIONS = { classes: [], window: { title: '' }, position: {}, actions: {}, form: {} };
    static TABS = {};
    constructor(options = {}) { this.options = this._initializeApplicationOptions(options); this.tabGroups = {}; this.rendered = false; this.element = null; }
    _initializeApplicationOptions(options) {
      const order = [options]; let cls = this.constructor;
      while (cls) { order.unshift(cls.DEFAULT_OPTIONS); if (cls === ApplicationV2) break; cls = Object.getPrototypeOf(cls); }
      const out = {};
      for (const opts of order) for (const [k, v] of Object.entries(opts ?? {})) {
        if (k in out) { const v0 = out[k]; if (Array.isArray(v0)) v0.push(...v); else if (v0 && typeof v0 === 'object' && !(v0 instanceof Function)) Object.assign(v0, v); else out[k] = v; }
        else out[k] = Array.isArray(v) ? [...v] : (v && typeof v === 'object' && !(v instanceof Function) && !(v.documentName)) ? { ...v } : v;
      }
      return out;
    }
    get title() { return game.i18n.localize(this.options.window?.title ?? ''); }
    _getTabsConfig(group) { return this.constructor.TABS[group] ?? null; }
    _prepareTabs(group) {
      const { tabs, initial = null } = this._getTabsConfig(group) ?? { tabs: [] };
      this.tabGroups[group] ??= initial;
      return Object.fromEntries(tabs.map(({ id, cssClass, ...cfg }) => { const active = this.tabGroups[group] === id; return [id, { group, id, active, cssClass: active ? 'active' : cssClass, ...cfg }]; }));
    }
    async _prepareContext() { return {}; }
    async render(options) {
      const context = await this._prepareContext({});
      const html = [];
      for (const part of Object.values(this.constructor.PARTS ?? {})) html.push(await renderTemplate(part.template, context));
      this.element = document.createElement(this.options.tag ?? 'div');
      this.element.className = this.options.classes.join(' ');
      this.element.innerHTML = html.join('');
      this.rendered = true;
      await this._onRender(context, {});
      return this;
    }
    _onRender() {}
    async close() { this.rendered = false; }
    /** Test helper: dispatch a click on the first element matching selector, like ApplicationV2#_onClickAction. */
    async click(selector, index = 0) {
      const target = this.element.querySelectorAll(selector)[index];
      if (!target) throw new Error(`no element ${selector}`);
      const action = target.closest('[data-action]').dataset.action;
      const handler = this.options.actions[action];
      if (!handler) throw new Error(`no handler for ${action}`);
      const event = new window.Event('click', { cancelable: true });
      Object.defineProperty(event, 'target', { value: target });
      return (handler.handler ?? handler).call(this, event, target);
    }
  }
  const HandlebarsApplicationMixin = (Base) => class extends Base {};
  class DocumentSheetV2 extends ApplicationV2 {
    static DEFAULT_OPTIONS = { tag: 'form', actions: { editImage() {} } };
    constructor(options) { super(options); this.document = options.document; }
    get isEditable() { return this.document.isOwner; }
    async _prepareContext() { return { document: this.document, editable: this.isEditable }; }
  }
  class ActorSheetV2 extends DocumentSheetV2 { get actor() { return this.document; } async _onSortItem() { return []; } async _onDragStart() {} }
  class ItemSheetV2 extends DocumentSheetV2 { get item() { return this.document; } }
  class DialogV2 extends ApplicationV2 {
    static async wait(config) {
      log.dialogs.push(config);
      const dlg = document.createElement('form');
      dlg.innerHTML = config.content + '<button data-action="roll"></button>';
      DialogV2.prefill?.(dlg);
      const button = dlg.querySelector('button[data-action="roll"]');
      return config.buttons[0].callback(new window.Event('click'), button, null);
    }
  }
  const DocumentSheetConfig = { registered: [], registerSheet(doc, scope, sheet, cfg) { for (const type of cfg.types) this.registered.push([doc.name, sheet.name, type]); }, unregisterSheet() {} };

  // ---------- documents ----------
  let idCounter = 0;
  class Collection extends Map { [Symbol.iterator]() { return this.values(); } get contents() { return [...this.values()]; } filter(fn) { return this.contents.filter(fn); } find(fn) { return this.contents.find(fn); } some(fn) { return this.contents.some(fn); } map(fn) { return this.contents.map(fn); } }

  // Active effects: enough of Foundry's to apply "add" and "override" changes in phases, like Actor#applyActiveEffects.
  class ActiveEffect {
    static documentName = 'ActiveEffect';
    constructor(data, parent) {
      this._id = data._id ?? `ae${++idCounter}`; this.parent = parent; this.name = data.name; this.img = data.img ?? 'icons/svg/aura.svg';
      this.disabled = !!data.disabled; this.transfer = data.transfer ?? true; this.flags = deepClone(data.flags ?? {});
      this.description = data.description ?? ''; this.origin = data.origin ?? null;
      this.duration = { value: data.duration?.value ?? null, units: data.duration?.units ?? 'seconds' };
      this.system = { changes: (data.system?.changes ?? []).map((c) => ({ type: 'add', phase: 'initial', ...c })) };
    }
    get id() { return this._id; }
    get documentName() { return 'ActiveEffect'; }
    get uuid() { return `${this.parent.uuid}.ActiveEffect.${this.id}`; }
    get actor() { return this.parent instanceof Actor ? this.parent : (this.parent?.parent ?? null); }
    get isSuppressed() { return false; }
    get active() { return !this.disabled && !this.isSuppressed; }
    get isTemporary() { return Number.isFinite(this.duration.value); }
    shouldApplyChange(change, options) { return change.phase === options?.phase; }
    getFlag(scope, key) { return getProperty(this.flags, `${scope}.${key}`); }
    get sheet() { return { render: () => log.updates.push(['effectSheet', this.name]), tabGroups: {} }; }
    toObject() { return { _id: this._id, name: this.name, img: this.img, disabled: this.disabled, transfer: this.transfer, duration: { ...this.duration }, system: deepClone(this.system), flags: deepClone(this.flags) }; }
    toDragData() { return { type: 'ActiveEffect', uuid: this.uuid }; }
    async update(changes) { log.updates.push([this.name, changes]); for (const [k, v] of Object.entries(changes)) setProperty(this, k, v); this.parent._refreshEffects(); return this; }
    async delete() { this.parent.effects.delete(this.id); log.updates.push(['deleteEffect', this.name]); this.parent._refreshEffects(); }
  }
  /** The value of a change, applied like ActiveEffect._applyChangeUnguided (add and override only). */
  const applyChange = (current, change) => {
    const raw = change.value;
    const cast = typeof current === 'boolean' ? raw === true || raw === 'true' : typeof current === 'number' ? Number(raw) || 0 : raw;
    if (change.type === 'override') return cast;
    if (typeof current === 'boolean') return current || cast;
    return current + cast;
  };
  const effectsMixin = {
    async createEmbeddedEffects(list) {
      const created = list.map((d) => new CONFIG.ActiveEffect.documentClass({ ...d, _id: undefined }, this));
      for (const e of created) this.effects.set(e.id, e);
      log.updates.push(['createEffect', list.map((d) => d.name)]);
      this._refreshEffects();
      return created;
    },
    _refreshEffects() { this.prepareData(); this.parent?.prepareData?.(); },
  };
  class BaseDocument {
    constructor(data, parent = null) {
      this._id = data._id ?? `id${++idCounter}`; this.name = data.name; this.type = data.type; this.img = data.img; this.parent = parent;
      const model = CONFIG[this.constructor.documentName].dataModels[this.type];
      this._source = { system: model.migrateData(foundry.utils.deepClone({ ...model.initialData(), ...(data.system ?? {}) })), flags: deepClone(data.flags ?? {}) };
      this.flags = this._source.flags; this.isOwner = true; this.limited = false; this.pack = null;
      this.effects = new Collection();
      for (const e of data.effects ?? []) { const effect = new CONFIG.ActiveEffect.documentClass(e, this); this.effects.set(effect.id, effect); }
    }
    get id() { return this._id; }
    get uuid() { return this.parent ? `${this.parent.uuid}.Item.${this.id}` : `${this.constructor.documentName}.${this.id}`; }
    get documentName() { return this.constructor.documentName; }
    prepareData() {
      // Same order as ClientDocumentMixin#prepareData, with the effect phases of Actor#prepareData.
      const model = CONFIG[this.constructor.documentName].dataModels[this.type];
      this.system = new model(deepClone(this._source.system), { parent: this });
      this.system.prepareBaseData(); this.prepareBaseData();
      this.overrides = {};
      this.applyActiveEffects?.('initial');
      this.system.prepareDerivedData(); this.prepareDerivedData();
      this.applyActiveEffects?.('final');
    }
    prepareBaseData() {}
    prepareDerivedData() {}
    getRollData() { return {}; }
    async _preCreate() {}
    updateSource(d) { Object.assign(this, d); }
    async update(changes) {
      log.updates.push([this.name, changes]);
      for (const [k, v] of Object.entries(changes)) {
        const [target, path] = k.startsWith('system.') ? [this._source.system, k.slice(7)] : k.startsWith('flags.') ? [this.flags, k.slice(6)] : [this, k];
        if (v instanceof ForcedDeletion) { const keys = path.split('.'); const last = keys.pop(); const parent = keys.length ? getProperty(target, keys.join('.')) : target; delete parent?.[last]; }
        else setProperty(target, path, v);
      }
      // Foundry migrates the changes too, so the data models may fix values on update.
      this._source.system = CONFIG[this.documentName].dataModels[this.type].migrateData(this._source.system);
      // Like Foundry, a change to an embedded document prepares its parent again.
      this.prepareData(); this.parent?.prepareData?.(); return this;
    }
    getFlag(scope, key) { return getProperty(this.flags, `${scope}.${key}`); }
    async setFlag(scope, key, value) { return this.update({ [`flags.${scope}.${key}`]: value }); }
    async unsetFlag(scope, key) { delete this.flags[scope]?.[key]; return this; }
    toObject() { return { _id: this._id, name: this.name, type: this.type, img: this.img, system: deepClone(this._source.system), flags: deepClone(this.flags), effects: this.effects?.map((e) => e.toObject()) ?? [] }; }
    toDragData() { return { type: this.documentName, uuid: this.uuid }; }
    async delete() {
      const parent = this.parent;
      parent?.items.delete(this.id); game.items.delete(this.id); log.updates.push(['delete', this.name]);
      parent?.prepareData();
      parent?._onDeleteDescendantDocuments(parent, 'items', [this], [this.id], {}, game.user.id);
    }
    get sheet() { return (this._sheet ??= { render: () => log.updates.push(['sheet', this.name]), tabGroups: {} }); }
    static async create(data, { parent } = {}) { const d = new CONFIG[this.documentName].documentClass(data, parent); await d._preCreate?.(data, {}, game.user); d.prepareData(); return d; }
  }
  class Actor extends BaseDocument {
    static documentName = 'Actor';
    constructor(data, parent) { super(data, parent); this.items = new Collection(); }
    /** Tests make an unlinked token actor by setting `_token` ({delta}). */
    get isToken() { return !!this._token; }
    get token() { return this._token ?? null; }
    // Like Foundry, the actor of an unlinked token has the id of its base actor and a UUID of its own.
    get uuid() { return this._token ? `Scene.scene.Token.${this._token.id}.Actor.${this.id}` : super.uuid; }
    *allApplicableEffects() {
      yield* this.effects;
      for (const item of this.items ?? []) for (const effect of item.effects) if (effect.transfer) yield effect;
    }
    applyActiveEffects(phase) {
      const changes = [];
      for (const effect of this.allApplicableEffects()) {
        if (!effect.active) continue;
        for (const change of effect.system.changes) if (change.key && effect.shouldApplyChange(change, { phase })) changes.push(change);
      }
      for (const change of changes) {
        const value = applyChange(getProperty(this, change.key), change);
        setProperty(this, change.key, value);
        setProperty(this.overrides, change.key, value);
      }
    }
    async createEmbeddedDocuments(name, list) {
      if (name === 'ActiveEffect') return this.createEmbeddedEffects(list);
      const out = [];
      for (const d of list) { const item = await CONFIG.Item.documentClass.create({ ...d, _id: undefined }, { parent: this }); this.items.set(item.id, item); out.push(item); }
      log.updates.push(['create', list.map((d) => d.name)]);
      this.prepareData();
      this._onCreateDescendantDocuments(this, 'items', out, list, {}, game.user.id);
      return out;
    }
    async deleteEmbeddedDocuments(name, ids) {
      const deleted = ids.map((id) => this.items.get(id)).filter((i) => i);
      for (const id of ids) this.items.delete(id);
      log.updates.push(['deleteEmbedded', ids.length]);
      this._onDeleteDescendantDocuments(this, 'items', deleted, ids, {}, game.user.id);
    }
    _onCreateDescendantDocuments() {}
    _onDeleteDescendantDocuments() {}
    async updateEmbeddedDocuments(name, list) { for (const u of list) { const { _id, ...rest } = u; await this.items.get(_id).update(rest); } }
  }
  class Item extends BaseDocument {
    static documentName = 'Item';
    get actor() { return this.parent; }
    async createEmbeddedDocuments(name, list) { return this.createEmbeddedEffects(list); }
  }
  Object.assign(Actor.prototype, effectsMixin);
  Object.assign(Item.prototype, effectsMixin);

  // Chat messages: typed ones get their data model, like Foundry. `log.chat` keeps every message created.
  class ChatMessage {
    static implementation = ChatMessage;
    static applyMode(d) { return { ...d, mode: 'applied' }; }
    static getSpeaker({ actor } = {}) { return { actor: actor?.id, token: actor?._token?.id }; }
    static getSpeakerActor(speaker) { return tokenActors.get(speaker?.token) ?? game.actors.get(speaker?.actor) ?? null; }
    static async create(data) { const message = new ChatMessage(data); log.chat.push(message); game.messages.set(message.id, message); return message; }
    constructor(data) {
      const { system, rolls, ...rest } = data;
      Object.assign(this, rest);
      this._id = `msg${++idCounter}`; this.type ??= 'base'; this.rolls = [...(rolls ?? [])];
      this._systemSource = deepClone(system ?? {}); this._prepare();
    }
    _prepare() {
      const model = CONFIG.ChatMessage.dataModels[this.type];
      this.system = model ? new model(model.migrateData(deepClone({ ...model.initialData(), ...this._systemSource })), { parent: this }) : this._systemSource;
    }
    get id() { return this._id; }
    get isAuthor() { return this.author === game.user.id; }
    get isContentVisible() { return !this.blind || game.user.isGM; }
    async update(changes) {
      log.updates.push(['message', changes]);
      const { system, ...rest } = changes;
      Object.assign(this, rest);
      if (system) { this._systemSource = deepClone(system); this._prepare(); }
      return this;
    }
  }

  // Combats: combatants sorted by the system's _sortCombatants; updates call _onUpdate like Foundry.
  class Combatant {
    static documentName = 'Combatant';
    constructor(data, parent) {
      this._id = data._id ?? `cbt${++idCounter}`; this.parent = parent; this.actor = data.actor ?? null; this.name = data.name ?? data.actor?.name;
      this.initiative = data.initiative ?? null; this.flags = deepClone(data.flags ?? {}); this.isOwner = data.isOwner ?? true;
    }
    get id() { return this._id; }
    get actorId() { return this.actor?.id; }
    getFlag(scope, key) { return getProperty(this.flags, `${scope}.${key}`); }
    async update(changes) { return this.parent.updateEmbeddedDocuments('Combatant', [{ _id: this.id, ...changes }]); }
    static async _preUpdateOperation() {}
    _onUpdate() {}
  }
  class Combat {
    constructor({ round = 0, active = true, combatants = [] } = {}) {
      this._id = `cmb${++idCounter}`; this.round = round; this.active = active; this.turn = round ? 0 : null;
      this.combatants = new Collection();
      for (const data of combatants) { const c = new CONFIG.Combatant.documentClass(data, this); this.combatants.set(c.id, c); }
      this.setupTurns();
    }
    get id() { return this._id; }
    get started() { return this.round > 0; }
    get combatant() { return this.turn === null ? undefined : this.turns[this.turn]; }
    setupTurns() { this.turns = this.combatants.contents.sort(this._sortCombatants); }
    _sortCombatants(a, b) { return (b.initiative ?? -Infinity) - (a.initiative ?? -Infinity); }
    async updateEmbeddedDocuments(name, updates, options = {}) {
      // Like ClientDatabaseBackend: the pre-operation step may change the operation (e.g. combatTurn).
      const operation = { ...options, parent: this, updates };
      await CONFIG.Combatant.documentClass._preUpdateOperation(updates.map((u) => this.combatants.get(u._id)), operation, game.user);
      options = operation;
      log.updates.push(['combatants', updates, options]);
      for (const { _id, ...update } of updates) {
        const combatant = this.combatants.get(_id);
        for (const [k, v] of Object.entries(update)) {
          if (k.startsWith('flags.')) setProperty(combatant.flags, k.slice(6), deepClone(v));
          else combatant[k] = v;
        }
        combatant._onUpdate(update, options, game.user.id);
      }
      if (typeof options.combatTurn === 'number') this.turn = options.combatTurn;
      this.setupTurns();
    }
    async update(changes, options = {}) { Object.assign(this, changes); this.setupTurns(); this._onUpdate(changes, options, game.user.id); return this; }
    _onUpdate() {}
    async nextRound() { return this.update({ round: this.round + 1, turn: 0 }, { direction: 1 }); }
    async previousRound() { return this.update({ round: this.round - 1, turn: 0 }, { direction: -1 }); }
    async rollInitiative() { throw new Error('d20 initiative rolled'); }
  }

  class MockRoll {
    static next = [];
    constructor(formula) { this.formula = formula; }
    async evaluate() { const [, n, x] = /^(\d+)d10(x?)$/.exec(this.formula); const results = []; let k = +n; while (k-- > 0) { const r = MockRoll.next.length ? MockRoll.next.shift() : 5; results.push({ result: r }); if (x && r === 10) k++; } this.dice = [{ results }]; this.terms = this.dice; return this; }
  }

  globalThis.foundry = {
    utils: { getProperty, setProperty, hasProperty, deepClone, isEmpty, isNewerVersion, mergeObject: Object.assign },
    data: { fields: { SchemaField, ArrayField, StringField, HTMLField, NumberField, BooleanField }, operators: { ForcedDeletion } },
    abstract: { TypeDataModel },
    dice: { Roll: MockRoll },
    applications: {
      api: { ApplicationV2, HandlebarsApplicationMixin, DialogV2, DocumentSheetV2 },
      sheets: { ActorSheetV2, ItemSheetV2 },
      handlebars: { renderTemplate, loadTemplates },
      ux: { TextEditor: { implementation: { enrichHTML: async (h) => `<enriched>${h}</enriched>`, getDragEventData: (e) => e._data } } },
      apps: { DocumentSheetConfig },
    },
  };
  const hooks = {};
  globalThis.Hooks = { once: (n, f) => (hooks[n] ??= []).push(f), on: (n, f) => (hooks[n] ??= []).push(f), callAll: async (n, ...a) => { for (const f of hooks[n] ?? []) await f(...a); } };
  globalThis.Actor = Actor; globalThis.Item = Item; globalThis.ActiveEffect = ActiveEffect; globalThis.Combat = Combat; globalThis.Combatant = Combatant;
  globalThis.CONST = { DEFAULT_TOKEN: 'icons/svg/mystery-man.svg', CHAT_MESSAGE_STYLES: { OTHER: 0 } };
  globalThis.CONFIG = { Actor: { dataModels: {} }, Item: { dataModels: {} }, ChatMessage: { dataModels: {} }, ActiveEffect: { documentClass: ActiveEffect }, Combat: { documentClass: Combat }, Combatant: { documentClass: Combatant } };
  globalThis.ChatMessage = ChatMessage;
  globalThis.ui = { notifications: { info: (m) => log.notifications.push(['info', m]), warn: (m) => log.notifications.push(['warn', m]), error: (m) => log.notifications.push(['error', m]) } };
  const settings = new Map();
  const en = JSON.parse(fs.readFileSync(path.join(repo, 'lang/en.json'), 'utf8'));
  globalThis.game = {
    i18n: { lang: en, localize: (k) => en[k] ?? k, format: (k, d) => (en[k] ?? k).replace(/{(\w+)}/g, (_, x) => d?.[x]) },
    settings: { register: (s, k, cfg) => settings.set(k, cfg.default), get: (s, k) => settings.get(k), set: async (s, k, v) => settings.set(k, v) },
    system: { version: '24.0' },
    user: { id: 'gm', isGM: true, isActiveGM: true },
    users: { activeGM: { isSelf: true } },
    actors: new Collection(), items: new Collection(), packs: [], combats: new Collection(), scenes: new Collection(), messages: new Collection(),
  };
  globalThis.fromUuidSync = (uuid) => (uuid.includes('.Token.') ? tokenActors.get(uuid.split('.')[3]) : game.actors.get(uuid.split('.').pop()));
  globalThis.fromUuid = async (uuid) => fromUuidSync(uuid);
  return { log, hooks, MockRoll, DialogV2, DocumentSheetConfig, settings, tokenActors };
}
