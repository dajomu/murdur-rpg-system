import { observable } from 'mobx';
import { clockwiseRotationMap, counterClockwiseRotationMap, turnAroundMap} from '../constants';

export class PlayerStore {
  @observable age: number = 20;
  @observable alignment: Alignment = 'good';
  @observable race: string = 'elf';
  @observable sex: string = 'female';
  @observable level: number = 1;
  @observable maxHits: number = 50;
  @observable currentHits: number = 50;
  @observable experience: number = 1;
  @observable gold: number = 0;
  @observable stats: Stats = {
    strength: 10,
    intelligence: 10,
    wisdom: 10,
    constitution: 10,
    charisma: 10,
    dexterity: 10,
  };
  @observable playerLocation: MapLocation = [15,15];
  @observable playerDirection: Direction = 'north';
  @observable playerInventory: { itemId: number, alignment?: Alignment }[] = [{itemId: 0},{itemId: 1, alignment: 'good'},{itemId: 2},{itemId: 3},{itemId: 4, alignment: 'neutral'}];
  @observable equippedRightHand?: number;
  @observable equippedLeftHand?: number;
  @observable equippedHelmet?: number;
  @observable equippedBodyArmour?: number;
  @observable equippedHandArmour?: number;

  public setPlayerLocation = (playerLocation: MapLocation) => {
    this.playerLocation = playerLocation;
  }

  public rotatePlayerClockwise = () => {
    this.playerDirection = clockwiseRotationMap[this.playerDirection];
  }

  public rotatePlayerCounterClockwise = () => {
    this.playerDirection = counterClockwiseRotationMap[this.playerDirection];
  }

  public turnAround = () => {
    this.playerDirection = turnAroundMap[this.playerDirection];
  }
}

const playerStore = new PlayerStore();

export default playerStore;