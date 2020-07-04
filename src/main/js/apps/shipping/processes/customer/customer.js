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

                                console.log("Transition 'to-detail'", toJS(t.context))
                            }
                        }
                    }
                ,
                "CustomerDetail": {
                    "save": {
                        to: "CustomerList",
                        action: t => {

                            console.log("Transition 'save'")
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
    @type("DomainObject")
    currentObject = null;

    /** Current todos */
    @observable
    @type("PagedCustomer")
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


    // variante 2
    @action
    updateCustomers(customers)
    {
        this.customers = customers;
    }
}
