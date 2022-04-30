import * as React from 'react';

import audioStore from './audio';
import gameStateStore from './gameState';
import itemsStore from './items';
import levelStore from './levels';
import messageStore from './messages';
import monsterStore from './monster';
import playerStore from './player';

export const gameContextDefaultValue = {
  audioStore,
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

export abstract class ComponentWithGameContext<P = {}, S = {}, SS = any>
  extends React.Component<P, S, SS> {
  static contextType = gameContext;
  context!: React.ContextType<GameContext>;
};
