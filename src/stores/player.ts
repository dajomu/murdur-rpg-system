import { observable } from 'mobx';

export class PlayerStore {
  @observable age: number = 20;
  @observable alignment: string = "Good";
  @observable race: string = "Elf";
  @observable sex: string = "Female";
}

const playerStore = new PlayerStore();

export default playerStore;