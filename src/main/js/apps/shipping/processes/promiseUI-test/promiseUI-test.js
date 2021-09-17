import { observable, computed, action, makeObservable } from "mobx";
import { injection, GraphQLQuery } from "@quinscape/automaton-js";
import PromiseUITestHome from "./states/PromiseUITestHome";
// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return PromiseUITestHome;
}

export default class PromiseUITestScope {

    @observable
    delay = true;

    constructor()
    {
        makeObservable(this)
    }

}
