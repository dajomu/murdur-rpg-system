type EquipmentType = 'weapon' | 'head-armour' | 'body-armour' | 'hand-armour' | 'shield';

interface InventoryItem {
  name: string;
  baseValue: number;
  alignment?: Alignment;
  canBeEquiped: boolean;
  equipmentType?: EquipmentType;
}

const itemsStore: {[key: number]: InventoryItem} = {
  0: { name: 'Iron Sword', baseValue: 10, canBeEquiped: true, equipmentType: 'weapon' },
  1: { name: 'Iron Shield', baseValue: 10, canBeEquiped: true, equipmentType: 'shield' },
  2: { name: 'Iron Helmet', baseValue: 10, canBeEquiped: true, equipmentType: 'head-armour' },
  3: { name: 'Iron Cuirass', baseValue: 10, canBeEquiped: true, equipmentType: 'body-armour' },
  4: { name: 'Iron Bracers', baseValue: 10, canBeEquiped: true, equipmentType: 'hand-armour' }
}

export default itemsStore;

// { name: '', baseValue: 1, alignment: 'good', canBeEquiped: true, equipmentType: 'weapon' }