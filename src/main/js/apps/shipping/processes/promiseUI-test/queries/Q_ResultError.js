import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
        `
        mutation resultError($delay: Boolean)
        {
            resultError(delay: $delay)
            {
                type
                payload
            }
        }`
)
