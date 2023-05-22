import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react"

const GlobalControls = observer(() => {
  const context = useContext(gameContext);
  const {audioStore, editStore, levelStore} = context;
  return <div className="global-controls">
    <div className="toggle-random-map" onClick={levelStore.toggleRandomMaps}>
      {levelStore.useRandomMaps ? 
        <img src="/murdur-rpg-system/images/unlocked.png" alt="using random maps"/> :
        <img src="/murdur-rpg-system/images/locked.png" alt="using preset maps"/>
      }
    </div>
    <div className="toggle-audio-button" onClick={audioStore.toggleAudioOn}>
      {audioStore.soundEnabled ? 
        <img src="/murdur-rpg-system/images/audioOn.png" alt="switch audio off"/> :
        <img src="/murdur-rpg-system/images/audioOff.png" alt="switch audio on"/>
      }
    </div>
    <div className="toggle-edit-mode" onClick={editStore.toggleIsEditing}>
      {editStore.isEditing ? 
        <img src="/murdur-rpg-system/images/editOn.png" alt="switch editor off"/> :
        <img src="/murdur-rpg-system/images/editOff.png" alt="switch editor on"/>
      }
    </div>
    {editStore.isEditing ? 
      <div className={"toggle-edit-" + editStore.editMode} onClick={() => editStore.changeEditMode('level')}>
        {editStore.editMode === 'level' ? 
          <img src="/murdur-rpg-system/images/editOn.png" alt="switch editor to monster"/> :
          <img src="/murdur-rpg-system/images/editOff.png" alt="switch editor to level"/>
        }
      </div> : null
    }
  </div>;
})

export default GlobalControls;
