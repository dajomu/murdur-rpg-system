import audioStore from '../stores/audio';
import playerStore, { Direction } from '../stores/player';
import levelStore from '../stores/levels';
import messageStore from '../stores/messages';

const keyDirection: {[key: number]: string} = {
  37: 'counter-clockwise',
  38: 'forward',
  39: 'clockwise',
  40: 'backward'
}

const boundingOffsetMap: {[key: string]: [number, number]} = {
  west: [0,0],
  north: [0,0],
  east: [1,0],
  south: [0,1]
}

const movementOffsetMap: {[key: string]: [number, number]} = {
  west: [-1,0],
  north: [0,-1],
  east: [1,0],
  south: [0,1]
}

export class ExploreController {
  handleKeyDown = (event: KeyboardEvent) => {
    const direction = keyDirection[event.keyCode];
    switch(direction) {
      case 'counter-clockwise':
        playerStore.rotatePlayerCounterClockwise();
        break;
      case 'clockwise':
        playerStore.rotatePlayerClockwise();
        break;
      case 'forward':
      // case 'backward':
        if(this.moveDirection(playerStore.playerDirection)) {
          messageStore.addMessage(`You walked ${playerStore.playerDirection.toUpperCase()}`);
        } else {
          audioStore.playAudio('player', 'hitwall');
        };
        break;
      default: 
        break;
    }
  }

  moveDirection(direction: Direction) {
    if (this.checkMoveWallCollision(direction)) {
      const movementOffset = movementOffsetMap[direction];
      const playerLocation: [number, number] = [playerStore.playerLocation[0] + movementOffset[0], playerStore.playerLocation[1] + movementOffset[1]];
      levelStore.level1.markSectionDiscovered(playerLocation);
      playerStore.setPlayerLocation(playerLocation);
      return true;
    } else {
      return false;
    }
  }

  checkMoveWallCollision(direction: Direction) {
    const boundingOffset = boundingOffsetMap[direction];
    const boundingSection = levelStore.getSectionByCoords([playerStore.playerLocation[0] + boundingOffset[0], playerStore.playerLocation[1] + boundingOffset[1]]);
    if(direction === 'north' || direction === 'south') {
      return boundingSection && boundingSection.topWall !== 'wall' && playerStore.playerLocation[1] + boundingOffset[1] >= 1;
    } else {
      return boundingSection && boundingSection.leftWall !== 'wall' && playerStore.playerLocation[0] + boundingOffset[0] >= 1;
    }
    
  }
  

  setupKeyboardListeners() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  removeKeyboardListeners() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
}

const exploreController = new ExploreController();

export default exploreController;