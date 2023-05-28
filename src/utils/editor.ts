import {isUndefined} from 'lodash';

export function saveLevelData(sections: SectionData[], rooms: { [key: string]: RoomData }): void {
    const levelString = generateLevelDownload(sections, rooms) + '\n\n' + generateLevelRoomsDownload(rooms);
    saveLevelFile(levelString);
}

export function generateLevelDownload(sections: SectionData[], rooms: { [key: string]: RoomData }): string {
    return `export const level1Data: SectionData[] = [
        ${sections.map((section: SectionData) => 
            `{coords : [${section.coords[0]},${section.coords[1]}], leftWall: '${section.leftWall}', topWall: '${section.topWall}', terrain: '${section.terrain}'${!isUndefined(section.roomId) ? ', roomId: ' + section.roomId : '' }},`).join('\n\t')}
    ];`;
}

export function generateLevelRoomsDownload(rooms: { [key: string]: RoomData }): string {    
    return `export const level1RoomInitData: {[key: number]: RoomInitData} = {
        ${Object.keys(rooms).map((roomId: string) => 
            `${roomId}: { monsterGroupIds: [${rooms[roomId].monsterGroupIds.map(mgId => `'${mgId}'`).join(',')}], name: '${rooms[roomId].name}'${rooms[roomId].description ? ', description: "' + rooms[roomId].description?.replaceAll("'", "'").replaceAll("\n", "\\n") + '"' : '' }},`).join('\n\t')}
    };`;
}

export function saveLevelFile(saveString: string): void {
    const blob = new Blob([saveString], { type: "text/plain" });
    const a = document.createElement('a');
    a.download = `level-${new Date().toISOString()}.ts`;
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
};
