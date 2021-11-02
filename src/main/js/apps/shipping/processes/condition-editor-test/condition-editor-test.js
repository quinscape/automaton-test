import { observable, computed, action, makeObservable } from "mobx";
import { injection, GraphQLQuery } from "@quinscape/automaton-js";
import { toJSON } from "@quinscape/automaton-js/filter";
import { and, or, field, value } from "@quinscape/automaton-js/filter";
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
        field("name").add(field("description"))
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
        field("")
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
        field("")
            .containsIgnoreCase(
                value(
                    ""
                )
            )
    )

}


export default class ConditionEditorTest {

    @observable
    rootType = "Foo"

    @observable
    counter = 0

    @observable
    condition = null;

    constructor()
    {
        makeObservable(this)
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


        this.condition = data
        this.counter++;
    }

}
