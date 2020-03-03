import * as React from 'react';

import playerStore from '../stores/player';
import levelStore from '../stores/levels';

const gameContextDefaultValue = {
  levelStore,
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
