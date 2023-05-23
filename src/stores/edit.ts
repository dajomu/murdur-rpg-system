import { action, observable, makeObservable } from 'mobx';

type EditMode = 'level' | 'monster';

export class EditStore {

    @observable isEditing: boolean = false;
    @observable editMode: EditMode = 'level';
    @observable selectedEditTile: MapLocation = [15,15];
    @observable showRoomNumbersOnMap: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action toggleIsEditing = () => {
        this.isEditing = !this.isEditing;
    }

    @action toggleShowRoomNumbersOnMap = () => {
        this.showRoomNumbersOnMap = !this.showRoomNumbersOnMap;
    }

    @action selectTileForEditing = (tileLocation: MapLocation) => {
        this.selectedEditTile = [...tileLocation];
    }

    @action changeEditMode = (editMode: EditMode) => {
        this.editMode = editMode;
    }
}

const editStore = new EditStore();

export default editStore;