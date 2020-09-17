import { action, observable, runInAction } from "mobx";

import { FilterDSL, injection } from "@quinscape/automaton-js";

import Q_FooList from "../datagrid-test/queries/Q_FooList";
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail";
import Q_FooType from "../datagrid-test/queries/Q_FooType";
import EffectLayout, { registerAppEffect, unregisterAppEffect } from "../../../../components/EffectLayout";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

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
export function initProcess(process, scope)
{
    // process config
    process.options.forceSubProcess = true;

    // return process states and transitions
    return (
        {
            startState: t => {

                scope.location = process.input;
                t.target = "MetaConfigSubHome";
            },
            states: {
                "MetaConfigSubHome": {
                    "close" : {
                        action: t => process.endSubProcess(null)
                    }
                }
            }
        }
    );
}

export default class MetaConfigSubScope {

    /** Current orders */
    @observable
    location = {};
}
