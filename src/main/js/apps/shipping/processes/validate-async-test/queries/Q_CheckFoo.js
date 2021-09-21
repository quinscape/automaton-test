import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query CheckFoo($config: QueryConfigInput!)
    {
        foos : iQueryFoo(config: $config)
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
    }`
)
