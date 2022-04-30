import { action, observable, makeObservable } from 'mobx';

export class EditStore {

    @observable isEditing: boolean = false;
    @observable selectedEditTile: MapLocation = [15,15];

    constructor() {
        makeObservable(this);
    }

    @action toggleIsEditing = () => {
        this.isEditing = !this.isEditing;
    }

    @action selectTileForEditing = (tileLocation: MapLocation) => {
        console.log('selectTileForEditing', tileLocation);
        this.selectedEditTile = [...tileLocation];
    }
}

const editStore = new EditStore();

export default editStore;