import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    config,
    storeDomainObject,
    deleteDomainObject,
    GraphQLQuery
} from "@quinscape/automaton-js";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "DataGridHome",
            states: {
                "DataGridHome":
                    {
                }
            }
        }
    );
}

export default class CRUDTestScope {

    @observable
    currentFoo = null;

    /** Current todos */
    @observable
    foos = injection(
        // language=GraphQL
        `query iQueryFoo
        {
            iQueryFoo
            {
                columnConfig{
                    columnStates{
                        name
                        enabled
                        sortable
                    }
                }
                queryConfig{
                    filter{
                        fieldFilters{
                            fields
                            values
                            filterType
                        }
                        filterTransformer
                    }
                }
                rows{
                    id
                    name
                    num
                    description
                    created
                    type
                    flag
                    owner{
                        id
                        login
                    }
                    
                }
            }
        }`
    );
    
    @action
    updateFoos(foos)
    {
        this.foos = foos;
    }

    @action
    removeFoo(id)
    {
        this.foos.rows = this.foos.rows.filter( foo => foo.id !== id);
    }

    @action
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
