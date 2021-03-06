import { query } from "@quinscape/automaton-js"

export default query(
    // language=GraphQL
        `query iQueryQuxDetail($config: QueryConfigInput!)
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
                    # name is embedded for this key
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
