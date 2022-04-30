import React, { useContext, useEffect } from 'react';
// import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

import exploreController from '../controllers/exploreController';
import gameContext from './ComponentWithGameContext';

interface MapPanelState {
  playerLocation: MapLocation;
}

// @observer 
// class MapPanel extends ComponentWithGameContext<{}, MapPanelState> {  
const MapPanel = observer(() => {

  const context = useContext(gameContext) // See the Timer definition above.

  console.log(context);

  useEffect(() => {
    context.levelStore.level1.markSectionDiscovered(context.playerStore.playerLocation);
    exploreController.setupKeyboardListeners();
    return function cleanup() {
      exploreController.removeKeyboardListeners();
    };  
  });

  const {levelStore, playerStore} = context;
  const {playerLocation, playerDirection} = playerStore;
  console.log('change', playerLocation, playerDirection);
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
})

export default MapPanel;
