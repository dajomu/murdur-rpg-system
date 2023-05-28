import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import MapPanel from '../components/MapPanel';
import LevelEditor from '../components/LevelEditor';
import MonsterEditor from '../components/MonsterEditor';
import { observer } from "mobx-react";

export default observer(() => {
    const context = useContext(gameContext);
    const {gameStateStore, editStore} = context;
    return <div className="edit-screen">
        <div className="edit-screen-map">
            <MapPanel showRoomNumbers={editStore.showRoomNumbersOnMap} />
        </div>
        {editStore.editMode === 'level' && <LevelEditor />}
        {editStore.editMode === 'monster' && <MonsterEditor />}
    </div>;
})