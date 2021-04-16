import { action, observable } from "mobx";
import { FilterDSL, injection } from "@quinscape/automaton-js";
import Q_FooList from "../datagrid-test/queries/Q_FooList";
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail";
import Q_FooType from "../datagrid-test/queries/Q_FooType";
import EffectLayout, { registerAppEffect, unregisterAppEffect } from "../../../../components/EffectLayout";
import SubProcessDialogHome from "./states/SubProcessDialogHome";

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
    // process config
    process.options.forceSubProcess = true;
    process.options.layout = EffectLayout;

    process.addProcessEffect(
        () => {
            registerAppEffect("Process:effect-sub-dialog");

            return (
                () => {
                    unregisterAppEffect("Process:effect-sub-dialog");
                }
            )
        }
    );

    process.addEffect(
        SubProcessDialogHome,
        () => {
            registerAppEffect(SubProcessDialogHome);

            return () => {
                unregisterAppEffect(SubProcessDialogHome);
            };
        }
    );

    process.addEffect(
        SubProcessDialogDetail,
        () => {
            const name = "SubProcessDialogDetail '" + (scope.currentFoo && scope.currentFoo.name) + "'";
            registerAppEffect(name);

            return (
                () => {
                    unregisterAppEffect(name);
                }
            )
        },
        () => [ scope.currentFoo && scope.currentFoo.id ]
    );


    return SubProcessDialogHome;
}

export default class EffectSubProcessDialogScope {

    /** Current orders */
    @observable
    foos = injection( Q_FooList );

    @observable
    currentFoo = null;

    @observable
    fooTypes = injection(
        Q_FooType
    );

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
