import audioStore from '../stores/audio';
import playerStore from '../stores/player';
import gameStateStore from '../stores/gameState';
import levelStore from '../stores/levels';
// import monsterStore from '../stores/monster';
import {toJS} from 'mobx';
import messageStore from '../stores/messages';
import { boundingOffsetMap, movementOffsetMap } from '../constants';
import { calculateFightDamage } from '../utils/combat';

export class GameController {
  public reset() {
    console.log('reset!!!');
    // reset all player stats
    // reset game state
    // reset rooms and discovered sections
  }
}

const gameController = new GameController();

export default gameController;