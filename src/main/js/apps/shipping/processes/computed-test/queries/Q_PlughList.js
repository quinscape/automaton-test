import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryPlughList($config: QueryConfigInput!)
    {
        iQueryPlugh(config: $config)
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
                extra
            }
            rowCount
        }
    }`,
    {
        "config": {
            "pageSize": 5,

            // Filter normal column and computed column by default
            "condition": {
                "type": "Condition",
                "name": "and",
                "operands": [
                    {
                        "type": "Condition",
                        "name": "containsIgnoreCase",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "name"
                            }, {
                                "type": "Value",
                                "scalarType": "String",
                                "value": "4",
                                "name": null
                            }
                        ]
                    },
                    {
                        "operands": [
                            {
                                "name": "num",
                                "type": "Field"
                            },
                            {
                                "name": null,
                                "scalarType": "Int",
                                "type": "Value",
                                "value": 103
                            },
                            {
                                "name": null,
                                "scalarType": "Int",
                                "type": "Value",
                                "value": 106
                            }
                        ],
                        "name": "between",
                        "type": "Condition"
                    },
                    {
                        "type": "Condition",
                        "name": "containsIgnoreCase",
                        "operands": [
                            {
                                "type": "Operation",
                                "name": "concat",
                                "operands": [
                                    {
                                        "type": "Operation",
                                        "name": "concat",
                                        "operands": [
                                            {
                                                "type": "Field",
                                                "name": "name"
                                            }, {
                                                "type": "Value",
                                                "scalarType": "String",
                                                "value": ":",
                                                "name": null
                                            }
                                        ]
                                    }, {
                                        "type": "Field",
                                        "name": "num"
                                    }
                                ]
                            }, {
                                "type": "Value",
                                "scalarType": "String",
                                "value": "5",
                                "name": null
                            }
                        ]
                    }
                ]
            },

            "sortFields" : ["name"]
        }
    }
)
