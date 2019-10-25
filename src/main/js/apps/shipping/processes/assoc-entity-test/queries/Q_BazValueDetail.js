import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryFooList($config: QueryConfigInput!)
    {
        iQueryBazValue(config: $config)
        {
            rows {
                id
                name
                bazLinks {
                    id
                    bazId
                    valueId
                    baz {
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
