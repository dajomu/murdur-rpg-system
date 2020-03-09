import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { clockwiseRotationMap, counterClockwiseRotationMap, movementOffsetMap} from '../constants';
import { observer } from "mobx-react"

@observer 
class EncounterPane extends ComponentWithGameContext {
  getWallFaces = () => {
    const {levelStore, playerStore} = this.context;
    const {playerLocation, playerDirection} = playerStore;
    return {
      forward: levelStore.getWallFace(playerLocation, playerDirection),
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
        <div className={`fps-square front ${wallFaces.forward}`} />
        <div className={`fps-square right ${wallFaces.right}`} />
        <div className={`fps-square right forward ${wallFaces.forwardRight}`} />
      </div>
    </div>
  }
}

export default EncounterPane;
