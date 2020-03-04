import { action, observable } from 'mobx';
import LevelMap from '../dataObjects/LevelMap';

export class LevelStore {
  @observable level1: LevelMap;
  @observable playerLocation: [number, number] = [0,0];
  constructor() {
    this.level1 = new LevelMap(30);
  }

  @action markSectionDiscovered = (
    coords: [number, number]
  ) => {
    this.level1.markSectionDiscovered(coords);
  }

  isSectionDiscovered(coords: [number, number]) {
    return this.level1.discoveredSections[`${coords[0]}-${coords[1]}`] ? this.level1.discoveredSections[`${coords[0]}-${coords[1]}`].tile : false;
  }
}

const levelStore = new LevelStore();

export default levelStore;