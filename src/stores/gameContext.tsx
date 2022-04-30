import * as React from 'react';

import audioStore from './audio';
import editStore from './edit';
import gameStateStore from './gameState';
import itemsStore from './items';
import levelStore from './levels';
import messageStore from './messages';
import monsterStore from './monster';
import playerStore from './player';

export const gameContextDefaultValue = {
  audioStore,
  editStore,
  gameStateStore,
  itemsStore,
  levelStore,
  messageStore,
  monsterStore,
  playerStore,
};

const gameContext = React.createContext(gameContextDefaultValue);

export default gameContext;
export type GameContext = typeof gameContext;
export type GameContextValue = typeof gameContextDefaultValue;
