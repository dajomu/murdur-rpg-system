import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react";

import ExploreScreen from './ExploreScreen';
import EditScreen from './EditScreen';

export default observer(() => {
    const context = useContext(gameContext);
    const {editStore} = context;
    return <>
        {!editStore.isEditing ?
            <ExploreScreen /> :
            <EditScreen />}
    </>;
})