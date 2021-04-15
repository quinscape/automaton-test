import { action, observable } from "mobx";

import {
    backToParent,
    createDomainObject,
    deleteDomainObject,
    extractTypeData,
    FilterDSL,
    injection,
    storeDomainObject
} from "@quinscape/automaton-js";

import Q_QuxMain from "./queries/Q_QuxMain";
import Q_QuxDetail from "./queries/Q_QuxDetail";
import Q_QuxD from "../../queries/Q_QuxD";
import Q_QuxD_Injected from "../../queries/Q_QuxD_Injected";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


import FKTestList from "./states/FKTestList";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return FKTestList;
}

export default class FKTestScope {

    @observable
    currentQux = null;

    /** Qux iQuery  */
    @observable
    quxes = injection( Q_QuxMain );

    /** Qux D injection  */
    @observable
    quxDs = injection( Q_QuxD_Injected );

    @action
    updateCurrent(qux)
    {
        this.currentQux = qux;
    }
}
