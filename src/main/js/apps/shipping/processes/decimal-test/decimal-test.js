import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    config,
    storeDomainObject,
    deleteDomainObject,
    backToParent,
    FilterDSL,
    createDomainObject,
    extractTypeData,
    Attachments
} from "@quinscape/automaton-js";
import Q_GarplyList from "./queries/Q_GarplyList";
import Q_GarplyDetail from "./queries/Q_GarplyDetail";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

import GarplyList from "./states/GarplyList";

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
