import { observable, computed, action } from "mobx";
import { injection, GraphQLQuery, FilterDSL } from "@quinscape/automaton-js";
import DBViewHome from "./states/DBViewHome";


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
