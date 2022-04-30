import { action, observable, makeObservable } from 'mobx';

export class EditStore {

    @observable isEditing: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action toggleIsEditing = () => {
        this.isEditing = !this.isEditing;
      }
}

const editStore = new EditStore();

export default editStore;