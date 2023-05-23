import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react"

const GlobalControls = observer(() => {
  const context = useContext(gameContext);
  const {audioStore, editStore, levelStore} = context;
  return <div className="global-controls">
    <div className="toggle-random-map" onClick={levelStore.toggleRandomMaps}>
      {levelStore.useRandomMaps ?
        <img src="/murdur-rpg-system/images/lock-open.svg" alt="using random maps"/> :
        <img src="/murdur-rpg-system/images/lock-closed.svg" alt="using preset maps"/>
      }
    </div>
    <div className="toggle-audio-button" onClick={audioStore.toggleAudioOn}>
      {audioStore.soundEnabled ?
        <img src="/murdur-rpg-system/images/volume-high.svg" alt="switch audio off"/> :
        <img src="/murdur-rpg-system/images/volume-mute.svg" alt="switch audio on"/>
      }
    </div>
    <div>
      <div className="toggle-edit-mode" onClick={editStore.toggleIsEditing}>
        {editStore.isEditing ?
          <img src="/murdur-rpg-system/images/brush.svg" alt="switch editor off"/> :
          <img src="/murdur-rpg-system/images/brush-outline.svg" alt="switch editor on"/>
        }
      </div>
      {editStore.isEditing ?
        <div>
          <div className="edit-level-controls">
            <div className={"toggle-edit-level" + editStore.editMode} onClick={() => editStore.changeEditMode('level')}>
              {editStore.editMode === 'level' ?
                <img src="/murdur-rpg-system/images/map.svg" alt="switch editor to monster"/> :
                <img src="/murdur-rpg-system/images/map-outline.svg" alt="switch editor to level"/>
              }
            </div>
            {editStore.editMode === 'level' ? 
                <div className={"toggle-edit-level" + editStore.editMode} onClick={editStore.toggleShowRoomNumbersOnMap}>
                  {editStore.showRoomNumbersOnMap ?
                    <img src="/murdur-rpg-system/images/keypad.svg" alt="show room numbers on map"/> :
                    <img src="/murdur-rpg-system/images/keypad-outline.svg" alt="hide room numbers on map"/>
                  }
                </div> :
                null
              }
          </div>
          <div className={"toggle-edit-monster"} onClick={() => editStore.changeEditMode('monster')}>
            {editStore.editMode === 'monster' ? 
              <img src="/murdur-rpg-system/images/skull.svg" alt="switch editor to monster"/> :
              <img src="/murdur-rpg-system/images/skull-outline.svg" alt="switch editor to level"/>
            }
          </div>
        </div> : null
      }
    </div>
  </div>;
})

export default GlobalControls;
