import React, {useContext} from 'react';
import { observer } from "mobx-react";
import { action, set } from 'mobx';

import gameContext from '../stores/gameContext';
import { baseMonster } from '../stores/monster';
import { saveMonsterData } from '../utils/editor';

export default observer(() => {
    const context = useContext(gameContext);
    const { editStore, guildsStore, monsterStore } = context;

    const { selectedEditMonsterId, selectMonsterForEditing } = editStore;
    const selectedMonster: MonsterItem = monsterStore.getMonster(selectedEditMonsterId);

    const handleMonsterFieldChange = action((event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {id, value } = event.target;
        set(selectedMonster, {[id]: value});
    })

    const handleMonsterStatsChange = action((event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value } = event.target;
        set(selectedMonster, {'stats': {...selectedMonster.stats, [id]: value}});
    })
    const handleMonsterCanStealChange = action(() => {
        set(selectedMonster, {'canSteal': !selectedMonster.canSteal});
    })

    const handleAddMonster = action(() => {
        monsterStore.upsertMonster(monsterStore.getMonsterCount().toString(), baseMonster);
        selectMonsterForEditing(monsterStore.getMonsterCount().toString());
    })

    return <div className="edit-screen-edits">
        <div className="edit-screen-monster">
            <h2>Selected monster: {`[${selectedEditMonsterId}]: ${selectedMonster.name}`}</h2>
            <div className="add-new-monster-button" onClick={handleAddMonster}>
                <img src="/murdur-rpg-system/images/add-circle-outline.svg" alt="switch audio on"/>
            </div>
            <>
                <p>Select Monster</p>
                <select
                    onChange={(e) => selectMonsterForEditing(e.target.value)} 
                    value={ selectedEditMonsterId }>
                    {Array.from(monsterStore.monsters.values()).map(monster =>
                        <option value={monster.id}>{`[${monster.id}]: ${monster.name}`}</option>)}
                </select>
            </>
            <div>
                <label>Name</label>
                <input type="text" value={selectedMonster.name} id={"name"} onChange={handleMonsterFieldChange} />
            </div>
            <div>
                <label>HP</label>
                <input type="number" value={selectedMonster.hp} id={"hp"} onChange={handleMonsterFieldChange} />
            </div>
            <div>
                <label>Attack</label>
                <input type="number" value={selectedMonster.atk} id={"atk"} onChange={handleMonsterFieldChange} />
            </div>
            <div>
                <label>Defence</label>
                <input type="number" value={selectedMonster.def} id={"def"} onChange={handleMonsterFieldChange} />
            </div>
            <div>
                <label>XP</label>
                <input type="number" value={selectedMonster.xp} id={"xp"} onChange={handleMonsterFieldChange} />
            </div>
            <div>
                <label>Gold</label>
                <input type="number" value={selectedMonster.gold} id={"gold"} onChange={handleMonsterFieldChange} />
            </div>
            <div>
                <label>Max Level</label>
                <input type="number" value={selectedMonster.maxLevel} id={"maxLevel"} onChange={handleMonsterFieldChange} />
            </div>
            <div>
                <label>Alignment</label>
                <select 
                    id={"alignment"}
                    onChange={handleMonsterFieldChange}
                    value={ selectedMonster.alignment }>
                        <option value="good">Good</option>
                        <option value="neutral">Neutral</option>
                        <option value="evil">Evil</option>
                </select>
            </div>
            <div>
                <label>Guild</label>
                <select 
                    id={"guild"} onChange={handleMonsterFieldChange}
                    value={ selectedMonster.guild }>
                        {Object.keys(guildsStore).map(guildKey =>
                            <option value={guildKey}>{`[${guildKey}]: ${guildsStore[guildKey].name}`}</option>)}
                </select>
            </div>
            <div>
                <label>Image</label>
                <input type="text" value={selectedMonster.profileImage} id={"profileImage"} onChange={handleMonsterFieldChange} />
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={selectedMonster.canSteal}
                    onChange={handleMonsterCanStealChange}
                />
                Can Steal
            </label>

            <div>
                <h3>Stats</h3>
                <div>
                    <label>Strength</label>
                    <input type="number" value={selectedMonster.stats.strength} id={"strength"} onChange={handleMonsterStatsChange} />
                </div>
                <div>
                    <label>Intelligence</label>
                    <input type="number" value={selectedMonster.stats.intelligence} id={"intelligence"} onChange={handleMonsterStatsChange} />
                </div>
                <div>
                    <label>Wisdom</label>
                    <input type="number" value={selectedMonster.stats.wisdom} id={"wisdom"} onChange={handleMonsterStatsChange} />
                </div>
                <div>
                    <label>Constitution</label>
                    <input type="number" value={selectedMonster.stats.constitution} id={"constitution"} onChange={handleMonsterStatsChange} />
                </div>
                <div>
                    <label>Charisma</label>
                    <input type="number" value={selectedMonster.stats.charisma} id={"charisma"} onChange={handleMonsterStatsChange} />
                </div>
                <div>
                    <label>Dexterity</label>
                    <input type="number" value={selectedMonster.stats.dexterity} id={"dexterity"} onChange={handleMonsterStatsChange} />
                </div>
            </div>
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