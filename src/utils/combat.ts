import {PlayerStore} from '../stores/player';
import guildStore from '../stores/guilds';
type AttackerDefender = MonsterItem | PlayerStore;

export function getGuildFightingMod(attacker: AttackerDefender): number {
  return guildStore[attacker.guild].guildFightingMod;
}

export function guildLevelDamageModifier(guildLevel: number) {
  return (Math.log(guildLevel + 5) + 1) / Math.log(1.2)
}

export function calculateStrengthValue(strengthStat: number): number {
  return Math.round(
    strengthStat
    - (Math.log(strengthStat) * ((Math.log(strengthStat) - 2.4) * 2.25))
    + 1
  );
}

export function strengthModifierOne(strengthValue: number) : number {
  return Math.round(
    (Math.random() * ((strengthValue + 10) / 2)) + ((strengthValue + 10) / 4)
  ) / 10;
}

export function strengthModifierTwo(strengthValue: number) : number {
  return strengthValue / 30;
}

export function getDamageModifier(attacker: AttackerDefender) {
  const damageModifer = 0.6 + (((Math.log(100 + attacker.maxLevel) / 1.75) - 2.3) * getGuildFightingMod(attacker) ^2 / 2)
  // do these later
  // 2: * WeaponModifier
  // 3: + 5 if Critical Hit, Chance see below
  // 4: + 2 if Backstab, Chance see below
  // 5: / 2 if Monster is invisible and character can't see invisible
  // 6: +0.1/-0.1 per size bigger/smaller than monster
  return damageModifer > 1 ? damageModifer - Math.log(damageModifer) ^ 2 : damageModifer;
}

export function calculateFightDamage(attacker: AttackerDefender,  defender: AttackerDefender) {
  const strengthValue = calculateStrengthValue(attacker.stats.strength);
  console.log('!!!!', attacker.maxLevel, guildLevelDamageModifier(attacker.maxLevel), strengthModifierOne(strengthValue), strengthModifierTwo(strengthValue), getDamageModifier(attacker));
  return Math.round((guildLevelDamageModifier(attacker.maxLevel) * strengthModifierOne(strengthValue) * strengthModifierTwo(strengthValue) * getDamageModifier(attacker)) 
    - Math.round(1 + Math.random() * (defender.def - attacker.atk)/8));
}

export function chanceToHit(atk: number, def: number):number {
  const divisor = atk > def ? atk : def;
  return 0.5 * (1 + (atk - def)/divisor);
}
// Monster Chance To Hit
// If MonAtk = CharDef: %Chance = 50
// If MonAtk > CharDef: %Chance = 50 + (50 * (MonAtk - CharDef) / MonAtk)
// If MonAtk < CharDef: %Chance = 50 - (50 * (CharDef - MonAtk) / CharDef)
// Minimum 2%, Maximum 98%

// export function criticalChance(attackerLevel: number, defenderLevel: number): number {
//   return Math.log((attackerLevel / 999) + 1) * 100
// }

// ((((LN((GLvl / 999) + 1) * 100) * LN(CritMod + 1)) / 3) - (LN((MonLvl / 999) + 1)) * 100))/2 + Ln(ItemDropLevel+1) * Ln(10)

// Minimum 1% (if the character has any critical hit ability) or whatever the weapon's crit % is (see below)
// Maximum 50% (although 33.1% is the highest that can be achieved in-game)

// CritMod = Value found in Help File, i.e., Warrior = 9, Seeker = 3

// Backstab
// ((((LN((GLvl / 999) + 1) * 100) * LN(BSMod + 1)) / 3) - (LN((MonLvl / 999) + 1)) * 100))/2 + Ln(ItemDropLevel+1) * Ln(100)

// Minimum 2% (if the character has any backstab ability) or whatever the weapon's backstab % is (see below)
// Maximum 75% (although 39.4% is the maximum that can be achieved in-game)

// BSMod = Value found in Help File, i.e, Thief = 9, Ninja = 2