import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryCorgeList($config: QueryConfigInput!)
    {
        iQueryCorgeAssoc(config: $config)
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
                version
                name
                num
                description
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
