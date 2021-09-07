import { action, observable, makeObservable } from "mobx";
import { FilterDSL, injection } from "@quinscape/automaton-js";
import Q_QuxMain from "./queries/Q_QuxMain";
import Q_QuxD_Injected from "../../queries/Q_QuxD_Injected";
import FKTestList from "./states/FKTestList";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


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

    constructor() {
        makeObservable(this);
    }

    @action
    updateCurrent(qux)
    {
        this.currentQux = qux;
    }
}
