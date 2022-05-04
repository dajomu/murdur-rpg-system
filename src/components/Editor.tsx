import React, {useContext} from 'react';
import { observer } from "mobx-react";
import gameContext from '../stores/gameContext';
import { saveLevelData } from '../utils/editor';

export default observer(() => {
    const context = useContext(gameContext);
    const { editStore, levelStore } = context;

    const { selectedEditTile, selectTileForEditing } = editStore;
    const selectedLevelCell = levelStore.level1.levelSections[`${selectedEditTile[0]}-${selectedEditTile[1]}`];
    const selectedRoom = !!selectedLevelCell.roomId ? levelStore.level1.levelRooms[selectedLevelCell.roomId] : false;
    const rightLevelCell = levelStore.level1.levelSections[`${selectedEditTile[0] + 1}-${selectedEditTile[1]}`];
    const lowerLevelCell = levelStore.level1.levelSections[`${selectedEditTile[0]}-${selectedEditTile[1] + 1}`];
    const { terrain } = selectedLevelCell;

    const handleTerrainChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
        levelStore.setSectionTerrain(selectedEditTile, event.target.value as Terrain);
        selectTileForEditing(selectedEditTile); // hack to force re-render
    });

    const handleWallChange = ((event: React.ChangeEvent<HTMLSelectElement>, selectedTile: MapLocation) => {
        levelStore.setSectionWall(selectedTile, event.target.id as WallFace, event.target.value as Walls);
        selectTileForEditing(selectedEditTile); // hack to force re-render
    });

    const handleRoomNameChange = (name: string) => {
        if(selectedLevelCell.roomId) {
            levelStore.setRoomName(selectedLevelCell.roomId, name);
            selectTileForEditing(selectedEditTile); // hack to force re-render
        }
    }

    const handleRoomDescriptionChange = (description: string) => {
        if(selectedLevelCell.roomId) {
            levelStore.setRoomDescription(selectedLevelCell.roomId, description);
            selectTileForEditing(selectedEditTile); // hack to force re-render
        }
    }

    return <div className="edit-screen-edits">
        <div className="edit-screen-cell">
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
                onChange={(e) => handleWallChange(e, selectedEditTile)} 
                value={ selectedLevelCell.topWall }>
                <option value="none">None</option>
                <option value="wall">Wall</option>
                <option value="door">Door</option>
            </select>
            <p>Left Wall</p>
            <select 
                id="leftWall"
                onChange={(e) => handleWallChange(e, selectedEditTile)} 
                value={ selectedLevelCell.leftWall }>
                <option value="none">None</option>
                <option value="wall">Wall</option>
                <option value="door">Door</option>
            </select>
            {rightLevelCell &&
                <>
                    <p>Right Wall</p>
                    <select 
                        id="leftWall"
                        onChange={(e) => handleWallChange(e, [selectedEditTile[0] + 1, selectedEditTile[1]])} 
                        value={ rightLevelCell.leftWall }>
                        <option value="none">None</option>
                        <option value="wall">Wall</option>
                        <option value="door">Door</option>
                    </select>
                </>
            }
            {lowerLevelCell &&
                <>
                    <p>Lower Wall</p>
                    <select 
                        id="topWall"
                        onChange={(e) => handleWallChange(e, [selectedEditTile[0], selectedEditTile[1] + 1])} 
                        value={ lowerLevelCell.topWall }>
                        <option value="none">None</option>
                        <option value="wall">Wall</option>
                        <option value="door">Door</option>
                    </select>
                </>
            }
            <>
                <button onClick={() => {saveLevelData(Object.values(levelStore.level1.levelSections))}}>Download Level Data</button>
            </>
        </div>
        <div className="edit-screen-room">
            {selectedRoom && <>
                <h2>Selected room [{`${selectedRoom.id}]: ${selectedRoom.name}`}</h2>
                <p>{JSON.stringify(selectedRoom)}</p>
                <>
                    <p>Name</p>
                    <input type="text" value={selectedRoom.name} onChange={e => {handleRoomNameChange(e.target.value)}} />
                </>
                <>
                    <p>Description</p>
                    <textarea rows={10} cols={60} value={selectedRoom.description} onChange={e => {handleRoomDescriptionChange(e.target.value)}} />
                </>
            </>}
        </div>
    </div>;
})