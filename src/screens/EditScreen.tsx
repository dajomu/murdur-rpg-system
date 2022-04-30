import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import MapPanel from '../components/MapPanel';
import { observer } from "mobx-react";

export default observer(() => {
    const context = useContext(gameContext);
    const {gameStateStore} = context;
    return <div className="edit-screen">
        <p>the edit screen</p>
        <MapPanel />
    </div>;
})