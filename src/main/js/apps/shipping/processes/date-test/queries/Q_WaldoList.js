import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query Q_WaldoList($config: QueryConfigInput!)
    {
        iQueryWaldo(config: $config)
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
