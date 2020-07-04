import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryFooList($config: QueryConfigInput!)
    {
        iQueryFoo(config: $config)
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
                description
                flag
                type
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
            "pageSize": 20,
            "sortFields" : ["name"]
        }
    }
)
