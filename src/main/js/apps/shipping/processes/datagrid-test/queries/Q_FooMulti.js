import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryFoo($config: QueryConfigInput!,$config2: QueryConfigInput!)
    {

        foos: iQueryFoo(config: $config)
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
        
        bars: iQueryBar(config: $config2){
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
            numa
            numb
        }
        rowCount
    }

    }`,
    {
        "config": {
            "pageSize": 5,
            "sortFields" : ["name"]
        },
        "config2": {
            "pageSize": 5,
            "sortFields" : ["name"]
        }
    }
)
