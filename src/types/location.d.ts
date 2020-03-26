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
  tile: boolean,
  modifier: boolean
}

interface RoomInitData {
  chestId?: number;
  monsterGroupIds: number[];
}

interface RoomData {
  chest?: Chest;
  groups: ActiveMonsterGroup[];
  id: number;
  isFighting?: boolean;
}
