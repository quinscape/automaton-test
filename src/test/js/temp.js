import { field, not, value, and, component } from "@quinscape/automaton-js/lib/FilterDSL"


console.log(
    JSON.stringify(
        and(
            component(null,
                and(
                    not(
                        field("type").eq(
                            value(
                                "Integer",
                                2
                            )
                        )
                    ),
                    field("name").lt(
                        value("String", "h")
                    )
                )
            )
        ),
        null,
        4
    )
)


