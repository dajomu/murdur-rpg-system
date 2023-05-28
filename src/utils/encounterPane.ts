import {LevelStore} from '../stores/levels';

export const northFacingFloorOffsetMap: ViewTileMap = {
    playerRow: [[-1,0], [0,0], [1,0]],
    playerOneForwardRow: [[-1,-1], [0,-1], [1,-1]],
    playerTwoForwardRow: [[-2,-2],[-1,-2], [0,-2], [1,-2], [2,-2]],
}

export const southFacingFloorOffsetMap: ViewTileMap = {
    playerRow: [[1,0], [0,0], [-1,0]],
    playerOneForwardRow: [[1,1], [0,1], [-1,1]],
    playerTwoForwardRow: [[2,2],[1,2], [0,2], [-1,2], [-2,2]],
}

export const eastFacingFloorOffsetMap: ViewTileMap = {
    playerRow: [[0,-1], [0,0], [0,1]],
    playerOneForwardRow: [[1,-1], [1,0], [1,1]],
    playerTwoForwardRow: [[2,-2],[2,-1], [2,0], [2,1], [2,2]],
}

export const westFacingFloorOffsetMap: ViewTileMap = {
    playerRow: [[0,1], [0,0], [0,-1]],
    playerOneForwardRow: [[-1,1], [-1,0], [-1,-1]],
    playerTwoForwardRow: [[-2,2],[-2,1], [-2,0], [-2,-1], [-2,-2]],
}


export const northFacingLeftWallOffsetMap: ViewTileMap = {
    playerRow: [[0,0], [1,0]],
    playerOneForwardRow: [[-1,-1], [0,-1], [1,-1], [2,-1]],
    playerTwoForwardRow: [[-2,-2],[-1,-2], [0,-2], [1,-2], [2,-2], [3,-2]],
}

export const southFacingLeftWallOffsetMap: ViewTileMap = {
    playerRow: [[1,0], [0,0]],
    playerOneForwardRow: [[2,1], [1,1], [0,1], [-1,1]],
    playerTwoForwardRow: [[3,2,], [2,2],[1,2], [0,2], [-1,2], [-2,2]],
}

export const eastFacingLeftWallOffsetMap: ViewTileMap = {
    playerRow: [[1,-1], [1,0], [1,-1]],
    playerOneForwardRow: [[2,-1], [2,0], [2,1],],
    playerTwoForwardRow: [[3,-2],[3,-1], [3,0], [3,1], [3,2]],
}

export const westFacingLeftWallOffsetMap: ViewTileMap = {
    playerRow: [[0,1], [0,0], [0,-1]],
    playerOneForwardRow: [[-1,1], [-1,0], [-1,-1]],
    playerTwoForwardRow: [[-2,2],[-2,1], [-2,0], [-2,-1], [-2,-2]],
}


export const comboCoordinates = function(offsetOne: [number, number], offsetTwo: [number,number]): [number, number] {
    return [offsetOne[0] + offsetTwo[0], offsetOne[1] + offsetTwo[1]];
}

export const getViewTerrainMapAtCoordinates = (playerLocation: MapLocation, playerDirection: Direction, levelStore: LevelStore): ViewTerrainMap => {
    switch (playerDirection) {
        case 'north':
          return convertTerrainMap(northFacingFloorOffsetMap, playerLocation, levelStore);
        case 'south':
            return convertTerrainMap(southFacingFloorOffsetMap, playerLocation, levelStore);
        case 'east':
            return convertTerrainMap(eastFacingFloorOffsetMap, playerLocation, levelStore);
        default:
            return convertTerrainMap(westFacingFloorOffsetMap, playerLocation, levelStore);
      }
}

type ViewTileCoordinateKey = 'playerRow' | 'playerOneForwardRow' | 'playerTwoForwardRow';

export const convertTerrainMap = (offsetMap: ViewTileMap, playerLocation: MapLocation, levelStore: LevelStore): ViewTerrainMap => {
    const viewTerrainMap: ViewTerrainMap = {playerRow: [], playerOneForwardRow: [], playerTwoForwardRow: []};
    viewTerrainMap['playerRow'] = offsetMap['playerRow'].map(tile => {
        return levelStore.getFloor(playerLocation, tile);
    });
    viewTerrainMap['playerOneForwardRow'] = offsetMap['playerOneForwardRow'].map(tile => {
        return levelStore.getFloor(playerLocation, tile);
    });
    viewTerrainMap['playerTwoForwardRow'] = offsetMap['playerTwoForwardRow'].map(tile => {
        return levelStore.getFloor(playerLocation, tile);
    });
    return viewTerrainMap;
}

export const getViewFacingWallMapAtCoordinates = (playerLocation: MapLocation, playerDirection: Direction, levelStore: LevelStore): ViewWallMap => {
    switch (playerDirection) {
        case 'north':
          return convertWallMap(northFacingFloorOffsetMap, playerLocation, playerDirection, levelStore);
        case 'south':
            return convertWallMap(southFacingFloorOffsetMap, playerLocation, playerDirection, levelStore);
        case 'east':
            return convertWallMap(eastFacingFloorOffsetMap, playerLocation, playerDirection, levelStore);
        default:
            return convertWallMap(westFacingFloorOffsetMap, playerLocation, playerDirection, levelStore);
      }
}

export const convertWallMap = (offsetMap: ViewTileMap, playerLocation: MapLocation, playerDirection: Direction, levelStore: LevelStore): ViewWallMap => {
    const viewTerrainMap: ViewWallMap = {playerRow: [], playerOneForwardRow: [], playerTwoForwardRow: []};
    viewTerrainMap['playerRow'] = offsetMap['playerRow'].map(tile => {
        return levelStore.getWallFace(playerLocation, playerDirection, tile);
    });
    viewTerrainMap['playerOneForwardRow'] = offsetMap['playerOneForwardRow'].map(tile => {
        return levelStore.getWallFace(playerLocation, playerDirection, tile);
    });
    viewTerrainMap['playerTwoForwardRow'] = offsetMap['playerTwoForwardRow'].map(tile => {
        return levelStore.getWallFace(playerLocation, playerDirection, tile);
    });
    return viewTerrainMap;
}

