import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query Q_GraultDetail($config: QueryConfigInput!)
    {
        iQueryGrault(config: $config)
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
                attachmentId
                attachment{
                    id
                    type
                    description
                    url
                }
            }
            rowCount
        }
    }`
)
