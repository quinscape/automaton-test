import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
        `
        mutation multipleResults($delay: Boolean)
        {
            a : resultInfo(delay: $delay)
            {
                type
                payload{
                    name
                    num
                    description
                }
            }

            b :resultWarning(delay: $delay)
            {
                type
                payload
            }

            c : resultError(delay: $delay)
            {
                type
                payload
            }
        }`
)
