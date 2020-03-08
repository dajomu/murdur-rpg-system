import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class AudioPlayer extends ComponentWithGameContext {
  render() {
    const {audioStore} = this.context;
    return <>
      <audio ref={audioStore.playerAudioRef} />
    </>;
  }
}

export default AudioPlayer;