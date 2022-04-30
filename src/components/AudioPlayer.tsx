import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react"
 
const AudioPlayer = observer(() => {
  const context = useContext(gameContext);
  return <>
    <audio ref={context.audioStore.playerAudioRef} />
  </>;
})

export default AudioPlayer;