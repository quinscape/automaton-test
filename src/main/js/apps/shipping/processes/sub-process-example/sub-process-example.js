import { observable, computed, action, makeObservable } from "mobx";
import { injection } from "@quinscape/automaton-js";
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

    constructor() {
        makeObservable(this);
    }
}
