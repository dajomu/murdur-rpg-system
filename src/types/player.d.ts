type Alignment = 'good' | 'neutral' | 'evil';

interface PlayerDefaults {
  age: number,
  level: number,
  maxHits: number,
  currentHits: number,
  experience: number,
  gold: number,
  stats: Stats,
  playerLocation: MapLocation,
  playerDirection: Direction,
  playerInventory: InventoryedItems[],
  equippedRightHand?: number,
  equippedLeftHand?: number,
  equippedHelmet?: number,
  equippedBodyArmour?: number,
  equippedHandArmour?: number,
  guild: number,
  guilds: {[key: number]: number}
}

interface Stats {
  strength: number;
  intelligence: number;
  wisdom: number;
  constitution: number;
  charisma: number;
  dexterity: number;
}