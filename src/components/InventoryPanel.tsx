import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react"

const InventoryPanel = observer(() => {
  const context = useContext(gameContext);
  const { itemsStore, playerStore } = context;
  return <div className="character-inventory">
    <ol className="character-inventory-list">
      {playerStore.playerInventory.map((inventoryItem, inventoryIndex) => {
        const item = itemsStore[inventoryItem.itemId];
        return !!item ? <li key={"inventory-" + inventoryIndex}>{`${item.name} ${inventoryItem.alignment ? '(' + inventoryItem.alignment.charAt(0)+')' : ''}`}</li> : null})}
    </ol>
  </div>;
})

export default InventoryPanel;
