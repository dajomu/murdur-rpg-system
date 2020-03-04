// import { observable } from 'mobx';

interface SectionData {
  coords: [number, number],
  leftWall: string;
  topWall: string;
  terrain: string;
  modifier?: string;
}

interface DiscoveredSection {
  leftWall: boolean;
  topWall: boolean;
  tile: boolean,
  modifier: boolean
}

export default class LevelMap {
  levelSections: SectionData[] = [];//Map<[number, number], SectionData> = new Map();
  size: number;
  discoveredSections: { [key: string]: DiscoveredSection } = {};

  constructor(size = 10, randomise = true) {
    this.size = size;
    if (randomise) { this.randomlyPopulateMap() }
  }

  public markSectionDiscovered = (coords: [number, number]) => {
    this.discoveredSections[`${coords[0]}-${coords[1]}`] = { tile: true, modifier: true, leftWall: true, topWall: true };
    if(this.discoveredSections[`${coords[0] + 1}-${coords[1]}`]) {
      this.discoveredSections[`${coords[0] + 1}-${coords[1]}`].leftWall = true;
    }
    if(this.discoveredSections[`${coords[0]}-${coords[1] + 1}`]) {
      this.discoveredSections[`${coords[0]}-${coords[1] + 1}`].topWall = true;
    }
  }

  public isSectionDiscovered = (coords: [number, number]) => {
    return this.discoveredSections[`${coords[0]}-${coords[1]}`] ? this.discoveredSections[`${coords[0]}-${coords[1]}`].tile : false;
  }

  private randomlyPopulateMap = () => {
    for(var ycord = 0; ycord < this.size; ycord++) {
      for(var xcord = 0; xcord < this.size; xcord++) {
        this.levelSections.push({coords: [xcord, ycord], leftWall: this.getRandomWall(), topWall: this.getRandomWall(), terrain: this.getRandomTerrain()});
        this.discoveredSections[`${xcord}-${ycord}`] = { tile: false, modifier: false, leftWall: false, topWall: false };
      }
    }
  }

  private getRandomWall = (): string => {
    const randomWall = Math.round(1 + Math.random() * 4);
    return randomWall >= 4 ? 'wall' : randomWall === 1 ? 'door' : 'none';
  }

  private getRandomTerrain = (): string => {
    switch(Math.round(1 + Math.random() * 6)) {
      case 1:
        return 'sand';
      case 2:
        return 'water';
      default:
        return 'none';
    }
  }
}
