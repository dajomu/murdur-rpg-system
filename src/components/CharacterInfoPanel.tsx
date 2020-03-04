import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class CharacterInfoPanel extends ComponentWithGameContext {
  render() {
    const {playerStore} = this.context;
    return <div className="character-info-panel">
      <div className="character-alignment">
        {`${playerStore.sex} ${playerStore.race} (${playerStore.alignment}) (${playerStore.level})`}
      </div>
      <ul className="character-current-info">
        <li>
          <span>Age</span>
          <span>{playerStore.age}</span>
        </li>
        <li>
          <span>Hits</span>
          <span>{`${playerStore.currentHits}/${playerStore.maxHits}`}</span>
        </li>
        <li>
          <span>Experience</span>
          <span>{playerStore.experience}</span>
        </li>
        <li>
          <span>Gold</span>
          <span>{playerStore.gold}</span>
        </li>
      </ul>
      <ul className="character-stats">
        <li>
          <span>Strength</span>
          <span>{playerStore.stats.strength}</span>
        </li>
        <li>
          <span>Intelligence</span>
          <span>{playerStore.stats.intelligence}</span>
        </li>
        <li>
          <span>Wisdom</span>
          <span>{playerStore.stats.wisdom}</span>
        </li>
        <li>
          <span>Constitution</span>
          <span>{playerStore.stats.constitution}</span>
        </li>
        <li>
          <span>Charisma</span>
          <span>{playerStore.stats.charisma}</span>
        </li>
        <li>
          <span>Dexterity</span>
          <span>{playerStore.stats.dexterity}</span>
        </li>
      </ul>
    </div>;
  }
}

export default CharacterInfoPanel;

// age: number = 20;
//   @observable alignment: string = "Good";
//   @observable race: string = "Elf";
//   @observable sex: string = "Female";
//   @observable level: number = 1;
//   @observable maxHits: number = 50;
//   @observable currentHits: number = 50;
//   @observable experience: number = 1;
//   @observable gold: number = 0;
//   @observable stats: Stats = {
//     strength: 10,
//     intelligence: 10,
//     wisdom: 10,
//     constitution: 10,
//     charisma: 10,
//     dexterity: 10,
//   }