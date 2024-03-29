import { observable, computed, action, makeObservable } from "mobx";
import ProcessTestHome from "./states/ProcessTestHome";

// noinspection JSUnusedGlobalSymbols
/**
 *
 * @param {Process} process
 * @param {object} scope
 */
export function initProcess(process, scope) {
    return ProcessTestHome;
}


export default class ProcessTestScope {
    @observable
    currentOrder = null;

    constructor() {
        makeObservable(this);
    }
}
