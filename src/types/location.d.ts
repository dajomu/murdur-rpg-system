interface SectionData {
  coords: MapLocation,
  leftWall: Walls;
  topWall: Walls;
  terrain: Terrain;
  modifier?: string;
  roomId?: number;
}

type Terrain = 'sand' | 'water' | 'none';

type Walls = 'wall' | 'door' | 'none';

type WallFace = 'topWall' | 'leftWall';

interface DiscoveredSection {
  leftWall: boolean;
  topWall: boolean;
  tile: boolean;
  modifier: boolean;
}

interface RoomInitData {
  chestId?: number;
  description?: string;
  name: string;
  monsterGroupIds: number[];
}

type CurrentFighter = undefined | 'player' | 0 | 1 | 2 | 3;

type AttackResult = number | 'missed' | 'kill';

interface RoomData {
  chest?: Chest;
  currentFighter: CurrentFighter;
  description?: string;
  groups: ActiveMonsterGroup[];
  id: number;
  isFighting?: boolean;
}
