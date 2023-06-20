import React, {useContext} from 'react';
import { observer } from "mobx-react";
import { action, observable, get, set } from 'mobx';

import gameContext from '../stores/gameContext';
import { baseMonster } from '../stores/monster';
import { saveMonsterData } from '../utils/editor';


// export const baseMonster: MonsterItem = {
//     id: '100', x
//     name: 'none', x
//     hp: 1, x
//     atk: 1, x
//     def: 1, x
//     xp: 1, x
//     gold: 1, x
//     profileImage: '',
//     guild: 1,
//     maxLevel: 1, x
//     alignment: 'good', x
//     canSteal: false, x
//     stats: {
//       strength: 1, x
//       intelligence: 1, x
//       wisdom: 1, x
//       constitution: 1, x
//       charisma: 1, x
//       dexterity: 1, x
//     }
//   }


export default observer(() => {
    const context = useContext(gameContext);
    const { editStore, levelStore, monsterStore } = context;

    const { selectedEditMonsterId, selectMonsterForEditing } = editStore;
    const selectedMonster: MonsterItem = monsterStore.getMonster(selectedEditMonsterId);
    console.log(selectedMonster);

    const handleMonsterFieldChange = action((fieldValue: string, key: keyof MonsterItem) => {
        set(selectedMonster, {[key]: fieldValue});
    })

    const handleMonsterStatsChange = action((statValue: string, key: keyof Stats) => {
        set(selectedMonster, {'stats': {...selectedMonster.stats, [key]: statValue}});
    })
    const handleMonsterCanStealChange = action(() => {
        set(selectedMonster, {'canSteal': !selectedMonster.canSteal});
    })

    const handleAddMonster = action(() => {
        console.log('monsterStore.getMonsterCount()', monsterStore.getMonsterCount())
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
                <input type="text" value={selectedMonster.name} onChange={e => {handleMonsterFieldChange(e.target.value, 'name')}} />
            </div>
            <div>
                <label>HP</label>
                <input type="number" value={selectedMonster.hp} onChange={e => {handleMonsterFieldChange(e.target.value, 'hp')}} />
            </div>
            <div>
                <label>Attack</label>
                <input type="number" value={selectedMonster.atk} onChange={e => {handleMonsterFieldChange(e.target.value, 'atk')}} />
            </div>
            <div>
                <label>Defence</label>
                <input type="number" value={selectedMonster.def} onChange={e => {handleMonsterFieldChange(e.target.value, 'def')}} />
            </div>
            <div>
                <label>XP</label>
                <input type="number" value={selectedMonster.xp} onChange={e => {handleMonsterFieldChange(e.target.value, 'xp')}} />
            </div>
            <div>
                <label>Gold</label>
                <input type="number" value={selectedMonster.gold} onChange={e => {handleMonsterFieldChange(e.target.value, 'gold')}} />
            </div>
            <div>
                <label>Max Level</label>
                <input type="number" value={selectedMonster.maxLevel} onChange={e => {handleMonsterFieldChange(e.target.value, 'maxLevel')}} />
            </div>
            <div>
                <label>Alignment</label>
                <select 
                    onChange={e => {handleMonsterFieldChange(e.target.value, 'alignment')}}
                    value={ selectedMonster.alignment }>
                        <option value="good">Good</option>
                        <option value="neutral">Neutral</option>
                        <option value="evil">Evil</option>
                </select>
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
                    <input type="number" value={selectedMonster.stats.strength} onChange={e => {handleMonsterStatsChange(e.target.value, 'strength')}} />
                </div>
                <div>
                    <label>Intelligence</label>
                    <input type="number" value={selectedMonster.stats.intelligence} onChange={e => {handleMonsterStatsChange(e.target.value, 'intelligence')}} />
                </div>
                <div>
                    <label>Wisdom</label>
                    <input type="number" value={selectedMonster.stats.wisdom} onChange={e => {handleMonsterStatsChange(e.target.value, 'wisdom')}} />
                </div>
                <div>
                    <label>Constitution</label>
                    <input type="number" value={selectedMonster.stats.constitution} onChange={e => {handleMonsterStatsChange(e.target.value, 'constitution')}} />
                </div>
                <div>
                    <label>Charisma</label>
                    <input type="number" value={selectedMonster.stats.charisma} onChange={e => {handleMonsterStatsChange(e.target.value, 'charisma')}} />
                </div>
                <div>
                    <label>Dexterity</label>
                    <input type="number" value={selectedMonster.stats.dexterity} onChange={e => {handleMonsterStatsChange(e.target.value, 'dexterity')}} />
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