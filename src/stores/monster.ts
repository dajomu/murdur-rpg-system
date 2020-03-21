const monsters: {[key: number]: MonsterItem} = {
  0: { name: 'Larcener', hp: 8, atk: 2, def: 2, xp: 5, gold: 10, profileImage: '/murdur-rpg-system/images/monsters/mad-wolf.jpg', alignment: 'evil', canSteal: true },
  1: { name: 'Bandit', hp: 10, atk: 3, def: 3, xp: 10, gold: 20, profileImage: '/murdur-rpg-system/images/monsters/mad-wolf.jpg', alignment: 'evil', canSteal: true },
  2: { name: 'Corridor Cleaner', hp: 12, atk: 1, def: 3, xp: 8, gold: 2, profileImage: '/murdur-rpg-system/images/monsters/mad-wolf.jpg', alignment: 'good', canSteal: false }
}

const monsterGroups: {[key: number]: MonsterGroup} = {
  0: { name: 'Single Thief', groups: [{ monsterId: 0, minCount: 1, maxCount: 1 }]},
  1: { name: 'Den of Thieves', groups: [{ monsterId: 1, minCount: 1, maxCount: 3 },{ monsterId: 0, minCount: 1, maxCount: 5 }]},
  2: { name: 'Isolated Sweeper', groups: [{ monsterId: 2, minCount: 1, maxCount: 1 }]},
  3: { name: 'Cleaning Crew', groups: [{ monsterId: 2, minCount: 2, maxCount: 6 }]}
}

export class MonsterStore {
  monsters = monsters;
  monsterGroups = monsterGroups;
}

const monsterStore = new MonsterStore();

export default monsterStore;

// { name: '', xp: 1, hp: 10, atk: 2, def: 2, profileImage: '/murdur-rpg-system/images/monsters/', alignment: 'good', canSteal: false }