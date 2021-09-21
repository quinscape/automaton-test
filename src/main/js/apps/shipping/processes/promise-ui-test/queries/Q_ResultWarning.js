import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
        `
        mutation resultWarning($delay: Boolean)
        {
            resultWarning(delay: $delay)
            {
                type
                payload
            }
        }`
)
