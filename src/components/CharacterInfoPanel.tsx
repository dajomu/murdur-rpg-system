import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class CharacterInfoPanel extends ComponentWithGameContext {
  render() {
    const {playerStore} = this.context;
    const currentLevel = playerStore.guilds[playerStore.guild];
    return <div className="character-info-panel">
      <div className="character-alignment">
        {`${playerStore.sex} ${playerStore.race} (${playerStore.alignment}) (${currentLevel})`}
      </div>
      <ul className="character-current-info">
        <li key="age">
          <span>Age</span>
          <span>{playerStore.age}</span>
        </li>
        <li key="hits">
          <span>Hits</span>
          <span>{`${playerStore.currentHits}/${playerStore.maxHits}`}</span>
        </li>
        <li key="xp">
          <span>Experience</span>
          <span>{playerStore.experience}</span>
        </li>
        <li key="gold">
          <span>Gold</span>
          <span>{playerStore.gold}</span>
        </li>
      </ul>
      <ul className="character-stats">
        <li key="strength">
          <span>Strength</span>
          <span>{playerStore.stats.strength}</span>
        </li>
        <li key="intelligence">
          <span>Intelligence</span>
          <span>{playerStore.stats.intelligence}</span>
        </li>
        <li key="wisdom">
          <span>Wisdom</span>
          <span>{playerStore.stats.wisdom}</span>
        </li>
        <li key="constitution">
          <span>Constitution</span>
          <span>{playerStore.stats.constitution}</span>
        </li>
        <li key="charisma">
          <span>Charisma</span>
          <span>{playerStore.stats.charisma}</span>
        </li>
        <li key="dexterity">
          <span>Dexterity</span>
          <span>{playerStore.stats.dexterity}</span>
        </li>
      </ul>
    </div>;
  }
}

export default CharacterInfoPanel;
