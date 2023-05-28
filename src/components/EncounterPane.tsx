import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { getViewTerrainMapAtCoordinates, getViewFacingWallMapAtCoordinates, getViewSideWallMapAtCoordinates } from '../utils/encounterPane';
import {isUndefined} from 'lodash';
import { observer } from "mobx-react";

const EncounterPane = observer(() => {

  const context = useContext(gameContext);

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
    const viewSideWallMap = getViewSideWallMapAtCoordinates(playerLocation, playerDirection, levelStore);
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

          {viewSideWallMap['playerRow'].map((tileTerrain, index) => {
            return <div className={`fps-square walls side player-${index} ${tileTerrain}`}/>
          })}
          {viewSideWallMap['playerOneForwardRow'].map((tileTerrain, index) => {
            return <div className={`fps-square walls side playerOneForward-${index} ${tileTerrain}`}/>
          })}
          {viewSideWallMap['playerTwoForwardRow'].map((tileTerrain, index) => {
            return <div className={`fps-square walls side playerTwoForward-${index} ${tileTerrain}`}/>
          })}
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

export default EncounterPane;
