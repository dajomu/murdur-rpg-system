import React from 'react';

export default class CharacterStats extends React.Component<{}, {}> {
  constructor(props: {}) {
      super(props);

      this.state = {
      };
  }

  render() {
    return <div className="character-stats">
      <div className="character-name">Reggie Plop Plops</div>
      <div className="top-tabs">
        <div className="tab">Stats</div>
        <div className="tab">Resist</div>
        <div className="tab">Char</div>
        <div className="tab">Guild</div>
      </div>
      <div className="stats-pane">
      </div>
    </div>;
  }
}

//<div className=""></div>