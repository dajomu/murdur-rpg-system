interface MonsterItem {
  name: string;
  hp: number;
  atk: number,
  def: number,
  xp: number;
  gold: number;
  profileImage: string;
  alignment?: Alignment;
  canSteal?: boolean;
  guild: number;
  maxLevel: number;
  stats: Stats;
}

interface MonsterGroup {
  name: string;
  groups: {monsterId: number, minCount: number, maxCount: number}[],
}

type MonsterStatus = 'none' | 'poisoned';

interface ActiveMonsterGroup {
  monsterId: number;
  monster: MonsterItem;
  monsterHealth: number[];
  monsterStatus: MonsterStatus;
}