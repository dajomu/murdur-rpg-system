import { observable } from 'mobx';
import { clockwiseRotationMap, counterClockwiseRotationMap, turnAroundMap} from '../constants';

const startLocation: MapLocation = [15,15];

const defaultStats: Stats = {
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  wisdom: 10,
  constitution: 10,
  charisma: 10,
};

const defaultInventory: InventoryedItems[] = [{itemId: 0},{itemId: 1, alignment: 'good'},{itemId: 2},{itemId: 3},{itemId: 4, alignment: 'neutral'}];

const playerDefaults: PlayerDefaults = {
  age: 20,
  level: 1,
  maxHits: 20,
  currentHits: 20,
  experience: 0,
  gold:0,
  stats: {...defaultStats},
  playerLocation: ([...startLocation] as MapLocation),
  playerDirection: 'north',
  playerInventory: [...defaultInventory],
  equippedRightHand: undefined,
  equippedLeftHand: undefined,
  equippedHelmet: undefined,
  equippedBodyArmour: undefined,
  equippedHandArmour: undefined,
  guild: 0,
  guilds: {0: 1}
}

export class PlayerStore {
  @observable age: number = 20;
  @observable alignment: Alignment = 'good';
  @observable race: string = 'elf';
  @observable sex: string = 'female';
  @observable level: number = 1;
  @observable maxHits: number = 20;
  @observable currentHits: number = 2;
  @observable experience: number = 1;
  @observable gold: number = 0;
  @observable atk: number;
  @observable def: number;
  @observable stats: Stats = {
    strength: 10,
    dexterity: 10,
    intelligence: 10,
    wisdom: 10,
    constitution: 10,
    charisma: 10,
  };
  @observable playerLocation: MapLocation = [15,15];
  @observable playerDirection: Direction = 'north';
  @observable playerInventory: { itemId: number, alignment?: Alignment }[] = [];
  @observable equippedRightHand?: number;
  @observable equippedLeftHand?: number;
  @observable equippedHelmet?: number;
  @observable equippedBodyArmour?: number;
  @observable equippedHandArmour?: number;
  @observable maxLevel: number = 1;
  @observable guild: number = 0;
  @observable guilds: {[key: number]: number} = {
    0: 1,
  };

  constructor() {
    this.loadDefaults();
    this.atk = this.calculateAtk();
    this.def = this.calculateDef();
  }

  public loadDefaults() {
    Object.assign(this, playerDefaults);
  }

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

  public setDead = () => {
    this.currentHits = 0;
  }

  public hurtPlayer = (damage: number) => {
    this.currentHits -= damage;
  }

  public calculateAtk = (): number => {
    return this.stats.strength;
  }

  public calculateDef = (): number => {
    return this.stats.dexterity;
  }

  public increaseExperience = (experienceIncrease: number) => {
    this.experience += experienceIncrease;
  }
}

const playerStore = new PlayerStore();

export default playerStore;