import { parse } from "graphql/language/parser"


describe("Test", function () {

    it("fn", function () {

        const doc = parse(
            // language=GraphQL
                `query iQuerywithColumnConfigFoo($config: QueryConfigInput)
            {
                iQuerywithColumnConfigFoo(config: $config)
                {
                    type
                        columnStates{
                            name
                            enabled
                            sortable
                        }
                    queryConfig{
                        condition
                        currentPage
                        pageSize
                        sortFields
                    }
                    rows{
                        id
                        name
                        num
                        description
                        created
                        type
                        flag
                        owner{
                            id
                            login
                        }

                    }
                    rowCount
                }
            }`,
        )

        //console.log(JSON.stringify(doc, null, 4))

    });

});
