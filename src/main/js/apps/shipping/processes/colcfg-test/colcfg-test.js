import { observable, makeObservable } from "mobx";
import { injection } from "@quinscape/automaton-js";
import ColumnConfigHome from "./states/ColumnConfigHome";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return ColumnConfigHome;
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
                    offset
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

    constructor() {
        makeObservable(this);
    }
}
