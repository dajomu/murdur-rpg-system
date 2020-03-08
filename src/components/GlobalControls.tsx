import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class GlobalControls extends ComponentWithGameContext {
  render() {
    const {audioStore, levelStore} = this.context;
    return <div className="global-controls">
      <div className="toggle-random-map" onClick={levelStore.toggleRandomMaps}>
        {levelStore.useRandomMaps ? 
          <img src="/murdur-rpg-system/images/unlocked.png" alt="using random maps"/> :
          <img src="/murdur-rpg-system/images/locked.png" alt="using preset maps"/>}
      </div>
      <div className="toggle-audio-button" onClick={audioStore.toggleAudioOn}>
        {audioStore.soundEnabled ? 
          <img src="/murdur-rpg-system/images/audioOn.png" alt="switch audio on/off"/> :
          <img src="/murdur-rpg-system/images/audioOff.png" alt="switch audio on/off"/>}
      </div>
    </div>;
  }
}

export default GlobalControls;
