import {toJS} from 'mobx';
import {isUndefined} from 'lodash';
import audioStore from '../stores/audio';
import playerStore from '../stores/player';
import gameStateStore from '../stores/gameState';
import levelStore from '../stores/levels';
// import monsterStore from '../stores/monster';
import messageStore from '../stores/messages';
import { boundingOffsetMap, movementOffsetMap } from '../constants';
import { calculateFightDamage } from '../utils/combat';

const keyDirection: {[key: number]: string} = {
  37: 'counter-clockwise',
  38: 'forward',
  39: 'clockwise',
  40: 'backward',
  70: 'fight' // f key
}

const collisionableWalls = [
  'wall',
  'chair',
  'grave'
]

export class ExploreController {
  handleKeyDown = (event: KeyboardEvent) => {
    // console.log('KEYCODE: ', event.keyCode);
    if(gameStateStore.gameState === 'EXPLORE') {
      const direction = keyDirection[event.keyCode];
      switch(direction) {
        case 'fight':
          gameStateStore.startFight('player');
          this.fight();
          break;
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
  }

  moveDirection(direction: Direction) {
    if (this.checkMoveWallCollision(direction)) {
      const movementOffset = movementOffsetMap[direction];
      const playerLocation: MapLocation = [playerStore.playerLocation[0] + movementOffset[0], playerStore.playerLocation[1] + movementOffset[1]];
      if(!levelStore.level1.isSectionDiscovered(playerLocation)) {
        levelStore.level1.markSectionDiscovered(playerLocation);
        playerStore.increaseExperience(1);
      }
      playerStore.setPlayerLocation(playerLocation);
      this.checkAndChangeRoom(playerLocation);
      return true;
    } else {
      return false;
    }
  }

  checkAndChangeRoom(playerLocation: MapLocation) {
    const levelSection = levelStore.getSectionByCoords(playerLocation);
    const newRoomId = !!levelSection ? levelSection.roomId : 'empty';
    const currentRoomId = gameStateStore.currentRoom ? gameStateStore.currentRoom.id : undefined;
    const newRoom = newRoomId !== 'empty' ? levelStore.level1.levelRooms[newRoomId!] : undefined;

    if(newRoomId !== currentRoomId) { // if changing rooms
      if(!isUndefined(gameStateStore.currentRoom)) {
        levelStore.level1.levelRooms[gameStateStore.currentRoom.id] = {...gameStateStore.currentRoom!};
      }
      const currentFighter = newRoom && !isUndefined(newRoom.currentFighter) ? newRoom.currentFighter : 'player';
      gameStateStore.setCurrentRoom(newRoom ? {...newRoom, isFighting: this.calculateIsFighting(newRoom), currentFighter} : undefined);
      if(!isUndefined(newRoom) && newRoom.description) {
        messageStore.addMessage(newRoom.description);
      }
      if(this.calculateIsFighting(newRoom)) {
        this.fight();
      }
    }
  }

  fight() {
    const {currentRoom, gameState} = gameStateStore;
    if(currentRoom) {console.log('Fight !!!!', toJS(currentRoom), currentRoom.isFighting, currentRoom.currentFighter);}
    if(currentRoom && currentRoom.isFighting && gameState === 'EXPLORE' && !isUndefined(currentRoom.currentFighter)){
      // fight stuff
      if(currentRoom.currentFighter === 'player') {
        const damage = calculateFightDamage(playerStore, currentRoom.groups[0].monster);
        gameStateStore.setCurrentAttackResult(currentRoom.currentFighter, damage);
        gameStateStore.hurtcurrentTargettedGroup(damage);
        gameStateStore.setCurrentFighter(0);
      } else if (typeof currentRoom.currentFighter === 'number' && currentRoom.groups[currentRoom.currentFighter]) {
        const damage = calculateFightDamage(currentRoom.groups[currentRoom.currentFighter].monster, playerStore);
        gameStateStore.setCurrentAttackResult(currentRoom.currentFighter, damage);
        this.hurtPlayer(damage);
        if (currentRoom.currentFighter <= currentRoom.groups.length - 2) {
          gameStateStore.setCurrentFighter((currentRoom.currentFighter + 1)  as 0 | 1 | 2 | 3);
        } else {
          gameStateStore.setCurrentFighter('player');
        }
      }
      // setup next move
      setTimeout(() => {
        this.fight();
      }, 1000);
    }
  }

  calculateIsFighting(newRoom?: RoomData): boolean {
    if(newRoom) {
      if(!isUndefined(newRoom.isFighting)) {
        return newRoom.isFighting;
      } else if (newRoom.groups.length){
        return newRoom.groups[0].monster.alignment !== playerStore.alignment;
      } else {
        return false;
      }
    }
    return false;
  }

  hurtPlayer(damage: number) {
    if(playerStore.currentHits - damage <= 0) {
      playerStore.setDead();
      gameStateStore.setDead();
    } else {
      playerStore.hurtPlayer(damage)
    }
  }

  checkMoveWallCollision(direction: Direction) {
    const boundingOffset = boundingOffsetMap[direction];
    const boundingSection = levelStore.getSectionByCoords([playerStore.playerLocation[0] + boundingOffset[0], playerStore.playerLocation[1] + boundingOffset[1]]);
    if(direction === 'north' || direction === 'south') {
      return boundingSection && !collisionableWalls.includes(boundingSection.topWall) && playerStore.playerLocation[1] + boundingOffset[1] >= 1;
    } else {
      return boundingSection && !collisionableWalls.includes(boundingSection.leftWall) && playerStore.playerLocation[0] + boundingOffset[0] >= 1;
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