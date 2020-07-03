import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryCorgeList($config: QueryConfigInput!)
    {
        iQueryCorge(config: $config)
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
                typeId
                type {
                    id
                    name
                }
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
