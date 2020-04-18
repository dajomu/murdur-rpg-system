interface SectionData {
  coords: MapLocation,
  leftWall: string;
  topWall: string;
  terrain: string;
  modifier?: string;
  roomId?: number;
}

interface DiscoveredSection {
  leftWall: boolean;
  topWall: boolean;
  tile: boolean;
  modifier: boolean;
}

interface RoomInitData {
  chestId?: number;
  monsterGroupIds: number[];
}

type CurrentFighter = undefined | 'player' | 0 | 1 | 2 | 3;

type AttackResult = number | 'missed' | 'kill';

interface RoomData {
  chest?: Chest;
  currentFighter: CurrentFighter;
  groups: ActiveMonsterGroup[];
  id: number;
  isFighting?: boolean;
}
