import { observable } from "mobx";
import BackTestHome from "./states/BackTestHome";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return BackTestHome;
}



class Nested {

    @observable
    value = 0;
}

export default class BackTestScope {

    @observable
    currentCounter = 0;

    @observable
    nonVersioned = 0;

    @observable
    nested = new Nested();
}
