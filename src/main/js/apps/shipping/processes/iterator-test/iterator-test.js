import { action, observable } from "mobx";
import { FilterDSL, injection } from "@quinscape/automaton-js";
import Q_Foo from "./queries/Q_Foo";
import IteratorTestList from "./states/IteratorTestList";

// deconstruct FilterDSL methods
const {field, value} = FilterDSL;


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
