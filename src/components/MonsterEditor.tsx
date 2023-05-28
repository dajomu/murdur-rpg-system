import React, {useContext} from 'react';
import { observer } from "mobx-react";
import { isUndefined } from 'lodash';
import gameContext from '../stores/gameContext';
import { saveMonsterData } from '../utils/editor';

export default observer(() => {
    const context = useContext(gameContext);
    const { editStore, levelStore, monsterStore } = context;

    const { selectedEditMonsterId, selectMonsterForEditing } = editStore;
    const selectedMonster: MonsterItem = monsterStore.getMonster(selectedEditMonsterId);

    // const handleTerrainChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    //     levelStore.setSectionTerrain(selectedEditTile, event.target.value as Terrain);
    //     selectTileForEditing(selectedEditTile); // hack to force re-render
    // });

    // const handleWallChange = ((event: React.ChangeEvent<HTMLSelectElement>, selectedTile: MapLocation) => {
    //     levelStore.setSectionWall(selectedTile, event.target.id as WallFace, event.target.value as Walls);
    //     selectTileForEditing(selectedEditTile); // hack to force re-render
    // });

    // const handleRoomChange = ((event: React.ChangeEvent<HTMLSelectElement>, selectedTile: MapLocation) => {
    //     levelStore.setSectionRoom(selectedTile, event.target.value === 'none' ? undefined : parseInt(event.target.value));
    //     selectTileForEditing(selectedEditTile); // hack to force re-render
    // });

    // const handleCreateRoom = (() => {
    //     levelStore.createRoom();
    //     levelStore.setSectionRoom([selectedEditTile[0], selectedEditTile[1]], Object.keys(levelStore.level1.levelRooms).length - 1);
    //     selectTileForEditing(selectedEditTile); // hack to force re-render
    // });

    // const handleRoomNameChange = (name: string) => {
    //     if(!isUndefined(selectedLevelCell.roomId)) {
    //         levelStore.setRoomName(selectedLevelCell.roomId, name);
    //         selectTileForEditing(selectedEditTile); // hack to force re-render
    //     }
    // }

    // const handleRoomDescriptionChange = (description: string) => {
    //     if(!isUndefined(selectedLevelCell.roomId)) {
    //         levelStore.setRoomDescription(selectedLevelCell.roomId, description);
    //         selectTileForEditing(selectedEditTile); // hack to force re-render
    //     }
    // }

    // const handleRoomMonsterGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     if(!isUndefined(selectedLevelCell.roomId)) {
    //         const selectedMonsterGroupIds = Array.from(event.target.options)
    //             .filter(option => option.selected)
    //             .map(option => option.value);
    //         levelStore.setRoomMonsterGroupIds(selectedLevelCell.roomId, selectedMonsterGroupIds);
    //         selectTileForEditing(selectedEditTile); // hack to force re-render
    //     }
    // }


    const handleMonsterFieldChange = (name: string, key: keyof MonsterItem) => {
        monsterStore.upsertMonster(selectedEditMonsterId, {...selectedMonster, [key]: name})
    }

    console.log('rerender');

    return <div className="edit-screen-edits">
        <div className="edit-screen-monster">
            <h2>Selected monster: {`[${selectedEditMonsterId}]: ${selectedMonster.name}`}</h2>
            <>
                <p>Select Monster</p>
                <select
                    onChange={(e) => selectMonsterForEditing(e.target.value)} 
                    value={ selectedEditMonsterId }>
                    {Array.from(monsterStore.monsters.values()).map(monster =>
                        <option value={monster.id}>{`[${monster.id}]: ${monster.name}`}</option>)}
                </select>
            </>
            <>
                <p>Name</p>
                <input type="text" value={selectedMonster.name} onChange={e => {handleMonsterFieldChange(e.target.value, 'name')}} />
            </>
            {/* 
            <h3>Edit terrain</h3>
            <select 
                onChange={handleTerrainChange} 
                value={ terrain }>
                <option value="none">None</option>
                <option value="sand">Sand</option>
                <option value="grass">Grass</option>
                <option value="water">Water</option>
            </select>
            <h3>Edit Walls</h3>
            <p>Top Wall</p>
            <select 
                id="topWall"
                onChange={(e) => handleWallChange(e, selectedEditTile)} 
                value={ selectedLevelCell.topWall }>
                {wallOptions.map(wallOption => <option value={wallOption.id}>{wallOption.name}</option>)}
            </select>
            <p>Left Wall</p>
            <select 
                id="leftWall"
                onChange={(e) => handleWallChange(e, selectedEditTile)} 
                value={ selectedLevelCell.leftWall }>
                {wallOptions.map(wallOption => <option value={wallOption.id}>{wallOption.name}</option>)}
            </select>
            {rightLevelCell &&
                <>
                    <p>Right Wall</p>
                    <select 
                        id="leftWall"
                        onChange={(e) => handleWallChange(e, [selectedEditTile[0] + 1, selectedEditTile[1]])} 
                        value={ rightLevelCell.leftWall }>
                        {wallOptions.map(wallOption => <option value={wallOption.id}>{wallOption.name}</option>)}
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
                        {wallOptions.map(wallOption => <option value={wallOption.id}>{wallOption.name}</option>)}
                    </select>
                </>
            } */}
            <>
                <button onClick={() => {saveMonsterData(Array.from(monsterStore.monsters.values()))}}>Download Monster Data</button>
            </>
        </div>
        <div className="edit-screen-monster-group">
            {/* <h2>Selected room {selectedRoom ? `[${selectedRoom.id}]: ${selectedRoom.name}` : 'none'}</h2>
            <div className="add-new-room-button" onClick={handleCreateRoom}>
                <img src="/murdur-rpg-system/images/add-circle-outline.svg" alt="switch audio on"/>
            </div>
            <>
                <p>Select Room</p>
                <select
                    onChange={(e) => handleRoomChange(e, [selectedEditTile[0], selectedEditTile[1]])} 
                    value={ !isUndefined(selectedLevelCell.roomId) ? selectedLevelCell.roomId : 'none' }>
                    <option value="none">none</option>
                    {Object.values(levelStore.level1.levelRooms).map(room =>
                        <option value={room.id}>{`[${room.id}]: ${room.name}`}</option>)}
                </select>
            </>
            {selectedRoom && <>
                <p>{JSON.stringify(selectedRoom)}</p>

                <>
                    <p>Name</p>
                    <input type="text" value={selectedRoom.name} onChange={e => {handleRoomNameChange(e.target.value)}} />
                </>
                <>
                    <p>Select Monster Group(s) (Shift Click for multiple)</p>
                    <select
                        onChange={(e) => handleRoomMonsterGroupChange(e)} 
                        value={ selectedRoom.monsterGroupIds }
                        multiple={true}>
                        {Object.keys(monsterStore.monsterGroups).map(monsterGroupKey =>
                            <option value={monsterGroupKey}>{`[${monsterGroupKey}]: ${monsterStore.monsterGroups[monsterGroupKey].name}`}</option>)}
                    </select>
                </>
                <>
                    <p>Description</p>
                    <textarea rows={10} cols={60} value={selectedRoom.description || ''} onChange={e => {handleRoomDescriptionChange(e.target.value)}} />
                </>
            </>} */}
        </div>
    </div>;
})