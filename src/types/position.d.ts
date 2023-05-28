type Direction = 'west' | 'north' | 'east' | 'south';

type MapLocation = [number, number];

type ViewTileMap = {
    'playerRow': MapLocation[],
    'playerOneForwardRow': MapLocation[],
    'playerTwoForwardRow': MapLocation[]
}

type ViewTerrainMap = {
    'playerRow': (Terrain | null)[],
    'playerOneForwardRow': (Terrain | null)[],
    'playerTwoForwardRow': (Terrain | null)[]
}

type ViewWallMap = {
    'playerRow': Walls[],
    'playerOneForwardRow': Walls[],
    'playerTwoForwardRow': Walls[]
}

type ViewTileCoordinateKey = keyof typeof ViewTileMap | keyof typeof ViewTerrainMap;
