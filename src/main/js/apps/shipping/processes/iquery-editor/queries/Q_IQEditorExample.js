import { query } from "@quinscape/automaton-js"

export default query(
        // language=GraphQL
        `
        query Q_CorgeList($config: QueryConfigInput!)
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
                    name
                    num
                    corgeLinks{
                        assoc{
                            name
                            num
                        }
                    }
                    owner{
                        login
                    }
                }
                rowCount
            }
        }
    `,
    {
        "condition": {
            "type": "Condition",
            "name": "or",
            "operands": [
                {
                    "type": "Condition",
                    "name": "equal",
                    "operands": [
                        {
                            "type": "Field",
                            "name": "owner.login"
                        },
                        {
                            "type": "Value",
                            "scalarType": "String",
                            "value": "admin"
                        }
                    ]
                },
                {
                    "type": "Condition",
                    "name": "equal",
                    "operands": [
                        {
                            "type": "Field",
                            "name": "name"
                        },
                        {
                            "type": "Value",
                            "scalarType": "String",
                            "value": "aaa"
                        }
                    ]
                }
            ]
        },
        "offset": 0,
        "pageSize": 20,
        "sortFields": []
    }
)
