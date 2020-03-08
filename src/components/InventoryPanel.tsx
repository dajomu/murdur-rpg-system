import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class InventoryPanel extends ComponentWithGameContext {
  render() {
    const { itemsStore, playerStore } = this.context;
    return <div className="character-inventory">
      <ol className="character-inventory-list">
        {playerStore.playerInventory.map((inventoryItem, inventoryIndex) => {
          const item = itemsStore[inventoryItem.itemId];
          return !!item ? <li key={"inventory-" + inventoryIndex}>{`${item.name} ${inventoryItem.alignment ? '(' + inventoryItem.alignment.charAt(0)+')' : ''}`}</li> : null})}
      </ol>
    </div>;
  }
}

export default InventoryPanel;
