import {getViewTerrainMapAtCoordinates, convertTerrainMap, northFacingFloorOffsetMap, westFacingFloorOffsetMap} from './encounterPane';

// it('convertTileMap gives the correct ViewTileMap', () => {
//     expect(convertFloorMap(northFacingFloorOffsetMap, [5,5])).toEqual(northFacingTileMapAt55);
//     expect(convertFloorMap(westFacingFloorOffsetMap, [1,1])).toEqual(westFacingTileMapat11);
// });

// it('getViewTileMapAtCoordinates gives the correct ViewTileMap', () => {
//     expect(getViewFloorMapAtCoordinates([5,5], 'north')).toEqual(northFacingTileMapAt55);
//     expect(getViewFloorMapAtCoordinates([1,1], 'west')).toEqual(westFacingTileMapat11);
// });