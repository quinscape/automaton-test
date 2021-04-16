import { action, observable } from "mobx";
import { FilterDSL } from "@quinscape/automaton-js";
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail";
import MetaConfigSubHome from "./states/MetaConfigSubHome";

// deconstruct FilterDSL methods
const {
    field,
    value
} = FilterDSL;

function updateDetail(scope, id)
{
    return Q_FooDetail.execute({
        config: {
            condition:
                field("id")
                    .eq(
                        value(
                            id
                        )
                    )
        }
    }).then(({iQueryFoo}) => {

        if (iQueryFoo.rows.length === 0)
        {
            alert("Could not load Foo with id '" + id)
        }

        scope.updateCurrent(iQueryFoo.rows[0]);
    })
}

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    let target;

    scope.location = process.input;
    target = MetaConfigSubHome;
    return target;
}

export default class MetaConfigSubScope {

    /** Current orders */
    @observable
    location = {};
}
