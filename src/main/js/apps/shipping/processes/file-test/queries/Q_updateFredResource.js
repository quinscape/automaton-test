import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `mutation updateFredResource($fred: FredInput!)
    {

        updateFredResource(fred: $fred)
    }`
)
