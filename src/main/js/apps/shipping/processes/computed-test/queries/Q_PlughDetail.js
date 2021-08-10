import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryPlughDetail($config: QueryConfigInput!)
    {
        iQueryPlugh(config: $config)
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
                flag
                extra
                flag
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
