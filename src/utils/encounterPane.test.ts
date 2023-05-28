import {comboCoordinates, getViewTerrainMapAtCoordinates, convertTerrainMap, northFacingFloorOffsetMap, westFacingFloorOffsetMap} from './encounterPane';

const northFacingTileMapAt55 = {
    playerLocation: [[4,5], [5,5], [6,5]],
    playerOneForward: [[4,4], [5,4], [6,4]],
    playerTwoForward: [[3,3],[4,3], [5,3], [6,3], [7,3]],
}

const westFacingTileMapat11 = {
    playerLocation: [[1,2], [1,1], [1,0]],
    playerOneForward: [[0,2], [0,1], [0,0]],
    playerTwoForward: [[-1,3],[-1,2], [-1,1], [-1,0], [-1,-1]],
}

it('comboCoordinates combines coordinates correctly', () => {
    expect(comboCoordinates([1,1], [1,1])).toEqual([2,2]);
    expect(comboCoordinates([5,10], [-3,4])).toEqual([2,14]);
});

// it('convertTileMap gives the correct ViewTileMap', () => {
//     expect(convertFloorMap(northFacingFloorOffsetMap, [5,5])).toEqual(northFacingTileMapAt55);
//     expect(convertFloorMap(westFacingFloorOffsetMap, [1,1])).toEqual(westFacingTileMapat11);
// });

// it('getViewTileMapAtCoordinates gives the correct ViewTileMap', () => {
//     expect(getViewFloorMapAtCoordinates([5,5], 'north')).toEqual(northFacingTileMapAt55);
//     expect(getViewFloorMapAtCoordinates([1,1], 'west')).toEqual(westFacingTileMapat11);
// });