import { action, observable, get, set } from 'mobx';
import { monsters, monsterGroups } from '../data/monsters';

export const baseMonster: MonsterItem = {
  id: '100',
  name: 'none',
  hp: 1,
  atk: 1,
  def: 1,
  xp: 1,
  gold: 1,
  profileImage: '/murdur-rpg-system/images/monsters/mad-wolf.jpg',
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

export const baseMonsterGroup: MonsterGroup = {
  name: 'new group',
  groups: [],
}

export class MonsterStore {
  monsters = observable.map(monsters);
  monsterGroups = observable.map(monsterGroups);

  getMonster = (
    monsterId: string,
  ): MonsterItem => {
    const monster = get(this.monsters, monsterId);
    return typeof monster === 'undefined' ? baseMonster : monster;
  }

  getMonsterGroup = (
    monsterGroupId: string,
  ): MonsterGroup => {
    const monsterGroup = get(this.monsterGroups, monsterGroupId);
    return monsterGroup as MonsterGroup;
  }

  @action upsertMonster = (
    monsterId: string,
    monsterDetails: MonsterItem
  ) => {
    set(this.monsters, {[monsterId]: monsterDetails})
  }

  @action upsertMonsterGroup = (
    monsterGroupId: string,
    monsterDetails: MonsterGroup
  ) => {
    set(this.monsterGroups, {[monsterGroupId]: monsterDetails})
  }

  getMonsterCount = () => {
    return this.monsters.size;
  }

  getMonsterGroupsCount = () => {
    return this.monsterGroups.size;
  }
}

const monsterStore = new MonsterStore();

export default monsterStore;
