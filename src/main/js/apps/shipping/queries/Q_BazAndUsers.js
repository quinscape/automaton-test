import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryFoo($configA: QueryConfigInput!, $configB: QueryConfigInput!)
    {
        
        iQueryBaz(config: $configA)
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
                owner {
                    login
                }
            }
            rowCount
        }
        iQueryAppUser(config: $configB)
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
                login
                bazes {
                    name
                }
            }
            rowCount
        }
    }`,
    {
        "configA": {
            "pageSize": 0,
            "sortFields" : ["name"]
        },
        "configB": {
            "pageSize": 0,
            "sortFields" : ["login"]
        }
    }
)
