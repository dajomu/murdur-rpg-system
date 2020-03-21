interface RoomInitData {
  chestId?: number;
  monsterGroupIds: number[];
}

const levelOneRoomInitData: {[key: number]: RoomInitData} = {
  0: { monsterGroupIds: [0] },
  1: { monsterGroupIds: [1] },
  2: { monsterGroupIds: [2] },
  3: { monsterGroupIds: [3] }
};

export default levelOneRoomInitData;