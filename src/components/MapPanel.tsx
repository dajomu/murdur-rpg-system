import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

interface MapPanelState {
  playerLocation: [number, number];
}


@observer 
class MapPanel extends ComponentWithGameContext<{}, MapPanelState> {

  constructor(props: {}) {
      super(props);

      this.state = {
        playerLocation: [0, 0]
      };
  }

  handleKeyDown = (event: KeyboardEvent) => {
    console.log('event.keyCode: ', event.keyCode);
    let playerLocation: [number, number] = [this.state.playerLocation[0], this.state.playerLocation[1]];
    switch( event.keyCode ) {
      case 37: // go left
        playerLocation = [this.state.playerLocation[0] -1, this.state.playerLocation[1]];
        break;
      case 38: // go up
      playerLocation = [this.state.playerLocation[0], this.state.playerLocation[1] - 1];
        break;
      case 39: // go right
      playerLocation = [this.state.playerLocation[0] +1, this.state.playerLocation[1]];
        break;
      case 40: // go down
      playerLocation = [this.state.playerLocation[0], this.state.playerLocation[1] + 1];
        break;
      default: 
        break;
    }
    this.context.levelStore.level1.markSectionDiscovered(playerLocation);
    this.setState({playerLocation});
  }
  
  componentWillMount() {
    this.context.levelStore.level1.markSectionDiscovered(this.state.playerLocation);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {levelStore} = this.context;
    console.log(levelStore.level1.levelSections, levelStore.level1.discoveredSections, this.state.playerLocation);
    return <div className="explore-map">
      <div className="map-container" style={{width: levelStore.level1.size * 14, height: levelStore.level1.size * 14}}>
        {levelStore.level1.levelSections.map(section => {
          const isPlayerLocation = section.coords[0] === this.state.playerLocation[0] && section.coords[1] === this.state.playerLocation[1];
          const sectionClass = levelStore.isSectionDiscovered(section.coords) ?
            "map-square " + section.walls + (isPlayerLocation ? " player-location" : "")  + ' discovered-' + section.terrain:
            "map-square";
          return <div className={sectionClass}></div>;
        })}
      </div>
    </div>;
  }
}

export default MapPanel;
