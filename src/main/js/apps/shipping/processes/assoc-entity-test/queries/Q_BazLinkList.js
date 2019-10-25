import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryBazLinkList($config: QueryConfigInput!)
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
                currentPage
                pageSize
                sortFields
            }
            rows{
                bazId
                baz {
                    id
                    name
                }
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
            "pageSize": 20,
            "sortFields" : ["baz.name"]
        }
    }
)
