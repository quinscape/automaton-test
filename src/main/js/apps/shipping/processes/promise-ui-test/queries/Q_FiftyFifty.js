import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
        `
        mutation fiftyFifty($delay: Boolean)
        {
            fiftyFifty(delay: $delay)
        }`
)
