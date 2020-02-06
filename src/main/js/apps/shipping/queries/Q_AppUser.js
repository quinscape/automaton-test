import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
    `
    query iQueryAppUser($config: QueryConfigInput!)
    {
        iQueryAppUser(config: $config)
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
                login
                roles
            }
            rowCount
        }
    }`,
    {
        "config": {
            "pageSize": 5,
            "sortFields": ["login"]
        }
    }
)
