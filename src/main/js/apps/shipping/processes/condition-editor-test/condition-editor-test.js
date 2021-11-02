import { observable, computed, action, makeObservable } from "mobx";
import { injection, GraphQLQuery } from "@quinscape/automaton-js";
import { toJSON } from "@quinscape/automaton-js/filter";
import { and, or, field, value, values } from "@quinscape/automaton-js/filter";
import ConditionEditorTestHome from "./states/ConditionEditorTestHome";
import ConditionEditorTestStart from "./states/ConditionEditorTestStart";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    //return ConditionEditorTestStart;
    return ConditionEditorTestHome;
}


export const testCases = {

    // no condition
    "None": null,

    // Minimal condition with empty field and value
    "Minimal": field("").containsIgnoreCase(value("")),

    // Simple comparison
    "Simple": field("name").containsIgnoreCase(value("a")),

    "Expression": and(
        field("name").sub(field("description"))
            .containsIgnoreCase(
                value(
                    "b"
                )
            ),
        field("parent.name")
            .containsIgnoreCase(
                value(
                    "Fish"
                )
            )
    ),

    // complex expression with single leaf level
    "Complex": or(
        and(
            field("name")
                .containsIgnoreCase(
                    value(
                        "a"
                    )
                ),
            field("num")
                .eq(
                    value(
                        50
                    )
                )
        ),
        and(
            field("name")
                .containsIgnoreCase(
                    value(
                        "b"
                    )
                ),
            field("num")
                .eq(
                    value(
                        100
                    )
                )
        )
    ),

    // complex expression with two leaf levels
    "Complex 2": or(
        and(
            field("name")
                .containsIgnoreCase(
                    value(
                        "a"
                    )
                ),
            field("num")
                .containsIgnoreCase(
                    value(
                        50
                    )
                )
        ),
        and(
            field("name")
                .containsIgnoreCase(
                    value(
                        "b"
                    )
                ),
            field("num")
                .containsIgnoreCase(
                    value(
                        100
                    )
                )
        ),
        field("description")
            .containsIgnoreCase(
                value("")
            )

    ),

    // complex expression with three leaf levels
    "Complex 3": or(

        and(
            or(
                field("num")
                    .eq(
                        value(
                            100
                        )
                    ),
                field("num")
                    .eq(
                        value(
                            110
                        )
                    )
            ),
            or(
                field("num")
                    .eq(
                        value(
                            200
                        )
                    ),
                field("num")
                    .eq(
                        value(
                            210
                        )
                    )

            ),
            field("num")
                .eq(
                    value(
                        300
                    )
                ),
            field("num")
                .eq(
                    value(
                        310
                    )
                )

        ),
        field("description")
            .containsIgnoreCase(
                value(
                    ""
                )
            )
    ),

    "MixedSize" : {
        "type": "Condition",
        "name": "or",
        "operands": [
            {
                "type": "Condition",
                "name": "containsIgnoreCase",
                "operands": [
                    {
                        "type": "Field",
                        "name": "description"
                    },
                    {
                        "type": "Value",
                        "scalarType": "String",
                        "value": ""
                    }
                ]
            },
            {
                "type": "Condition",
                "name": "and",
                "operands": [
                    {
                        "type": "Condition",
                        "name": "or",
                        "operands": [
                            {
                                "type": "Condition",
                                "name": "eq",
                                "operands": [
                                    {
                                        "type": "Field",
                                        "name": "num"
                                    },
                                    {
                                        "type": "Value",
                                        "scalarType": "Int",
                                        "value": 200
                                    }
                                ]
                            },
                            {
                                "type": "Condition",
                                "name": "eq",
                                "operands": [
                                    {
                                        "type": "Field",
                                        "name": "num"
                                    },
                                    {
                                        "type": "Value",
                                        "scalarType": "Int",
                                        "value": 210
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Condition",
                        "name": "eq",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "num"
                            },
                            {
                                "type": "Value",
                                "scalarType": "Int",
                                "value": 100
                            }
                        ]
                    },
                    {
                        "type": "Condition",
                        "name": "eq",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "num"
                            },
                            {
                                "type": "Value",
                                "scalarType": "Int",
                                "value": 300
                            }
                        ]
                    },
                    {
                        "type": "Condition",
                        "name": "eq",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "num"
                            },
                            {
                                "type": "Value",
                                "scalarType": "Int",
                                "value": 310
                            }
                        ]
                    }
                ]
            }
        ]
    },

    "MixedSizeFlipped" : {
        "type": "Condition",
        "name": "or",
        "operands": [
            {
                "type": "Condition",
                "name": "and",
                "operands": [
                    {
                        "type": "Condition",
                        "name": "eq",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "num"
                            },
                            {
                                "type": "Value",
                                "scalarType": "Int",
                                "value": 100
                            }
                        ]
                    },
                    {
                        "type": "Condition",
                        "name": "or",
                        "operands": [
                            {
                                "type": "Condition",
                                "name": "eq",
                                "operands": [
                                    {
                                        "type": "Field",
                                        "name": "num"
                                    },
                                    {
                                        "type": "Value",
                                        "scalarType": "Int",
                                        "value": 200
                                    }
                                ]
                            },
                            {
                                "type": "Condition",
                                "name": "eq",
                                "operands": [
                                    {
                                        "type": "Field",
                                        "name": "num"
                                    },
                                    {
                                        "type": "Value",
                                        "scalarType": "Int",
                                        "value": 210
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Condition",
                        "name": "eq",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "num"
                            },
                            {
                                "type": "Value",
                                "scalarType": "Int",
                                "value": 300
                            }
                        ]
                    },
                    {
                        "type": "Condition",
                        "name": "eq",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "num"
                            },
                            {
                                "type": "Value",
                                "scalarType": "Int",
                                "value": 310
                            }
                        ]
                    }
                ]
            },
            {
                "type": "Condition",
                "name": "containsIgnoreCase",
                "operands": [
                    {
                        "type": "Field",
                        "name": "description"
                    },
                    {
                        "type": "Value",
                        "scalarType": "String",
                        "value": ""
                    }
                ]
            }
        ]
    },
    MultiArg: field("num").between(value(100), value(200)),

    Values: field("name").in(values("String", "aaa", "bbb", "ccc"))

}

//console.log("TEST-CASES", testCases)

export default class ConditionEditorTest {

    @observable
    rootType = "Foo"

    @observable
    counter = 0

    @observable
    templateName = null;

    @observable
    condition = null;


    constructor()
    {
        makeObservable(this)

        this.useTestCase("Simple")
        //this.useTestCase("Expression")
        //this.useTestCase("Complex")
        //this.useTestCase("Values")
    }

    @action
    useTestCase(name)
    {
        const data = toJSON(testCases[name]);
        console.log("TEST-CASE", data)
        if (data === undefined)
        {
            throw new Error("Could not find test case '" + name + "'")
        }


        this.templateName = name;
        this.condition = data
        this.counter++;
    }

}
