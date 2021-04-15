import {
    observable,
    action
} from "mobx";

import {
    injection,
    config,
    createDomainObject,

    FilterDSL,
    WorkingSet
} from "@quinscape/automaton-js";
import Q_FooList from "../datagrid-test/queries/Q_FooList";
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail";
import Q_FooType from "../datagrid-test/queries/Q_FooType";
import { DateTime } from "luxon";

// deconstruct FilterDSL methods
const {field, value} = FilterDSL;


import WSTestList from "./states/WSTestList";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return WSTestList;
}


export default class WorkingSetTestScope {

    workingSet = new WorkingSet();

    @observable
    currentFoo = null;

    /** Foo iQuery  */
    @observable
    foos = injection(Q_FooList);

    /**
     *  Example for an iQuery being used to drive a <Select/>
     *
     *  We could just as well define the values as constants in this case
     *
     * const FOO_TYPES = [
     *     "TYPE_A",
     *     "TYPE_B",
     *     "TYPE_C",
     *     "TYPE_D"
     * ];
     *  */
    @observable
    fooTypes = injection(
        Q_FooType
    );


    @action
    updateFoos(foos)
    {
        this.foos = foos;
    }


    @action
    removeFoo(id)
    {
        this.foos.rows = this.foos.rows.filter(foo => foo.id !== id);
    }


    @action
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
