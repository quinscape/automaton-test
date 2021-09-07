import { observable, makeObservable } from "mobx";
import BackTestHome from "./states/BackTestHome";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return BackTestHome;
}



class Nested {
    @observable
    value = 0;

    constructor() {
        makeObservable(this);
    }
}

export default class BackTestScope {
    @observable
    currentCounter = 0;

    @observable
    nonVersioned = 0;

    @observable
    nested = new Nested();

    constructor() {
        makeObservable(this);
    }
}
