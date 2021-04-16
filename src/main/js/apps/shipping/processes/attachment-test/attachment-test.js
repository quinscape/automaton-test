import { observable, computed, action } from "mobx";
import { injection, FilterDSL } from "@quinscape/automaton-js";
import Q_GraultList from "./queries/Q_GraultList";
import GraultList from "./states/GraultList";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return GraultList;
}

export default class AttachmentTestScope {

    @observable
    currentGrault = null;

    /** Current todos */
    @observable
    graults = injection( Q_GraultList );
    
    @action
    updateGraults(graults)
    {
        this.graults = graults;
    }

    @action
    removeGrault(id)
    {
        this.graults.rows = this.graults.rows.filter( grault => grault.id !== id);
    }

    @action
    updateCurrent(grault)
    {
        this.currentGrault = grault;
    }
}
