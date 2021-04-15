import {
    observable,
    computed,
    action
} from "mobx";

import { injection } from "@quinscape/automaton-js";

import ShippingHome from "./states/ShippingHome";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return ShippingHome;
}

// export default class HomeScope {
//
// }
