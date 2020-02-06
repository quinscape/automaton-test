import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
        `
        query iQueryNode($domainType: String!, $field: String!, $condition: Condition)
        {
            getDomainTypeIndex(
                domainType: $domainType, 
                field: $field, 
                condition: $condition
            )
        }`,
    {
        "domainType": "Node",
        "field": "name",
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
                    "value": 2
                }
            ]
        }
    }
)

