import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class MapPanel extends ComponentWithGameContext {
  render() {
    const {levelStore} = this.context;
    console.log(levelStore.level1.levelSections);
    return <div className="explore-map">
      <div className="map-container" style={{width: levelStore.level1.size * 14, height: levelStore.level1.size * 14}}>
        {levelStore.level1.levelSections.map(section => {
          return <div className={"map-square " + section.walls}></div>;
        })}
      </div>
    </div>;
  }
}

export default MapPanel;
