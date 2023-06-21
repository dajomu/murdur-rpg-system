// type EquipmentType = 'weapon' | 'head-armour' | 'body-armour' | 'hand-armour' | 'shield';

// interface InventoryItem {
//   name: string;
//   baseValue: number;
//   alignment?: Alignment;
//   canBeEquiped: boolean;
//   equipmentType?: EquipmentType;
// }

interface Guild {
  name: string;
  xpScale: number;
  guildFightingMod: number;
};

const guildsStore: {[key: number]: Guild} = {
  0: {name: 'Nomad', xpScale: 1, guildFightingMod: 0.7},
  1: {name: 'Warrior', xpScale: 1, guildFightingMod: 1.2},
  2: {name: 'Thieves', xpScale: 1, guildFightingMod: 0.85},
}

export default guildsStore;
