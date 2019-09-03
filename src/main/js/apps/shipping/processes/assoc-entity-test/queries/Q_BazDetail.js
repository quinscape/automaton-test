import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query detailQueryBaz($id: String!)
    {
        detailQueryBaz(id: $id)
        {
            id
            name
            bazLinks{
                id
                value{
                    id
                    name
                }
            }
        }
    }`,
    {
    }
)
