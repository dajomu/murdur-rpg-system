export function saveLevelData(sections: SectionData[]): void {
    const levelString = generateLevelDownload(sections);
    saveFile(levelString);
}

export function generateLevelDownload(sections: SectionData[]): string {
    return `const level1Data: SectionData[] = [
        ${sections.map((section: SectionData) => 
            `{coords : [${section.coords[0]},${section.coords[1]}], leftWall: '${section.leftWall}', topWall: '${section.topWall}', terrain: '${section.terrain}'${section.roomId ? ', roomId:' + section.roomId : '' }},`).join('\n\t')}
    ];`;
}

export function saveFile(saveString: string): void {
    const blob = new Blob([saveString], { type: "text/plain" });
    const a = document.createElement('a');
    a.download = 'level.ts';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };
