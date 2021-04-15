import {
    observable,
    action, isObservable
} from "mobx";

import {
    injection,
    config,
    createDomainObject,
    storeDomainObject,
    deleteDomainObject,
    backToParent,

    FilterDSL
} from "@quinscape/automaton-js";

import Q_FooType from "../datagrid-test/queries/Q_FooType"
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail"
import Q_FooList from "../datagrid-test/queries/Q_FooList"

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

import CRUDList from "./states/CRUDList";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return CRUDList;
}

export default class MonitorTestScope {

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
        this.foos.rows = this.foos.rows.filter( foo => foo.id !== id);
    }

    @action
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
