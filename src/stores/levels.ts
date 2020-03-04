import { action, observable } from 'mobx';
import LevelMap from '../dataObjects/LevelMap';

export class LevelStore {
  @observable level1: LevelMap;
  // @observable playerLocation: [number, number] = [15,15];
  constructor() {
    this.level1 = new LevelMap(30);
  }

  @action markSectionDiscovered = (
    coords: [number, number]
  ) => {
    this.level1.markSectionDiscovered(coords);
  }

  getSectionDiscovered(coords: [number, number]) {
    return this.level1.discoveredSections[`${coords[0]}-${coords[1]}`];
  }

  getSectionByCoords(coords: [number, number]) {
    return this.level1.levelSections.find(section => coords[0] === section.coords[0] && coords[1] === section.coords[1]);
  }
}

const levelStore = new LevelStore();

export default levelStore;