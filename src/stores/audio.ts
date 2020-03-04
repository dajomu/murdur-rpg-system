import React from 'react';
import { observable } from 'mobx';

interface AudioTrack {
  src: string;
}

export class AudioStore {
  @observable soundEnabled: boolean = false;
  @observable player: {[key: string]: AudioTrack} = {
    'hitwall': {src: '/murdur-rpg-system/audio/ouch.mp3'},
  };
  public playerAudioRef: React.RefObject<HTMLAudioElement> = React.createRef();

  playAudio(type: string, audio: string) {
    if(type === 'player' && this.player[audio] && this.playerAudioRef.current && this.soundEnabled){
      this.playerAudioRef.current.src = this.player[audio].src;
      this.playerAudioRef.current.play();
    }
  }

  toggleAudioOn = () => {
    this.soundEnabled = !this.soundEnabled;
  }
}

const audioStore = new AudioStore();

export default audioStore;