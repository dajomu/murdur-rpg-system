import {monsters, monsterGroups} from '../data/monsters';

export class MonsterStore {
  monsters = monsters;
  monsterGroups = monsterGroups;
}

const monsterStore = new MonsterStore();

export default monsterStore;

// { name: '', xp: 1, hp: 10, atk: 2, def: 2, profileImage: '/murdur-rpg-system/images/monsters/', alignment: 'good', canSteal: false }
// stats: {strength: 5, intelligence: 5, wisdom: 5,constitution: 5,charisma: 5, dexterity: 5}