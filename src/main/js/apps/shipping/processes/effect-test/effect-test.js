import { action, observable, makeObservable } from "mobx";
import { FilterDSL, injection } from "@quinscape/automaton-js";
import Q_FooList from "../datagrid-test/queries/Q_FooList";
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail";
import Q_FooType from "../datagrid-test/queries/Q_FooType";
import EffectLayout, { registerAppEffect, unregisterAppEffect } from "../../../../components/EffectLayout";
import EffectList from "./states/EffectList";
import EffectDetail from "./states/EffectDetail";

// deconstruct FilterDSL methods
const {
    field,
    value
} = FilterDSL;


export function updateDetail(scope, id)
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
    // process config
    process.options.layout = EffectLayout;

    process.addProcessEffect(
        () => {
            registerAppEffect("Process:effect-test");
            return (
                () => {
                    unregisterAppEffect("Process:effect-test");
                }
            )
        }
    );

    process.addEffect(
        EffectList,
        () => {
            registerAppEffect(EffectList);

            return () => {
                unregisterAppEffect(EffectList);
            };
        }
    );

    process.addEffect(
        EffectDetail,
        () => {
            const name = "EffectDetail ' "+ (scope.currentFoo && scope.currentFoo.name) + "'";

            registerAppEffect(name);


            return (
                () => {
                    unregisterAppEffect(name);
                }
            )
        },
        () => [ scope.currentFoo && scope.currentFoo.id ]
    );

    return EffectList;
}

export default class EffectTestScope {
    /** Foo iQuery  */
    @observable
    foos = injection(Q_FooList);

    @observable
    currentFoo = null;

    @observable
    fooTypes = injection(
        Q_FooType
    );

    constructor() {
        makeObservable(this);
    }

    @action
    updateFoos(foos)
    {
        this.foos = foos;
    }

    @action
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
