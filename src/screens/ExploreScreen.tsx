import React from 'react';
import CharacterStats from '../components/CharacterStats';

export default class ExploreScreen extends React.Component<{}, {}> {
  constructor(props: {}) {
      super(props);

      this.state = {
      };
  }

  render() {
    return <div className="explore-screen">
      <div className="character-menu">
        <CharacterStats />
        <div className="character-inventory"></div>
        <div className="party"></div>
      </div>
      <div className="explore-pane">
        <div className="expore-encounter"></div>
        <div className="explore-map"></div>
        <div className="explore-messages"></div>
      </div>
    </div>;
  }
}

//<div className=""></div>