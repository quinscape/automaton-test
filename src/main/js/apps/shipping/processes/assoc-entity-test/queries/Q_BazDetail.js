import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `
    query iQueryBazList($config: QueryConfigInput!)
    {
        iQueryBaz(config: $config)
        {
            rows{
                id
                name
                ownerId
                owner{
                    login
                }
                bazLinks{
                    id
                    bazId
                    valueId
                    value{
                        id
                        name
                    }
                }
            }
    
            rowCount
        }
    }`,
    {
        "config": {
        }
    }
)
