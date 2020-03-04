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
        playerLocation: [15,15],
      };
  }

  handleKeyDown = (event: KeyboardEvent) => {
    let playerLocation: [number, number] = [this.state.playerLocation[0], this.state.playerLocation[1]];
    switch( event.keyCode ) {
      case 37: {// go left
          let boundingSection = this.context.levelStore.getSectionByCoords([this.state.playerLocation[0], this.state.playerLocation[1]]);
          if (boundingSection && boundingSection.leftWall !== 'wall' && this.state.playerLocation[0] !== 0) {
            playerLocation = [this.state.playerLocation[0] -1, this.state.playerLocation[1]];
            this.context.messageStore.addMessage('You walked WEST');
          } else {
            this.context.audioStore.playAudio('player', 'hitwall');
          }
          break;
        }
      case 38: {// go up
          const boundingSection = this.context.levelStore.getSectionByCoords([this.state.playerLocation[0], this.state.playerLocation[1]]);
          if (boundingSection && boundingSection.topWall !== 'wall'  && this.state.playerLocation[1] !== 0) {
            playerLocation = [this.state.playerLocation[0], this.state.playerLocation[1] - 1];
            this.context.messageStore.addMessage('You walked NORTH');
          }
          break;
        }
      case 39: {// go right
          const boundingSection = this.context.levelStore.getSectionByCoords([this.state.playerLocation[0] + 1, this.state.playerLocation[1]]);
          if (boundingSection && boundingSection.leftWall !== 'wall') {
            playerLocation = [this.state.playerLocation[0] + 1, this.state.playerLocation[1]];
            this.context.messageStore.addMessage('You walked EAST');
          }
          break;
        }
      case 40: {// go down
        const boundingSection = this.context.levelStore.getSectionByCoords([this.state.playerLocation[0], this.state.playerLocation[1] + 1]);
        if (boundingSection && boundingSection.topWall !== 'wall') {
          playerLocation = [this.state.playerLocation[0], this.state.playerLocation[1] + 1];
          this.context.messageStore.addMessage('You walked SOUTH');
        }
        break;
      }
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
    return <div className="explore-map">
      <div className="map-container" style={{width: levelStore.level1.size * 14, height: levelStore.level1.size * 14}}>
        {levelStore.level1.levelSections.map(section => {
          const isPlayerLocation = section.coords[0] === this.state.playerLocation[0] && section.coords[1] === this.state.playerLocation[1];
          const isSectionDiscovered = levelStore.getSectionDiscovered(section.coords);
          const wallClasses = `${isSectionDiscovered.leftWall ? "wall-left-"  + section.leftWall : ""} ${isSectionDiscovered.topWall ? "wall-top-"  + section.topWall : ""}`;
          const sectionClass = isSectionDiscovered.tile ?
            "map-square " + wallClasses + (isPlayerLocation ? " player-location" : "")  + ' discovered-' + section.terrain:
            "map-square " + wallClasses;
          return <div key={section.coords[0] + "-" + section.coords[1]} className={sectionClass}></div>;
        })}
      </div>
    </div>;
  }
}

export default MapPanel;
