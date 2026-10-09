export const SYSTEM_ID = 'svnsea2e';
export const SYSTEM_PATH = `systems/${SYSTEM_ID}`;
export const TEMPLATES = `${SYSTEM_PATH}/templates`;

export const ActorType = {
  PLAYER: 'playercharacter',
  HERO: 'hero',
  VILLAIN: 'villain',
  MONSTER: 'monster',
  BRUTE: 'brute',
  SHIP: 'ship',
  DANGERPOINTS: 'dangerpts',
};

export const ItemTypes = {
  ADVANTAGE: 'advantage',
  ARTIFACT: 'artifact',
  BACKGROUND: 'background',
  DUEL_STYLE: 'duelstyle',
  MONSTER_QUALITY: 'monsterquality',
  SCHEME: 'scheme',
  SECRET_SOCIETY: 'secretsociety',
  SHIP_ADVENTURE: 'shipadventure',
  SHIP_BACKGROUND: 'shipbackground',
  SORCERY: 'sorcery',
  STORY: 'story',
  VIRTUE: 'virtue',
  HUBRIS: 'hubris',
};

/** Actor types whose wounds are grouped by Strength + 1 instead of 5. */
export const VILLAIN_TYPES = [ActorType.VILLAIN, ActorType.MONSTER];
