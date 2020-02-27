import React from 'react';
import CharacterInfoPanel from './CharacterInfoPanel';

const tabs = [
  {name: "Stats", id: 'stats'},
  {name: "Resist", id: 'resist'},
  {name: "Char", id: 'char'},
  {name: "Guild", id: 'guild'}
];

export default class CharacterStats extends React.Component<{}, {activeTab: string}> {
  constructor(props: {}) {
      super(props);

      this.state = {
        activeTab: 'stats'
      };
  }

  changeTab = (activeTab: string) => {
    this.setState({activeTab});
  }

  render() {
    const {activeTab} = this.state;
    return <div className="character-stats">
      <div className="character-name">Reggie Plop Plops</div>
      <div className="top-tabs">
        {tabs.map(tabInfo => 
          <div className={`tab ${activeTab === tabInfo.id ? 'active' : ''}`} 
            onClick={() => {this.changeTab(tabInfo.id)}}>{tabInfo.name}</div>)}
      </div>
      {activeTab === 'stats' && <CharacterInfoPanel />}
    </div>;
  }
}

//<div className=""></div>