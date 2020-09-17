import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query Q_MetaConfigDetail($config: QueryConfigInput!)
    {
        iQueryMetaConfig(config: $config)
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
                bigNum
                flag
                timestamp
                date
                type
                url
                text
                corgeTypeId
                corgeType{
                    name
                }
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
