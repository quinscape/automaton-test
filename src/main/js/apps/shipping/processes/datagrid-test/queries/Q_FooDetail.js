import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query queryFooDetail($config: QueryConfigInput!)
    {
        iQueryFoo(config: $config)
        {
            rows{
                id
                name
                num
                description
                created
                flag
                type
                owner{
                    id
                    login
                }
            }
        }
    }`,
    {
    }
);
