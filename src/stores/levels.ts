import { action, observable, makeObservable } from 'mobx';
import { getCookie, setCookie } from '../utils/cookie';
import LevelMap from '../dataObjects/LevelMap';
import { boundingOffsetMap } from '../constants';

export class LevelStore {
  @observable useRandomMaps: boolean;
  @observable level1: LevelMap;
  constructor() {
    makeObservable(this);
    this.useRandomMaps = this.checkForRandomMaps();
    this.level1 = new LevelMap(1, 30, this.useRandomMaps, false);
  }

  @action reset = (startLocation: MapLocation) => {
    this.level1 = new LevelMap(1, 30, this.useRandomMaps, false);
    this.markSectionDiscovered(startLocation);
  }

  @action markSectionDiscovered = (
    coords: MapLocation
  ) => {
    this.level1.markSectionDiscovered(coords);
  }

  @action setSectionTerrain = (
    coords: MapLocation,
    terrain: Terrain
  ) => {
    this.level1.changeLevelSectionTerrain(coords, terrain);
  }

  @action setSectionWall = (
    coords: MapLocation,
    wallFace: WallFace,
    wallType: Walls
  ) => {
    this.level1.changeLevelSectionWall(coords, wallFace, wallType);
  }

  @action setRoomName = (
    roomId: number,
    name: string
  ) => {
    this.level1.changeRoomName(roomId, name);
  }

  @action setRoomDescription = (
    roomId: number,
    description: string
  ) => {
    this.level1.changeRoomDescription(roomId, description);
  }

  getWallFace(playerLocation: MapLocation, playerDirection: Direction, offset: [number, number] = [0,0]): Walls {
    const wallOffset = boundingOffsetMap[playerDirection];
    const sectionWithWall = this.level1.levelSections[`${playerLocation[0] + offset[0] + wallOffset[0]}-${playerLocation[1] + offset[1] + wallOffset[1]}`];
    if(!sectionWithWall) { return 'wall' }
    if(playerLocation[0] + wallOffset[0] + offset[0] === 0 && playerDirection === 'west') { return 'wall' }
    if(playerLocation[1] + wallOffset[1] + offset[1] === 0 && playerDirection === 'north') { return 'wall' }
    if(playerDirection === 'north' || playerDirection === 'south') {
      return sectionWithWall!.topWall;
    } else {
      return sectionWithWall!.leftWall;
    }
  }

  getFloor(playerLocation: MapLocation, offset: [number, number] = [0,0]) {
    const section = this.level1.levelSections[`${playerLocation[0] + offset[0]}-${playerLocation[1] + offset[1]}`];
    if(section) {
      return section.terrain;
    } else {
      return 'none';
    }
  }

  getSectionDiscovered(coords: MapLocation) {
    return this.level1.discoveredSections[`${coords[0]}-${coords[1]}`];
  }

  getSectionByCoords(coords: MapLocation) {
    return this.level1.levelSections[`${coords[0]}-${coords[1]}`];
  }

  checkForRandomMaps(): boolean {
    if(getCookie('useRandomMaps') === 'true') {
      return true;
    } else {
      setCookie('useRandomMaps', 'false');
      return false;
    }
  }

  toggleRandomMaps = () => {
    setCookie('useRandomMaps', `${!this.useRandomMaps}`)
    this.useRandomMaps = !this.useRandomMaps;
  }
}

const levelStore = new LevelStore();

export default levelStore;