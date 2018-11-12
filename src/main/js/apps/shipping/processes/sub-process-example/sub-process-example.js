import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import { injection, type } from "automaton-js";

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
    @type("PagedOrder")
    orders = injection(
        // language=GraphQL
        `{
                getOrders
                {
                    rowCount
                    rows{
                        accepted
                        customer{
                            salutation
                            name
                        },
                        id
                        number
                        shippingType{
                            name
                        }
                        status
                    }
                }
        }`
    );

}
