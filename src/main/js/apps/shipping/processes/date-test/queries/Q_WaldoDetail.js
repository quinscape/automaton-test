import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query Q_WaldoDetail($config: QueryConfigInput!)
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
                timestamp
                date
                opt1
                opt2
            }
            rowCount
        }
    }`
)
