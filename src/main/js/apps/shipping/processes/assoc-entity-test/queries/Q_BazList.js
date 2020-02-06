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
                offset
                pageSize
                sortFields
            }
            rows{
                id
                name
                owner{
                    login
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
