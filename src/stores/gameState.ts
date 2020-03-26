import { action, observable, toJS } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';


export class GameStateStore {
  @observable currentRoom?: RoomData;

  @action setCurrentRoom(room?: RoomData) {
    this.currentRoom = cloneDeep(room);
    console.log(toJS(this.currentRoom));
  }

  @action startFight() {
    if(this.currentRoom) {
      this.currentRoom.isFighting = true;
    }
  }
}

const gameStateStore = new GameStateStore();

export default gameStateStore;