import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryBazList($config: QueryConfigInput!)
    {
        iQueryBaz(config: $config)
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
