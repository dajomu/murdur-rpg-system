import gameStateStore from '../stores/gameState';
import levelStore from '../stores/levels';
import messageStore from '../stores/messages';
import playerStore from '../stores/player';

export class GameController {
  public reset() {
    console.log('reset!!!');
    playerStore.loadDefaults();
    levelStore.reset(playerStore.playerLocation);
    gameStateStore.reset();
    messageStore.addMessage('You died and were resurrected');
  }
}

const gameController = new GameController();

export default gameController;