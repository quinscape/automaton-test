const {field, value} = require("@quinscape/automaton-js/filter");


console.log(
    JSON.stringify(
        field("id").eq(
            value("13a4ad86-e2c3-4979-81e2").concat(
                value("-"),
            ).concat(
                value("a8f102b501c1")
            )
        ),
        null,
        4
    )
)
