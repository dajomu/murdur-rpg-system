import React, {useContext} from 'react';
import { observer } from "mobx-react";
import { action, set } from 'mobx';

import gameContext from '../stores/gameContext';
import { baseMonster, baseMonsterGroup } from '../stores/monster';
import { saveMonsterData } from '../utils/editor';

export default observer(() => {
    const context = useContext(gameContext);
    const { editStore, guildsStore, monsterStore } = context;

    const { selectedEditMonsterId, selectMonsterForEditing, selectMonsterGroupForEditing, selectedEditMonsterGroupId } = editStore;
    const selectedMonster: MonsterItem = monsterStore.getMonster(selectedEditMonsterId);
    const selectedMonsterGroup: MonsterGroup = monsterStore.getMonsterGroup(selectedEditMonsterGroupId);

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
        const newMonsterId = monsterStore.getMonsterCount().toString();
        monsterStore.upsertMonster(newMonsterId, {...baseMonster, id: newMonsterId});
        selectMonsterForEditing(newMonsterId);
    })

    const handleAddMonsterGroup = action(() => {
        const newMonsterGroupId = monsterStore.getMonsterGroupsCount().toString();
        monsterStore.upsertMonsterGroup(newMonsterGroupId, baseMonsterGroup);
        selectMonsterGroupForEditing(newMonsterGroupId);
    })

    const handleMonsterGroupFieldChange = action((event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {id, value } = event.target;
        set(selectedMonsterGroup, {[id]: value});
    })

    const handleMonsterGroupGroupChange = action((event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, groupIndex: number) => {
        const {id, value } = event.target;
        set(selectedMonsterGroup, {'groups': selectedMonsterGroup.groups.map((group, index) => index == groupIndex ? {...group, [id] : value} : group)});
    })

    const handleAddMonsterGroupGroup = action(() => {
        set(selectedMonsterGroup, {'groups': [...selectedMonsterGroup.groups, { monsterId: 0, minCount: 1, maxCount: 1 }]});
    })

    const handleRemoveMonsterGroupGroup = action((monsterGroupIndex: number) => {
        set(selectedMonsterGroup, {'groups': 
            selectedMonsterGroup.groups.filter((group, index) => index !== monsterGroupIndex)});
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
                <button onClick={() => {saveMonsterData(Array.from(monsterStore.monsters.values()), Array.from(monsterStore.monsterGroups.values()))}}>Download Monster Data</button>
            </>
        </div>
        <div className="edit-screen-monster-group">
            <h2>Selected monster group {selectedMonsterGroup ? `[${selectedEditMonsterGroupId}]: ${selectedMonsterGroup.name}` : 'none'}</h2>
            <div className="add-new-monster-button" onClick={handleAddMonsterGroup}>
                <img src="/murdur-rpg-system/images/add-circle-outline.svg" alt="switch audio on"/>
            </div>
            <>
                <p>Select Monster Group</p>
                <select
                    onChange={(e) => selectMonsterGroupForEditing(e.target.value)} 
                    value={ selectedEditMonsterGroupId }>
                    {Array.from(monsterStore.monsterGroups.keys()).map(monsterGroupKey =>
                        <option value={monsterGroupKey}>{`[${monsterGroupKey}]: ${monsterStore.getMonsterGroup(monsterGroupKey).name}`}</option>)}
                </select>
            </>
            <div>
                <label>Name</label>
                <input type="text" value={selectedMonsterGroup.name} id={"name"} onChange={handleMonsterGroupFieldChange} />
            </div>
            <h3>Groups</h3>
            {selectedMonsterGroup.groups.map((group, index) =>
                <div className="edit-monster-group-group">
                    <p>Group {index}</p>
                    <>
                        <label>Select Monster</label>
                        <select
                            onChange={(e) => handleMonsterGroupGroupChange(e, index)}
                            id="monsterId"
                            value={ group.monsterId }>
                            {Array.from(monsterStore.monsters.values()).map(monster =>
                                <option value={monster.id}>{`[${monster.id}]: ${monster.name}`}</option>)}
                        </select>
                    </>
                    <div>
                        <label>Minimum Monsters</label>
                        <input type="number" value={group.minCount} id={"minCount"} onChange={(e) => handleMonsterGroupGroupChange(e, index)} />
                    </div>
                    <div>
                        <label>Maximum Monsters</label>
                        <input type="number" value={group.maxCount} id={"maxCount"} onChange={(e) => handleMonsterGroupGroupChange(e, index)} />
                    </div>
                    <div className="remove-monster-group-button" onClick={() => handleRemoveMonsterGroupGroup(index)}>
                        <img src="/murdur-rpg-system/images/remove-circle-outline.svg" alt="remove group from monster group"/>
                    </div>
                </div>
                )}
                {selectedMonsterGroup.groups.length < 4 && <div className="add-new-monster-button" onClick={handleAddMonsterGroupGroup}>
                    <img src="/murdur-rpg-system/images/add-circle-outline.svg" alt="add group to monster group"/>
                </div>}
        </div>
    </div>;
});
