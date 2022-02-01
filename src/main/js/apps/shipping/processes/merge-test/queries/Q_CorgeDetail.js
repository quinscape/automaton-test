import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryCorgeDetail($config: QueryConfigInput!)
    {
        iQueryCorge(config: $config)
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
                version
                name
                num
                num2
                flag
                description
                typeId
                type {
                    id
                    name
                }
                type2
                created
                modified
                ownerId
                owner {
                    login
                }
                
                corgeLinks{
                    id
                    version
                    assoc{
                        id
                        version
                        name
                        description
                        num
                    }
                    assocId
                    corgeId
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
