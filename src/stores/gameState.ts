import { action, makeObservable, observable, toJS } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';

type GameState = 'EXPLORE' | 'DEAD';

export class GameStateStore {
  @observable currentMonsterAttackResult?: AttackResult;
  @observable currentPlayerAttackResult?: AttackResult;
  @observable currentRoom?: RoomData;
  @observable currentTargettedGroup: 0 | 1 | 2 | 3 = 0;
  @observable gameState: GameState = 'EXPLORE';

  constructor() {
    makeObservable(this);
  }

  @action reset(gameState?: GameState) {
    this.currentMonsterAttackResult = undefined;
    this.currentPlayerAttackResult = undefined;
    this.currentRoom = undefined;
    this.currentTargettedGroup = 0;
    this.gameState = gameState || 'EXPLORE';
  }

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
        this.currentPlayerAttackResult = currentAttackResult === 0 ? 'missed' : currentAttackResult;
      } else if (typeof currentFighter === 'number') {
        this.currentMonsterAttackResult = currentAttackResult === 0 ? 'missed' : currentAttackResult;
      }
  }

  @action hurtcurrentTargettedGroup(damage: number) {
    if(this.currentRoom && this.currentRoom.groups.length) {
      this.checkAndFilterCurrentGroups();
      if(!this.currentRoom.groups[this.currentTargettedGroup]) {
        this.currentTargettedGroup = 0;
      }
      const currentGroup = this.currentRoom.groups[this.currentTargettedGroup];
      const currentMonsterHealth = currentGroup.monsterHealth[currentGroup.monsterHealth.length - 1];
      if(currentMonsterHealth && currentMonsterHealth - damage > 0) {
        currentGroup.monsterHealth[currentGroup.monsterHealth.length - 1] = currentMonsterHealth - damage;
      } else if (currentMonsterHealth && currentMonsterHealth - damage <= 0) {
        currentGroup.monsterHealth = currentGroup.monsterHealth.slice(0, currentGroup.monsterHealth.length - 1);
        this.currentRoom.groups[this.currentTargettedGroup] = currentGroup;
      }
      this.checkAndFilterCurrentGroups();
    }
  }

  checkAndFilterCurrentGroups() {
    if(this.currentRoom && this.currentRoom.groups.length) {
      this.currentRoom.groups = this.currentRoom.groups.filter(group => {
        return group.monsterHealth.length > 0;
      })
    }
    if(this.currentRoom && this.currentRoom.groups.length === 0) {
      this.currentRoom.isFighting = false;
    }
  }

  @action setDead() {
    console.log("this.gameState = 'DEAD'");
    this.gameState = 'DEAD';
  }
}

const gameStateStore = new GameStateStore();

export default gameStateStore;