import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { boundingOffsetMap, clockwiseRotationMap, counterClockwiseRotationMap, movementOffsetMap, offsetMap} from '../constants';
import { observer } from "mobx-react"

const comboCoordinates = function(offsetOne: [number, number], offsetTwo: [number,number]): [number, number] {
  return [offsetOne[0] + offsetTwo[0], offsetOne[1] + offsetTwo[1]];
}

@observer 
class EncounterPane extends ComponentWithGameContext {
  getWallFaces = () => {
    const {levelStore, playerStore} = this.context;
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

  getCurrentRoom = () => {
    const {levelStore, monsterStore, playerStore} = this.context;
    const {playerLocation} = playerStore;
    const levelSection = levelStore.getSectionByCoords(playerLocation);
    console.log('levelSection', levelSection, levelSection!.roomId);
    return levelSection && typeof levelSection.roomId === 'number' ? {
      ...levelStore.level1.levelRooms[levelSection.roomId],
      monsters: levelStore.level1.levelRooms[levelSection.roomId].groups.map(group => monsterStore.monsters[group.monsterId]),
    } : null;
  }

  render() {
    const {playerStore} = this.context;
    const wallFaces = this.getWallFaces();
    const roomData = this.getCurrentRoom();
    console.log(roomData);
    return <div className="expore-encounter">
      <div className="location-info">
        <p className="location-direction">
          {`${playerStore.playerLocation[0]},${playerStore.playerLocation[1]},1 ${playerStore.playerDirection}`}
        </p>
        <div className="fps-view">
          <div className={`fps-square left ${wallFaces.left}`}/>
          <div className={`fps-square left forward ${wallFaces.forwardLeft}`}/>
          <div className={`fps-square front front-left ${wallFaces.frontLeft}`}/>
          <div className={`fps-square front ${wallFaces.front}`} />
          <div className={`fps-square front forward ${wallFaces.forwardFront}`} />
          <div className={`fps-square front forward-left ${wallFaces.forwardFrontLeft}`} />
          <div className={`fps-square front forward-right ${wallFaces.forwardFrontRight}`} />
          <div className={`fps-square right ${wallFaces.right}`} />
          <div className={`fps-square right forward ${wallFaces.forwardRight}`} />
          <div className={`fps-square front front-right ${wallFaces.frontRight}`}/>
        </div>
      </div>
      {roomData ?
        <div className="encounter-info">
          <div className="encounter-images">
            <div className="monster-disposition"><img src="/murdur-rpg-system/images/fighting.png" alt="Fight!"/></div>
            <div className="monster-portrait"><img src={roomData.monsters[0].profileImage} alt={roomData.monsters[0].name} /></div>
            <div className="chest"></div>
          </div>
          <div className="monster-list">
            <ol>
              {roomData.groups.map((group, index) => 
                <li key={'monster-group-' + index}>{`${group.monsterHealth.length} ${roomData.monsters[index].name}${group.monsterHealth.length > 1 ? 's' : ''}`}</li>)}
            </ol>
          </div>
        </div> :
        <div className="encounter-info"> </div>
      }
    </div>
  }
}

export default EncounterPane;
