import React, {useContext} from 'react';
import { NavLink } from "react-router-dom";
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react"

const GlobalControls = observer(() => {
  const context = useContext(gameContext);
  const {audioStore, levelStore} = context;
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
    <div className="toggle-edit-mode">
      <NavLink 
        style={({ isActive }) => {
          return {
            display: isActive ? "none" : "block",
          };
        }}
        to="murdur-rpg-system/edit"
        >Edit</NavLink>
      <NavLink 
        style={({ isActive }) => {
          return {
            display: isActive ? "none" : "block",
          };
        }}
        to="murdur-rpg-system/"
        >Game</NavLink>
    </div>
  </div>;
})

export default GlobalControls;
