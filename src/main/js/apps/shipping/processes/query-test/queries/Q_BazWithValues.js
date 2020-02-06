import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
    `
    query iQueryBazList($config: QueryConfigInput!)
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
                name
                bazLinks{

                    value {
                        name
                    }
                }
            }
            rowCount
        }
    }`,
    {
        "config": {
            "sortFields": ["name"]
        }
    }
)

