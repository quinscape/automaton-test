import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryQuxMain($config: QueryConfigInput!)
    {
        iQueryQuxMain(config: $config)
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
                quxA{
                    name
                }
                quxBName
                quxC1{
                    name
                }
                quxC2{
                    name
                }
                quxD{
                    name
                }
            }
            rowCount
        }
    }`,
    {
        "config": {
            "pageSize": 20,
            "sortFields" : ["name"]
        }
    }
)
