import level1Data from '../data/levels/level1';
import levelOneRoomInitData from '../data/rooms/level1';
import monsterStore from '../stores/monster';
import { getCount, getPlusMinusTwentyPercentInteger, getRandomFromList } from '../utils/numbers';

interface Chest {
  trapType: 'none' | 'poison' | 'explosive';
  gold: number;
  itemIds: number[];
}

export default class LevelMap {
  levelSections: SectionData[] = [];
  levelRooms: {[key: string]: RoomData} = {};
  level: number;
  size: number;
  discoveredSections: { [key: string]: DiscoveredSection } = {};
  setAllMapDiscovered: boolean;

  constructor(level = 1, size = 30, randomise = true, setAllMapDiscovered = false) {
    this.level = level;
    this.size = size;
    this.setAllMapDiscovered = setAllMapDiscovered;
    if (randomise) { this.randomlyPopulateMap() }
    else {
      this.populateMap();
      this.populateRooms();
    }
    this.populateDiscoveredSections();
  }

  public markSectionDiscovered = (coords: MapLocation) => {
    this.discoveredSections[`${coords[0]}-${coords[1]}`] = { tile: true, modifier: true, leftWall: true, topWall: true };
    if(this.discoveredSections[`${coords[0] + 1}-${coords[1]}`]) {
      this.discoveredSections[`${coords[0] + 1}-${coords[1]}`].leftWall = true;
    }
    if(this.discoveredSections[`${coords[0]}-${coords[1] + 1}`]) {
      this.discoveredSections[`${coords[0]}-${coords[1] + 1}`].topWall = true;
    }
  }

  public isSectionDiscovered = (coords: MapLocation) => {
    return this.discoveredSections[`${coords[0]}-${coords[1]}`] ? this.discoveredSections[`${coords[0]}-${coords[1]}`].tile : false;
  }

  private populateMap = () => {
    this.levelSections = level1Data as SectionData[];
  }

  private randomlyPopulateMap = () => {
    for(var ycord = 0; ycord < this.size; ycord++) {
      for(var xcord = 0; xcord < this.size; xcord++) {
        this.levelSections.push({coords: [xcord, ycord], leftWall: this.getRandomWall(), topWall: this.getRandomWall(), terrain: this.getRandomTerrain()});
      }
    }
  }

  private populateRooms = () => {
    for (const roomKey in levelOneRoomInitData) {
      this.populateRoom(roomKey, levelOneRoomInitData[roomKey]);
    }
  }

  private populateRoom = (roomKey: number | string, roomInitData: RoomInitData) => {
    if(!roomInitData) {
      return;
    }
    const monsterGroupId = getRandomFromList(roomInitData.monsterGroupIds);
    if(typeof monsterGroupId !== 'number') {
      return;
    }
    const monsterGroup = monsterStore.monsterGroups[monsterGroupId]
    this.levelRooms[roomKey] = {
      groups: monsterGroup.groups.map(group => ({
        monsterId: group.monsterId,
        monster: monsterStore.monsters[group.monsterId],
        monsterHealth: [...Array(getCount(group.minCount, group.maxCount))].map(monster => getPlusMinusTwentyPercentInteger(monsterStore.monsters[group.monsterId].hp)),
        monsterStatus: 'none'}))
    }
  }

  private populateDiscoveredSections = () => {
    for(var ycord = 0; ycord < this.size; ycord++) {
      for(var xcord = 0; xcord < this.size; xcord++) {
        this.discoveredSections[`${xcord}-${ycord}`] = this.setAllMapDiscovered ?
          { tile: true, modifier: true, leftWall: true, topWall: true } : 
          { tile: false, modifier: false, leftWall: false, topWall: false };
      }
    }
  }

  private getRandomWall = (): string => {
    const randomWall = Math.round(1 + Math.random() * 4);
    return randomWall >= 4 ? 'wall' : randomWall === 1 ? 'door' : 'none';
  }

  private getRandomTerrain = (): string => {
    switch(Math.round(1 + Math.random() * 6)) {
      case 1:
        return 'sand';
      case 2:
        return 'water';
      default:
        return 'none';
    }
  }
}
