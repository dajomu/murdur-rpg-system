import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class EncounterPane extends ComponentWithGameContext {
  render() {
    const {playerStore} = this.context;
    return <div className="expore-encounter">
      {playerStore.playerLocation}
      <div className="fps-view">
        <div className="fps-square left" />
        <div className="fps-square front" />
        <div className="fps-square right" />
      </div>
    </div>
  }
}

export default EncounterPane;
