type EquipmentType = 'weapon' | 'head-armour' | 'body-armour' | 'hand-armour' | 'shield';

interface InventoryItem {
  name: string;
  baseValue: number;
  alignment?: Alignment;
  canBeEquiped: boolean;
  equipmentType?: EquipmentType;
}

interface InventoryedItems {
  itemId: number;
  alignment?: Alignment;
  count?: number;
}