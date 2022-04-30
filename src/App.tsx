import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer';
import GlobalControls from './components/GlobalControls';
import Header from './components/Header';
import ExploreScreen from './screens/ExploreScreen';
import EditScreen from './screens/EditScreen';
import './main.css';
import gameContext, { gameContextDefaultValue } from './stores/gameContext';

function App() {
  return (
    <div className="App">
      <gameContext.Provider value={gameContextDefaultValue}>
        <Header />
        <BrowserRouter>
          <GlobalControls />
          <Routes>
            <Route path="murdur-rpg-system/" element={<ExploreScreen />} />
            <Route path="murdur-rpg-system/edit" element={<EditScreen />} />
          </Routes>
        </BrowserRouter>
        <AudioPlayer />
      </gameContext.Provider>
    </div>
  );
}

export default App;
