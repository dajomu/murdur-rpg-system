import React from 'react';
import CharacterStats from '../components/CharacterStats';
import InventoryPanel from '../components/InventoryPanel';
import MapPanel from '../components/MapPanel';
import MessagesPanel from '../components/MessagesPanel';

export default class ExploreScreen extends React.Component<{}, {}> {
  constructor(props: {}) {
      super(props);

      this.state = {
      };
  }

  render() {
    return <div className="explore-screen">
      <div className="character-menu">
        <CharacterStats />
        <InventoryPanel />
        <div className="party"></div>
      </div>
      <div className="explore-pane">
        <div className="expore-encounter"></div>
        <MapPanel />
        <MessagesPanel />
      </div>
    </div>;
  }
}

//<div className=""></div>