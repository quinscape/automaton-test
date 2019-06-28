import { observable } from "mobx";

import { injection } from "@quinscape/automaton-js";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "ColumnConfigHome",
            states: {
                "ColumnConfigHome":
                    {
                }
            }
        }
    );
}

export default class ColumnConfigTestScope {

    /** Current todos */
    @observable
    foos = injection(
        // language=GraphQL
        `query iQuerywithColumnConfigFoo($config: QueryConfigInput)
        {
            iQuerywithColumnConfigFoo(config: $config)
            {
                type
                columnStates{
                    name
                    enabled
                    sortable
                }
                queryConfig{
                    id
                    condition
                    currentPage
                    pageSize
                    sortFields
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
                rowCount
            }
        }`,
        {
            "config": {
                "id" : "configurable-foo-grid",
                "pageSize": 20
            }
        }
    );
}
