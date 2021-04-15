import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import { injection, type } from "@quinscape/automaton-js";
import Q_Foo from "../iterator-test/queries/Q_Foo";
import Q_FooList from "../datagrid-test/queries/Q_FooList";

import SubProcessHome from "./states/SubProcessHome";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    // process config
    process.options.forceSubProcess = true;

    return SubProcessHome;
}

export default class MySubProcessScope {

    /** Current orders */
    @observable
    foos = injection( Q_FooList );

}
