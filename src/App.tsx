import React from 'react';
import AudioPlayer from './components/AudioPlayer';
import Header from './components/Header';
import ExploreScreen from './screens/ExploreScreen';
import './main.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ExploreScreen />
      <AudioPlayer />
    </div>
  );
}

export default App;
