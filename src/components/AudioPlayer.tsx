import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class AudioPlayer extends ComponentWithGameContext {
  render() {
    const {audioStore} = this.context;
    return <>
      <div className="toggle-audio-button" onClick={audioStore.toggleAudioOn}>
        {audioStore.soundEnabled ? 
          <img src="/murdur-rpg-system/images/audioOn.png" alt="switch audio on/off"/> :
          <img src="/murdur-rpg-system/images/audioOff.png" alt="switch audio on/off"/>}
      </div>
      <audio ref={audioStore.playerAudioRef} />
    </>;
  }
}

export default AudioPlayer;