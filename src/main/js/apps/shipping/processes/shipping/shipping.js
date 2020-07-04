import {
    observable,
    computed,
    action
} from "mobx";

import { injection } from "automaton-js";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "ShippingHome",
            states: {
                "ShippingHome": []
            }
        }
    );
}

// export default class HomeScope {
//
// }
