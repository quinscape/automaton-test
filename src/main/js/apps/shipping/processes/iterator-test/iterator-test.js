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


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "IteratorTestList",
            states: {
                "IteratorTestList":
                    {}
            }
        }
    );
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
