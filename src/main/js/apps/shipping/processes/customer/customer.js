import { observable, computed, action, makeObservable } from "mobx";
import { injection } from "@quinscape/automaton-js";
import CustomerList from "./states/CustomerList";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return CustomerList;
}

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

    constructor() {
        makeObservable(this);
    }

    @action
    updateCustomers(customers)
    {
        this.customers = customers;
    }
}
