// import { observable } from 'mobx';

interface SectionData {
  coords: [number, number],
  walls: string,// sections are encoded with top and left walls
  terrain: string;
  modifier?: string;
}

export default class LevelMap {
  levelSections: SectionData[] = [];//Map<[number, number], SectionData> = new Map();
  size: number;

  constructor(size = 10, randomise = true) {
    this.size = size;
    if (randomise) { this.randomlyPopulateMap() }
    // this.levelSections.forEach((value, key) => {console.log(value, key)})
  }

  private randomlyPopulateMap = () => {
    for(var xcord = 0; xcord < this.size; xcord++) {
      for(var ycord = 0; ycord < this.size; ycord++) {
        this.levelSections.push({coords: [xcord, ycord], walls: this.getRandomWalls(), terrain: this.getRandomTerrain()})
      }
    }
  }

  private getRandomWalls = (): string => {
    const leftRand = Math.round(1 + Math.random() * 2);
    const rightRand = Math.round(1 + Math.random() * 2);
    return `${leftRand === 1 ? 'wall' : leftRand === 2 ? 'door' : 'none'}-${rightRand === 1 ? 'wall' : rightRand === 2 ? 'door' : 'none'}`
  }

  private getRandomTerrain = (): string => {
    switch(Math.round(1 + Math.random() * 4)) {
      case 1:
        return 'sand';
      case 2:
        return 'water';
      default:
        return 'none';
    }
  }
}
