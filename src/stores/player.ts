import { observable } from 'mobx';

interface Stats {
  strength: number;
  intelligence: number;
  wisdom: number;
  constitution: number;
  charisma: number;
  dexterity: number;
}

export class PlayerStore {
  @observable age: number = 20;
  @observable alignment: string = "Good";
  @observable race: string = "Elf";
  @observable sex: string = "Female";
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
  }
  @observable playerLocation: [number, number] = [15,15];

  public setPlayerLocation = (playerLocation: [number, number]) => {
    this.playerLocation = playerLocation;
  }

  // public movePlayerNorth() {
  //   if (this.playerLocation[1] > 0) {
  //     this.playerLocation = 
  //   }
  // }
}

const playerStore = new PlayerStore();

export default playerStore;