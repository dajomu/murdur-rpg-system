import React from 'react';
import AudioPlayer from './components/AudioPlayer';
import GlobalControls from './components/GlobalControls';
import Header from './components/Header';
import ExploreScreen from './screens/ExploreScreen';
import './main.css';
import gameContext, { gameContextDefaultValue } from './components/ComponentWithGameContext';

function App() {
  return (
    <div className="App">
      <gameContext.Provider value={gameContextDefaultValue}>
        <Header />
        <ExploreScreen />
        <GlobalControls />
        <AudioPlayer />
      </gameContext.Provider>
    </div>
  );
}

export default App;
