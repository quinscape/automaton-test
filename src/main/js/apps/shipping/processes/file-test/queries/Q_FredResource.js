import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query getFredResource
    {

        getFredResource
        {
            name
            items{
                name
                value
                flag
            }
        }
    }`
)
