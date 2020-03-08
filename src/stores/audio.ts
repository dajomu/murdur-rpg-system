import React from 'react';
import { observable } from 'mobx';
import { getCookie, setCookie } from '../utils/cookie';

interface AudioTrack {
  src: string;
}

export class AudioStore {
  @observable soundEnabled: boolean;
  @observable player: {[key: string]: AudioTrack} = {
    'hitwall': {src: '/murdur-rpg-system/audio/ouch.mp3'},
  };
  public playerAudioRef: React.RefObject<HTMLAudioElement> = React.createRef();

  constructor() {
    this.soundEnabled = this.checkForSoundEnabled();
  }

  playAudio(type: string, audio: string) {
    if(type === 'player' && this.player[audio] && this.playerAudioRef.current && this.soundEnabled && this.playerAudioRef.current.paused){
      this.playerAudioRef.current.src = this.player[audio].src;
      this.playerAudioRef.current.play();
    }
  }

  checkForSoundEnabled(): boolean {
    if(getCookie('soundEnabled') === 'true') {
      return true;
    } else {
      setCookie('soundEnabled', 'false');
      return false;
    }
  }

  toggleAudioOn = () => {
    setCookie('soundEnabled', `${!this.soundEnabled}`)
    this.soundEnabled = !this.soundEnabled;
  }
}

const audioStore = new AudioStore();

export default audioStore;