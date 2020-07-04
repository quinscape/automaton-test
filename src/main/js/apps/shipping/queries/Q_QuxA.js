import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
    `
    query iQueryQuxA($config: QueryConfigInput!)
    {
        iQueryQuxA(config: $config)
        {
            type
            columnStates{
                name
                enabled
                sortable
            }
            queryConfig {
                id
                condition
                offset
                pageSize
                sortFields
            }
            rows {
                id
                name
                value
                description
            }
            rowCount
        }
    }`,
    {
        "config": {
            "pageSize": 5,
            "sortFields": ["name"]
        }
    }
)
