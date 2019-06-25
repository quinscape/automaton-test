import { GraphQLQuery } from "@quinscape/automaton-js"

export default new GraphQLQuery(
    // language=GraphQL
    `query iQueryFooType($config: QueryConfigInput!)
    {
        iQueryFooType(config: $config)
        {
            rows{
                name
            }
            rowCount
        }
    }`,
    {
        "config": {
            // deactivate paging
            "pageSize": 0
        }
    }
)
