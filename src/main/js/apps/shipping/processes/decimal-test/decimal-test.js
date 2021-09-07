import { observable, computed, action, makeObservable } from "mobx";
import { injection, FilterDSL } from "@quinscape/automaton-js";
import Q_GarplyList from "./queries/Q_GarplyList";
import GarplyList from "./states/GarplyList";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return GarplyList;
}

export default class AttachmentTestScope {
    @observable
    currentGarply = null;

    /** Current todos */
    @observable
    garplys = injection( Q_GarplyList );

    constructor() {
        makeObservable(this);
    }

    @action
    updateGarplys(garplys)
    {
        this.garplys = garplys;
    }

    @action
    removeGarply(id)
    {
        this.garplys.rows = this.garplys.rows.filter( garply => garply.id !== id);
    }

    @action
    updateCurrent(garply)
    {
        this.currentGarply = garply;
    }
}
