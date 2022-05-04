import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react";

export default observer(() => {
    const context = useContext(gameContext);
    const { editStore, levelStore } = context;

    const { selectedEditTile, selectTileForEditing } = editStore;
    const selectedLevelCell = levelStore.level1.levelSections[`${editStore.selectedEditTile[0]}-${editStore.selectedEditTile[1]}`];
    const { terrain } = selectedLevelCell;

    const handleTerrainChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
        levelStore.setSectionTerrain(editStore.selectedEditTile, event.target.value as Terrain);
        selectTileForEditing(editStore.selectedEditTile); // hack to force re-render
    });

    const handleWallChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
        levelStore.setSectionWall(editStore.selectedEditTile, event.target.id as WallFace, event.target.value as Walls);
        selectTileForEditing(editStore.selectedEditTile); // hack to force re-render
    });

    return <div className="edit-screen-edits">
        <h2>Selected cell: {`${selectedEditTile[0]}, ${selectedEditTile[1]}`}</h2>
        <p>{JSON.stringify(selectedLevelCell)}</p>
        <h3>Edit terrain</h3>
        <select 
            onChange={handleTerrainChange} 
            value={ terrain }>
            <option value="none">None</option>
            <option value="sand">Sand</option>
            <option value="water">Water</option>
        </select>
        <h3>Edit Walls</h3>
        <p>Top Wall</p>
        <select 
            id="topWall"
            onChange={handleWallChange} 
            value={ selectedLevelCell.topWall }>
            <option value="none">None</option>
            <option value="wall">Wall</option>
            <option value="door">Door</option>
        </select>
    </div>;
})