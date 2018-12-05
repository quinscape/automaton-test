import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    type
} from "automaton-js";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "CustomerList",
            states: {
                "CustomerList":
                    {
                        "to-detail": {
                            to: "CustomerDetail",
                            action: t => {
                                scope.currentCustomer = t.context;
                            }
                        }
                    }
                ,
                "CustomerDetail": {
                    "save": {
                        to: "CustomerList",
                        action: t => {

                            console.log("Transition 'save': ", toJS(t.context))
                        }
                    },
                    "cancel": {
                        to: "CustomerList",
                        action: t => {

                            console.log("Transition 'cancel'")
                        }
                    }
                }
            }
        }
    );
};

export default class CustomerScope {

    @observable
    currentCustomer = null;

    /** Current todos */
    @observable
    customers = injection(
        // language=GraphQL
            `{
                getCustomers{
                    rows{
                        id
                        number
                        salutation
                        name
                    }
                }
            }`
    );

    @action
    updateCustomers(customers)
    {
        this.customers = customers;
    }
}
