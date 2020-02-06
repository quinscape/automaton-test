import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryQuxD($config: QueryConfigInput!)
    {
        iQueryQuxD(config: $config)
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
        config: {
            pageSize: 5,
            sortFields: ["name"]
        }
    }
)
