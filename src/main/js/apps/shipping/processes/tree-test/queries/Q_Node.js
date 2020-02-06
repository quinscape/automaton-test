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
                    id
                    name
                    parent{
                        name
                    }
                    type
                }
                rowCount
            }
        }    `,
    {
        "config": {
            "condition": {
                "type": "Condition",
                "name": "and",
                "operands": [
                    {
                        "type": "Component",
                        "id": null,
                        "condition": {
                            "type": "Condition",
                            "name": "eq",
                            "operands": [
                                {
                                    "type": "Field",
                                    "name": "type"
                                },
                                {
                                    "type": "Value",
                                    "scalarType": "Int",
                                    "value": 2,
                                    "name": null
                                }
                            ]
                        }
                    }
                ]
            },
            "sortFields": ["name"]
        }
    }
)

