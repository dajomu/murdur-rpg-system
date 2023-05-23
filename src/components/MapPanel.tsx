import React, { useContext, useEffect } from 'react';
import { observer } from "mobx-react"

import exploreController from '../controllers/exploreController';
import gameContext from '../stores/gameContext';

const MapPanel = observer(({showRoomNumbers = false}) => {

  const context = useContext(gameContext);

  useEffect(() => {
    context.levelStore.level1.markSectionDiscovered(context.playerStore.playerLocation);
    exploreController.setupKeyboardListeners();
    return function cleanup() {
      exploreController.removeKeyboardListeners();
    };  
  });

  const {editStore, levelStore, playerStore} = context;
  const {playerLocation, playerDirection} = playerStore;
  const {isEditing, selectedEditTile, selectTileForEditing} = editStore;

  return <div className="explore-map">
    <div className="map-container" style={{width: levelStore.level1.size * 14, height: levelStore.level1.size * 14}}>
      {Object.values(levelStore.level1.levelSections).map(section => {
        const isPlayerLocation = section.coords[0] === playerLocation[0] && section.coords[1] === playerLocation[1];
        const isSectionDiscovered = levelStore.getSectionDiscovered(section.coords);
        const wallClasses = `${isEditing || isSectionDiscovered.leftWall ? "wall-left-"  + section.leftWall : ""} ${isEditing || isSectionDiscovered.topWall ? "wall-top-"  + section.topWall : ""}`;
        const sectionClass = `map-square ${wallClasses} ${isEditing || isSectionDiscovered.tile ? 'discovered-' + section.terrain : ''} ${isEditing && selectedEditTile[0] === section.coords[0] && selectedEditTile[1] === section.coords[1] ? 'edit-selected-tile' : ''}`;
        return <div
                  key={section.coords[0] + "-" + section.coords[1]}
                  className={sectionClass}
                  onClick={() => {
                    if (isEditing) {
                      selectTileForEditing(section.coords);
                    }
                  }}>{showRoomNumbers ? section.roomId : ""}
          {isPlayerLocation ? <img src="/murdur-rpg-system/images/arrowUp-pink.png" alt="player" className={"player-sprite " + playerDirection} /> : null}
        </div>;
      })}
    </div>
  </div>;
})

export default MapPanel;
