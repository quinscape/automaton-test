import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryFooList($config: QueryConfigInput!)
    {
        iQueryBazValue(config: $config)
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
            }
            rowCount
        }
    }`,
    {
        "config": {
            "pageSize": 5,
            "sortFields" : ["name"]
        }
    }
)
