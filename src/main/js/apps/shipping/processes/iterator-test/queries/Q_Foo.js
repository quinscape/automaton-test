import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryFoo($config: QueryConfigInput!)
    {
        
        iQueryFoo(config: $config)
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
                description
                num
                
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
