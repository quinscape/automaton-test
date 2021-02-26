import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query getFredFile
    {

        getFredFile
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
