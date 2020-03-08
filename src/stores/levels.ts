import { action, observable } from 'mobx';
import { getCookie, setCookie } from '../utils/cookie';
import LevelMap from '../dataObjects/LevelMap';

export class LevelStore {
  @observable useRandomMaps: boolean;
  @observable level1: LevelMap;
  constructor() {
    this.useRandomMaps = this.checkForRandomMaps();
    this.level1 = new LevelMap(1, 30, this.useRandomMaps);
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