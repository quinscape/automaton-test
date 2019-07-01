import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryQuxMain($config: QueryConfigInput!)
    {
        iQueryQuxMain(config: $config)
        {
            rows{
                id
                name
                quxAId
                quxA{
                    name
                    value
                }
                quxBName
                quxB{
                    id
                    value
                }
                quxCId1
                quxC1{
                    name
                    value
                }
                quxCId2
                quxC2{
                    name
                    value
                }
            }
        }
    }`
)
