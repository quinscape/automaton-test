import { observable, action, makeObservable } from "mobx";
import { injection, FilterDSL } from "@quinscape/automaton-js";
import ValidateAsyncList from "./states/ValidateAsyncList";
import Q_FooList from "../datagrid-test/queries/Q_FooList";
import Q_FooType from "../datagrid-test/queries/Q_FooType";


// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return ValidateAsyncList;
}

export default class ValidateAsyncTestScope {
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

    constructor() {
        makeObservable(this);
    }

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
