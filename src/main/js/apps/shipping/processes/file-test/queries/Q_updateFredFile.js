import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `mutation updateFredFile($fred: FredInput!)
    {

        updateFredFile(fred: $fred)
    }`
)
