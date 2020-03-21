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
}

interface MonsterGroup {
  name: string;
  groups: {monsterId: number, minCount: number, maxCount: number}[],
}