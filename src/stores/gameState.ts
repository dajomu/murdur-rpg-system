import { action, observable, toJS } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';


export class GameStateStore {
  @observable isFighting = false;
  @observable currentRoom?: RoomData;
  // constructor() {
  //   this.useRandomMaps = this.checkForRandomMaps();
  //   this.level1 = new LevelMap(1, 30, this.useRandomMaps, false);
  // }
  @action setCurrentRoom(room?: RoomData) {
    this.currentRoom = cloneDeep(room);
    console.log(toJS(this.currentRoom));
  }
}

const gameStateStore = new GameStateStore();

export default gameStateStore;