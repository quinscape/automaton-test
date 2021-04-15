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
import {  FieldMode  } from "domainql-form";
import Q_GraultList from "./queries/Q_GraultList";
import Q_GraultDetail from "./queries/Q_GraultDetail";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

import GraultList from "./states/GraultList";

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
