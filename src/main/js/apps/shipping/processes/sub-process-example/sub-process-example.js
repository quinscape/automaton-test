import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import { injection, type } from "@quinscape/automaton-js";
import Q_Foo from "../iterator-test/queries/Q_Foo";
import Q_FooList from "../datagrid-test/queries/Q_FooList";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config
    process.options.forceSubProcess = true;

    // return process states and transitions
    return (
        {
            startState: "SubProcessHome",
            states: {
                "SubProcessHome": {
                    "choose" : {
                        action: t => process.endSubProcess(t.context)
                    },
                    "close" : {
                        action: t => process.endSubProcess(null)
                    }
                }
            }
        }
    );
}

export default class MySubProcessScope {

    /** Current orders */
    @observable
    foos = injection( Q_FooList );

}
