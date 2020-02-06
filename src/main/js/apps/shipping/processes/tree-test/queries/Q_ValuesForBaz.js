import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryValuesForBaz($config: QueryConfigInput!)
    {
        iQueryBazLink(config: $config)
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
                bazId
                valueId
                value {
                    id
                    name
                }
            }
            rowCount
        }
    }`,
    {
        "config": {
            "sortFields" : ["value.name"]
        }
    }
)
