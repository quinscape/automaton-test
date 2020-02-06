import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
    `
    query iQueryNode($config: QueryConfigInput!)
    {
        iQueryNode(config: $config)
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
                id
                parent{
                    id
                    name
                    parent
                    {
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

