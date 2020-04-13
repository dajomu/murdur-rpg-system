import {PlayerStore} from '../stores/player';
import guildStore from '../stores/guilds';
type AttackerDefender = MonsterItem | PlayerStore;

export function getGuildFightingMod(attacker: AttackerDefender): number {
  return guildStore[attacker.guild].guildFightingMod;
}

export function guildLevelDamageModifier(guildLevel: number) {
  // LvlMod = (Ln(GLvl + 5) + 1) / Ln(1.2)
  return (Math.log(guildLevel + 5) + 1) / Math.log(1.2);
}

export function calculateStrengthValue(strengthStat: number): number {
  // Int(Strength - (LN(Strength) * ((LN(Strength) - 2,4) * 2,25))) + 1
  return Math.floor(
    strengthStat
    - (Math.log(strengthStat) * ((Math.log(strengthStat) - 2.4) * 2.25))
    + 1
  );
}

export function strengthModifierOne(strengthValue: number) : number {
  // StrMod1 = Int((Rnd * ((BSV + 10) / 2)) + ((BSV + 10) / 4)) / 10
  return Math.floor(
    (Math.random() * ((strengthValue + 10) / 2)) + ((strengthValue + 10) / 4)
  ) / 10;
}

export function strengthModifierTwo(strengthValue: number) : number {
  // StrMod2 = BSV/30
  return strengthValue / 30;
}

export function getDamageModifier(attacker: AttackerDefender) {
  const damageModifer = 0.6 + (((Math.log(100 + attacker.maxLevel) / 1.75) - 2.3) * Math.pow(getGuildFightingMod(attacker), 2) / 2)
  // 1: DamMod = 0.6 + (((Ln(100 + GLvl) / 1.75) - 2.3) * FightingMod^2 / 2)
  // do these later
  // 2: * WeaponModifier
  // 3: + 5 if Critical Hit, Chance see below
  // 4: + 2 if Backstab, Chance see below
  // 5: / 2 if Monster is invisible and character can't see invisible
  // 6: +0.1/-0.1 per size bigger/smaller than monster
  return damageModifer > 1 ? damageModifer - Math.pow(Math.log(damageModifer), 2) : damageModifer;
  // 7: if DamMod is > 1, then DamMod = DamMod - ln(DamMod)^2
}

export function calculateFightDamage(attacker: AttackerDefender,  defender: AttackerDefender) {
  const strengthValue = calculateStrengthValue(attacker.stats.strength);
  return Math.round((guildLevelDamageModifier(attacker.maxLevel) * strengthModifierOne(strengthValue) * strengthModifierTwo(strengthValue) * getDamageModifier(attacker)) 
    - Math.floor(1 + Math.random() * (defender.def - attacker.atk)/8));
}
/*
GLvl = Guild Level with best fighting ability, should be the same as the one in "Guild" Tab
FightingMod = Value found in Help File / 10, i.e., Warrior = 1.2, Nomad = 0.7
Size = Range [0 to 5] or Very Small, Small, Normal, Big, Very Big, Huge
Ln stands for natural logarithm.
Rnd is a number ranging from 0 to 0.999.. (not 1, this is important because it produces different top values).

This is the Damage Modifier, a bit more complex than I expected really
1: DamMod = 0.6 + (((Ln(100 + GLvl) / 1.75) - 2.3) * FightingMod^2 / 2)
2: * WeaponModifier
3: + 5 if Critical Hit, Chance see below
4: + 2 if Backstab, Chance see below
5: / 2 if Monster is invisible and character can't see invisible
6: +0.1/-0.1 per size bigger/smaller than monster
7: if DamMod is > 1, then DamMod = DamMod - ln(DamMod)^2
Value 0.1 to 7ish (Lv 999 Human Warrior with a Mod 2.6 Weapon, severing a Tiny monster)

Let's get the Strength Modifier, it's actually 2 parts, and requires a new Strength Value (called BSV here)
BSV = Int(Strength - (LN(Strength) * ((LN(Strength) - 2,4) * 2,25))) + 1
StrMod1 = Int((Rnd * ((BSV + 10) / 2)) + ((BSV + 10) / 4)) / 10
StrMod2 = BSV/30
Str 1 to 40 -> Value [0.3-0.8 * 0.06667] to [1-2.9 * 1] Note, this value is the 2 StrMods combined

And last part of formula, Level Modifier.
LvlMod = (Ln(GLvl + 5) + 1) / Ln(1.2)
Lvl 1 to 999 -> Value 15.31228 to 43.39447

Base Damage = LvlMod * StrMod1 * StrMod2 * DamMod
Final Damage = Base - Rnd[1 to (Def-Atk)/8] or very close to this
Defense bug lurks though, so it's just:
Final Damage = Base + Rnd[1 to Atk/8]
*/

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