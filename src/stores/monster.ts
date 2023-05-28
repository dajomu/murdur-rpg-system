import { action, observable, get, set } from 'mobx';
import { isUndefined } from 'lodash';
import { monsters, monsterGroups } from '../data/monsters';

const basicMonster: MonsterItem = {
  id: '100',
  name: 'none',
  hp: 1,
  atk: 1,
  def: 1,
  xp: 1,
  gold: 1,
  profileImage: '',
  guild: 1,
  maxLevel: 1,
  alignment: 'good',
  canSteal: false,
  stats: {
    strength: 1,
    intelligence: 1,
    wisdom: 1,
    constitution: 1,
    charisma: 1,
    dexterity: 1,
  }
}

export class MonsterStore {
  monsters = observable.map(monsters);
  @observable monsterGroups = monsterGroups;

  getMonster = (
    monsterId: string,
  ): MonsterItem => {
    const monster = get(this.monsters, monsterId);
    return typeof monster === 'undefined' ? basicMonster : monster;
  }

  @action upsertMonster = (
    monsterId: string,
    monsterDetails: MonsterItem
  ) => {
    console.log(monsterId, monsterDetails)
    set(this.monsters, {[monsterId]: monsterDetails})
  }
}

const monsterStore = new MonsterStore();

export default monsterStore;

// interface MonsterItem {
//   name: string;
//   hp: number;
//   atk: number,
//   def: number,
//   xp: number;
//   gold: number;
//   profileImage: string;
//   alignment?: Alignment;
//   canSteal?: boolean;
//   guild: number;
//   maxLevel: number;
//   stats: Stats;
// }

// { name: '', xp: 1, hp: 10, atk: 2, def: 2, profileImage: '/murdur-rpg-system/images/monsters/', alignment: 'good', canSteal: false }
// stats: {strength: 5, intelligence: 5, wisdom: 5,constitution: 5,charisma: 5, dexterity: 5}