import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
        `
        mutation resultSilent($delay: Boolean)
        {
            resultSilent(delay: $delay)
            {
                type
                payload
            }
        }`
)
