import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react"
import CharacterStats from '../components/CharacterStats';
import EncounterPane from '../components/EncounterPane';
import InventoryPanel from '../components/InventoryPanel';
import MapPanel from '../components/MapPanel';
import MessagesPanel from '../components/MessagesPanel';
import DeathModal from '../components/DeathModal';

export default observer(() => {
  const context = useContext(gameContext);
  const {gameStateStore} = context;
  return <div className="explore-screen">
    <div className="character-menu">
      <CharacterStats />
      <InventoryPanel />
      <div className="party"></div>
    </div>
    <div className="explore-pane">
      <EncounterPane />
      <MapPanel />
      <MessagesPanel />
    </div>
    {gameStateStore.gameState === "DEAD" && <DeathModal />}
  </div>;
});
