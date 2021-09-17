import { query } from "@quinscape/automaton-js"


export default query(
    // language=GraphQL
        `
        mutation resultInfo($delay: Boolean)
        {
            resultInfo(delay: $delay)
            {
                type
                payload{
                    name
                    num
                    description
                }
            }
        }`
)
