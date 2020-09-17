import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query Q_GarplyList($config: QueryConfigInput!)
    {
        iQueryGarply(config: $config)
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
                value
                opt
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
