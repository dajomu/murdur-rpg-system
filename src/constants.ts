type Direction = 'west' | 'north' | 'east' | 'south';

export const boundingOffsetMap: {[key: string]: [number, number]} = {
  west: [0,0],
  north: [0,0],
  east: [1,0],
  south: [0,1]
};

export const movementOffsetMap: {[key: string]: [number, number]} = {
  west: [-1,0],
  north: [0,-1],
  east: [1,0],
  south: [0,1]
};

export const clockwiseRotationMap: {[key: string]: Direction} = {
  'west': 'north',
  'north': 'east',
  'east': 'south',
  'south': 'west'
};

export const counterClockwiseRotationMap: {[key: string]: Direction} = {
  'west': 'south',
  'north': 'west',
  'east': 'north',
  'south': 'east'
};

export const turnAroundMap: {[key: string]: Direction} = {
  'west': 'east',
  'north': 'south',
  'east': 'west',
  'south': 'north'
};
