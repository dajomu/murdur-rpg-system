import { action, observable } from 'mobx';

export class GameStateStore {
  @observable isFighting = false;
  @observable monsters = [];
  // constructor() {
  //   this.useRandomMaps = this.checkForRandomMaps();
  //   this.level1 = new LevelMap(1, 30, this.useRandomMaps, false);
  // }
  @action setMonsters() {

  }
}

const gameStateStore = new GameStateStore();

export default gameStateStore;