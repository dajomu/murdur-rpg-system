import React from 'react';
import CharacterStats from '../components/CharacterStats';
import EncounterPane from '../components/EncounterPane';
import InventoryPanel from '../components/InventoryPanel';
import MapPanel from '../components/MapPanel';
import MessagesPanel from '../components/MessagesPanel';
import DeathModal from '../components/DeathModal';
import { ComponentWithGameContext } from '../components/ComponentWithGameContext';


export default class ExploreScreen extends ComponentWithGameContext {
  constructor(props: {}) {
      super(props);

      this.state = {
      };
  }

  render() {
    const {gameStateStore} = this.context;
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
  }
}

//<div className=""></div>