import {
    observable,
    computed,
    action,
    runInAction,
    toJS
} from "mobx";

import { injection, Process, type } from "automaton-js";

// noinspection JSUnusedGlobalSymbols
/**
 *
 * @param {Process} process
 * @param {object} scope
 * @return {{startState: string, states: {ProcessTestHome: {"open-sub": {to: string, action: (function(*): *)}}}}}
 */
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: t => {

                t.context = {
                    "accepted": "2017-10-17T22:00:00.000Z",
                    "customer": {
                        "salutation": null,
                        "name": "Lukas Mustermann"
                    },
                    "id": "d734579f-0b0a-4ab6-9ad5-45f4ee29efb1",
                    "number": "B00000001",
                    "shippingType": {
                        "name": "STANDARD"
                    },
                    "status": "PAID",
                    "num": 12345
                };

                t.target = "ProcessTestHome";
            },
            states: {
                "ProcessTestHome": {
                    "open-sub" : {
                        to: "ProcessTestHome",
                        action: t => {

                            return (
                                process.runSubProcess("sub-process-example", t.context)
                                .then(
                                    result => result && runInAction( () => scope.currentOrder = result)
                                )
                            );
                        }
                    },
                    "open-sub2" : {
                        to: "ProcessTestHome",
                        action: t => {

                            return (
                                process.runSubProcess("customer", t.context)
                                .then(
                                    result => result && runInAction( () => scope.currentOrder = result)
                                )
                            );
                        }
                    },
                    "clear" : {
                        to: "ProcessTestHome",
                        action: t => {
                            scope.currentOrder = null
                        }
                    }
                }
            }
        }
    );
}


export default class ProcessTestScope {

    @observable
    @type("Order")
    currentOrder = null;
}
