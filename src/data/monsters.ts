export const monsters: {[key: string]: MonsterItem} = {
    0: { id: '0', name: 'Larcener', hp: 8, atk: 7, def: 5, xp: 5, gold: 10, guild: 2, maxLevel: 1, profileImage: '/murdur-rpg-system/images/monsters/mad-wolf.jpg', alignment: 'evil', canSteal: true, stats: {strength: 5, intelligence: 5, wisdom: 5,constitution: 5,charisma: 5, dexterity: 5} },
    1: { id: '1',name: 'Bandit', hp: 10, atk: 9, def: 8, xp: 10, gold: 20, guild: 2, maxLevel: 1, profileImage: '/murdur-rpg-system/images/monsters/mad-wolf.jpg', alignment: 'evil', canSteal: true, stats: {strength: 5, intelligence: 5, wisdom: 5,constitution: 5,charisma: 5, dexterity: 5} },
    2: { id: '2',name: 'Corridor Cleaner', hp: 12, atk: 9, def: 9, xp: 8, guild: 0, maxLevel: 1, gold: 2, profileImage: '/murdur-rpg-system/images/monsters/mad-wolf.jpg', alignment: 'good', canSteal: false, stats: {strength: 5, intelligence: 5, wisdom: 5,constitution: 5,charisma: 5, dexterity: 5} }
}
  
export const monsterGroups: {[key: string]: MonsterGroup} = {
    0: { name: 'Single Thief', groups: [{ monsterId: 0, minCount: 1, maxCount: 1 }]},
    1: { name: 'Den of Thieves', groups: [{ monsterId: 1, minCount: 1, maxCount: 3 },{ monsterId: 0, minCount: 1, maxCount: 5 }]},
    2: { name: 'Isolated Sweeper', groups: [{ monsterId: 2, minCount: 1, maxCount: 1 }]},
    3: { name: 'Cleaning Crew', groups: [{ monsterId: 2, minCount: 2, maxCount: 6 }]}
}
