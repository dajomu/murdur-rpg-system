interface RoomInitData {
  chestId?: number;
  monsterGroupId: number;
}

const levelOneRoomInitData: {[key: number]: RoomInitData} = {
  0: { monsterGroupId: 0 },
  1: { monsterGroupId: 1 },
  2: { monsterGroupId: 2 },
  3: { monsterGroupId: 3 }
};

export default levelOneRoomInitData;