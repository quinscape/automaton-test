import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query detailQueryBazValue($id: String!)
    {
        detailQueryBazValue(id: $id)
        {
            id
            name
            bazLinks{
                id
                baz{
                    id
                    name
                }
            }
        }
    }`,
    {
    }
)
