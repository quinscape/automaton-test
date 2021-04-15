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

import Q_Foo from "./queries/Q_Foo";

// deconstruct FilterDSL methods
const {field, value} = FilterDSL;


import IteratorTestList from "./states/IteratorTestList";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return IteratorTestList;
}


export default class IteratorTestScope {

    /** Foo iQuery  */
    @observable
    foos = injection(Q_Foo);


    @action
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
