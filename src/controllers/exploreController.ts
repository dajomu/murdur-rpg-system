import audioStore from '../stores/audio';
import playerStore from '../stores/player';
import gameStateStore from '../stores/gameState';
import levelStore from '../stores/levels';
import monsterStore from '../stores/monster';
import messageStore from '../stores/messages';
import { boundingOffsetMap, movementOffsetMap } from '../constants';

const keyDirection: {[key: number]: string} = {
  37: 'counter-clockwise',
  38: 'forward',
  39: 'clockwise',
  40: 'backward',
  70: 'fight' // f key
}

export class ExploreController {
  handleKeyDown = (event: KeyboardEvent) => {
    console.log('KEYCODE: ', event.keyCode);
    const direction = keyDirection[event.keyCode];
    switch(direction) {
      case 'counter-clockwise':
        playerStore.rotatePlayerCounterClockwise();
        break;
      case 'clockwise':
        playerStore.rotatePlayerClockwise();
        break;
      case 'backward':
        playerStore.turnAround();
        break;
      case 'forward':
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
      const playerLocation: MapLocation = [playerStore.playerLocation[0] + movementOffset[0], playerStore.playerLocation[1] + movementOffset[1]];
      levelStore.level1.markSectionDiscovered(playerLocation);
      playerStore.setPlayerLocation(playerLocation);

      return true;
    } else {
      return false;
    }
  }

  setUpRoomMonsters(playerLocation: MapLocation, direction: Direction) {
    const levelSection = levelStore.getSectionByCoords(playerLocation);
    if (levelSection && typeof levelSection.roomId === 'number') {
      const room = levelStore.level1.levelRooms[levelSection.roomId];
      const monsters =  room.groups.map(group => monsterStore.monsters[group.monsterId]);
      
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