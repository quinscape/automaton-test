import {
    observable,
    computed,
    action,
    runInAction,
    toJS
} from "mobx";

import { injection, Process, type } from "@quinscape/automaton-js";
import LayoutV2 from "../../../../components/LayoutV2";
import LayoutV3 from "../../../../components/LayoutV3";
import LayoutV4 from "../../../../components/LayoutV4";

import MultiLayoutHome from "./states/MultiLayoutHome";

// noinspection JSUnusedGlobalSymbols
/**
 *
 * @param {Process} process
 * @param {object} scope
 * @return {{startState: string, states: {ProcessTestHome: {"open-sub": {to: string, action: (function(*): *)}}}}}
 */
export function initProcess(process, scope) {
    // process config
    process.options.layout = {
        MultiLayoutA : LayoutV2,
        MultiLayoutB : LayoutV3,

        // use local default or not depending on input value
        "default" : process.input.useDefault ? LayoutV4 : null
    };

    return MultiLayoutHome;
}

