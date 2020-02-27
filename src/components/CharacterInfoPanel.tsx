import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class CharacterInfoPanel extends ComponentWithGameContext {
  render() {
    const {playerStore} = this.context;
    return <div>{playerStore.age}</div>
  }
}

export default CharacterInfoPanel;
