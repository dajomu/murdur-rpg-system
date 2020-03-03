import { observable } from 'mobx';
import LevelMap from '../dataObjects/LevelMap';

export class LevelStore {
  @observable level1: LevelMap;
  constructor() {
    this.level1 = new LevelMap(30);
  }
}

const levelStore = new LevelStore();

export default levelStore;