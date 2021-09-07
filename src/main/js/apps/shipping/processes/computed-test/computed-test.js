import { observable, action, makeObservable } from "mobx";
import { injection, FilterDSL } from "@quinscape/automaton-js";
import Q_PlughList from "./queries/Q_PlughList";
import PlughList from "./states/PlughList";


// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return PlughList;
}

export default class ComputedTestScope {
    @observable
    currentPlugh = null;

    /** Plugh iQuery  */
    @observable
    plughs = injection(Q_PlughList);

    constructor() {
        makeObservable(this);
    }

    @action
    updatePlughs(plughs)
    {
        this.plughs = plughs;
    }

    @action
    removePlugh(id)
    {
        this.plughs.rows = this.plughs.rows.filter( plugh => plugh.id !== id);
    }

    @action
    updateCurrent(plugh)
    {
        this.currentPlugh = plugh;
    }
}
