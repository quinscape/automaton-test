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
                    columnConfig{
                        columnStates{
                            name
                            enabled
                            sortable
                        }
                    }
                    queryConfig{
                        condition
                        currentPage
                        pageSize
                        sortOrder{
                            fields
                        }
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

        console.log(JSON.stringify(doc, null, 4))

    });

});
