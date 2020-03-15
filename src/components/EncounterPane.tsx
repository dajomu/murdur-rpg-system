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

  render() {
    const {playerStore} = this.context;
    const wallFaces = this.getWallFaces();
    return <div className="expore-encounter">
      {playerStore.playerLocation}
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
  }
}

export default EncounterPane;
