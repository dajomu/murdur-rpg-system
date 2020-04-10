import { action, observable, toJS } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';

type AttackResult = number | 'missed' | 'kill';

export class GameStateStore {
  @observable currentMonsterAttackResult?: AttackResult;
  @observable currentPlayerAttackResult?: AttackResult;
  @observable currentRoom?: RoomData;

  @action setCurrentRoom(room?: RoomData) {
    this.currentRoom = cloneDeep(room);
    this.currentMonsterAttackResult = undefined;
    this.currentPlayerAttackResult = undefined;
    console.log(toJS(this.currentRoom));
  }

  @action startFight(currentFighter: CurrentFighter) {
    if(this.currentRoom && !this.currentRoom.isFighting) {
      this.currentRoom.isFighting = true;
      this.setCurrentFighter(currentFighter);
    }
  }

  @action setCurrentFighter(currentFighter: CurrentFighter) {
    if(this.currentRoom) {
      this.currentRoom = {...this.currentRoom, currentFighter};
    }
  }

  @action setCurrentAttackResult(currentFighter: CurrentFighter, currentAttackResult: AttackResult) {
    console.log('fight!', currentFighter, currentAttackResult);
      if(currentFighter === 'player') {
        this.currentPlayerAttackResult = currentAttackResult;
      } else if (typeof currentFighter === 'number') {
        this.currentMonsterAttackResult = currentAttackResult;
      }
  }
}

const gameStateStore = new GameStateStore();

export default gameStateStore;