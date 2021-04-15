import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    config,
    createDomainObject,
    storeDomainObject,
    deleteDomainObject,
    GraphQLQuery,
    backToParent,

    FilterDSL
} from "@quinscape/automaton-js";


// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

// language=GraphQL
const FooDetailQuery = new GraphQLQuery(`query queryFooDetail($config: QueryConfigInput!)
{
    iQueryFoo(config: $config)
    {
        rows{
            id
            name
            num
            description
            created
            flag
            type
            owner{
                id
                login
            }
        }
    }
}`
);

import DBViewHome from "./states/DBViewHome";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return DBViewHome;
}

export default class DBViewProcess {

    @observable
    statistics = injection(
        // language=GraphQL
        `query iQuerySumPerMonth($config: QueryConfigInput!)
        {
            iQuerySumPerMonth(config: $config)
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
                    year
                    month
                    sum
                }
                rowCount
            }
        }`,
        {
            "config": {
                pageSize: 12,
                sortFields : ["year", "month"]
            }
        }
    );
}
