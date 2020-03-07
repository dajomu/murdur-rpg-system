import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

import exploreController from '../controllers/exploreController';

interface MapPanelState {
  playerLocation: [number, number];
}

@observer 
class MapPanel extends ComponentWithGameContext<{}, MapPanelState> {  
  componentWillMount() {
    this.context.levelStore.level1.markSectionDiscovered(this.context.playerStore.playerLocation);
  }

  componentDidMount() {
    exploreController.setupKeyboardListeners();
  }

  componentWillUnmount() {
    exploreController.removeKeyboardListeners();
  }

  render() {
    const {levelStore, playerStore} = this.context;
    const {playerLocation, playerDirection} = playerStore;
    return <div className="explore-map">
      <div className="map-container" style={{width: levelStore.level1.size * 14, height: levelStore.level1.size * 14}}>
        {levelStore.level1.levelSections.map(section => {
          const isPlayerLocation = section.coords[0] === playerLocation[0] && section.coords[1] === playerLocation[1];
          const isSectionDiscovered = levelStore.getSectionDiscovered(section.coords);
          const wallClasses = `${isSectionDiscovered.leftWall ? "wall-left-"  + section.leftWall : ""} ${isSectionDiscovered.topWall ? "wall-top-"  + section.topWall : ""}`;
          const sectionClass = isSectionDiscovered.tile ?
            "map-square " + wallClasses + ' discovered-' + section.terrain:
            "map-square " + wallClasses;
          return <div key={section.coords[0] + "-" + section.coords[1]} className={sectionClass}>
            {isPlayerLocation ? <img src="/murdur-rpg-system/images/arrowUp-pink.png" alt="player" className={"player-sprite " + playerDirection} /> : null}
          </div>;
        })}
      </div>
    </div>;
  }
}

export default MapPanel;
