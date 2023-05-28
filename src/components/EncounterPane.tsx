import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { clockwiseRotationMap, counterClockwiseRotationMap, movementOffsetMap, offsetMap} from '../constants';
import { comboCoordinates, getViewTerrainMapAtCoordinates, getViewFacingWallMapAtCoordinates } from '../utils/encounterPane';
import {isUndefined} from 'lodash';
import { observer } from "mobx-react";

const EncounterPane = observer(() => {

  const context = useContext(gameContext);

  const getWallFaces = () => {
    const {levelStore, playerStore} = context;
    const {playerLocation, playerDirection} = playerStore;
    return {
      front: levelStore.getWallFace(playerLocation, playerDirection),
      frontLeft: levelStore.getWallFace(comboCoordinates(playerLocation, offsetMap[counterClockwiseRotationMap[playerDirection]]), playerDirection),
      frontRight: levelStore.getWallFace(comboCoordinates(playerLocation, offsetMap[clockwiseRotationMap[playerDirection]]), playerDirection),
      forwardFront: levelStore.getWallFace(playerLocation, playerDirection, movementOffsetMap[playerDirection]),
      forwardFrontLeft: levelStore.getWallFace(comboCoordinates(playerLocation, offsetMap[counterClockwiseRotationMap[playerDirection]]), playerDirection, movementOffsetMap[playerDirection]),
      forwardFrontRight: levelStore.getWallFace(comboCoordinates(playerLocation, offsetMap[clockwiseRotationMap[playerDirection]]), playerDirection, movementOffsetMap[playerDirection]),
      left: levelStore.getWallFace(playerLocation, counterClockwiseRotationMap[playerDirection]),
      forwardLeft: levelStore.getWallFace(playerLocation, counterClockwiseRotationMap[playerDirection], movementOffsetMap[playerDirection]),
      right: levelStore.getWallFace(playerLocation, clockwiseRotationMap[playerDirection]),
      forwardRight: levelStore.getWallFace(playerLocation, clockwiseRotationMap[playerDirection], movementOffsetMap[playerDirection]),
    }
  }

  const getFloors = () => {
    const {levelStore, playerStore} = context;
    const {playerLocation, playerDirection} = playerStore;
    return {
      left: levelStore.getFloor(comboCoordinates(playerLocation, offsetMap[counterClockwiseRotationMap[playerDirection]])),
      front: levelStore.getFloor(playerLocation),
      right: levelStore.getFloor(comboCoordinates(playerLocation, offsetMap[clockwiseRotationMap[playerDirection]])),
      forwardLeft: levelStore.getFloor(comboCoordinates(playerLocation, offsetMap[counterClockwiseRotationMap[playerDirection]]), movementOffsetMap[playerDirection]),
      forward: levelStore.getFloor(playerLocation, movementOffsetMap[playerDirection]),
      forwardRight: levelStore.getFloor(comboCoordinates(playerLocation, offsetMap[clockwiseRotationMap[playerDirection]]), movementOffsetMap[playerDirection]),
    }
  }

  const getCurrentRoom = () => {
    const { gameStateStore } = context;
    return gameStateStore.currentRoom;
  }

  const getCombatMessage = (attacker: string, attackResult: AttackResult | undefined): string => {
    if(attackResult === 'missed') {
      return `${attacker} missed!`;
    } else if (attackResult === 'kill') {
      return `${attacker} killed one!`;
    } else if(!isUndefined(attackResult)) {
      return `${attacker} hit for ${attackResult} damage`;
    } else {
      return '';
    }
  }

    const {gameStateStore, levelStore, playerStore} = context;
    const {playerLocation, playerDirection} = playerStore;
    const viewTerrainMap = getViewTerrainMapAtCoordinates(playerLocation, playerDirection, levelStore);
    const viewFacingWallMap = getViewFacingWallMapAtCoordinates(playerLocation, playerDirection, levelStore);
    const wallFaces = getWallFaces();
    const floors = getFloors();
    const roomData = getCurrentRoom();

    return <div className="expore-encounter">
      <div className="location-info">
        <p className="location-direction">
          {`${playerStore.playerLocation[0]},${playerStore.playerLocation[1]},1 ${playerStore.playerDirection}`}
        </p>
        <div className="fps-view">
          {viewTerrainMap['playerRow'].map((tileTerrain, index) => {
            return <div className={`fps-square floor player-${index} ${tileTerrain}`}/>
          })}
          {viewTerrainMap['playerOneForwardRow'].map((tileTerrain, index) => {
            return <div className={`fps-square floor playerOneForward-${index} ${tileTerrain}`}/>
          })}
          {viewTerrainMap['playerTwoForwardRow'].map((tileTerrain, index) => {
            return <div className={`fps-square floor playerTwoForwardRow-${index} ${tileTerrain}`}/>
          })}

          {viewFacingWallMap['playerRow'].map((tileTerrain, index) => {
            return <div className={`fps-square walls facing player-${index} ${tileTerrain}`}/>
          })}
          {viewFacingWallMap['playerOneForwardRow'].map((tileTerrain, index) => {
            return <div className={`fps-square walls facing playerOneForward-${index} ${tileTerrain}`}/>
          })}
          {viewFacingWallMap['playerTwoForwardRow'].map((tileTerrain, index) => {
            return <div className={`fps-square walls facing playerTwoForward-${index} ${tileTerrain}`}/>
          })}
          {/* playerRow
playerOneForwardRow
playerTwoForwardRow */}
          {/* <div className={`fps-square walls left ${wallFaces.left}`}/>
          <div className={`fps-square walls left forward ${wallFaces.forwardLeft}`}/>
          <div className={`fps-square walls front front-left ${wallFaces.frontLeft}`}/>
          <div className={`fps-square walls front ${wallFaces.front}`} />
          <div className={`fps-square walls front forward ${wallFaces.forwardFront}`} />
          <div className={`fps-square walls front forward-left ${wallFaces.forwardFrontLeft}`} />
          <div className={`fps-square walls front forward-right ${wallFaces.forwardFrontRight}`} />
          <div className={`fps-square walls right ${wallFaces.right}`} />
          <div className={`fps-square walls right forward ${wallFaces.forwardRight}`} />
          <div className={`fps-square walls front front-right ${wallFaces.frontRight}`}/>
          <div className={`fps-square floor left ${floors.left}`}/>
          <div className={`fps-square floor front ${floors.front}`}/>
          <div className={`fps-square floor right ${floors.right}`}/>
          <div className={`fps-square floor left forward ${floors.forwardLeft}`}/>
          <div className={`fps-square floor forward ${floors.forward}`}/>
          <div className={`fps-square floor right forward ${floors.forwardRight}`}/> */}
        </div>
      </div>
      {roomData && roomData.groups.length ?
        <div className="encounter-info">
          <div className="encounter-images">
            <div className={`monster-disposition ${roomData.isFighting ? "fight" : "peace"}`}><img src="/murdur-rpg-system/images/fighting.png" alt={roomData.isFighting ? "Fight!" : "Friends!"}/></div>
            <div className="monster-portrait"><img src={roomData.groups[0].monster.profileImage} alt={roomData.groups[0].monster.name} /></div>
            <div className="monster-fight-info">
              <p>{getCombatMessage('You', gameStateStore.currentPlayerAttackResult)}</p>
              <p>{getCombatMessage('Monster', gameStateStore.currentMonsterAttackResult)}</p>
            </div>
            <div className="chest"></div>
          </div>
          <div className="monster-list">
            <ol>
              {roomData.groups.map((group, index) => 
                <li key={'monster-group-' + index}>{`${group.monsterHealth.length} ${roomData.groups[index].monster.name}${group.monsterHealth.length > 1 ? 's' : ''}`}</li>)}
            </ol>
          </div>
        </div> :
        <div className="encounter-info"> </div>
      }
    </div>
});

interface FloorTilesProps {
  section: SectionData;
}

const FloorTile = ({section}: FloorTilesProps) => {
  return null;//<div className={`fps-square floor left ${floors.left}`}/>;
}

export default EncounterPane;
