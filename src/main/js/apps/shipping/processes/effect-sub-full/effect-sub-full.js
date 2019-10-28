import {
    observable,
    action, runInAction
} from "mobx";

import {
    injection,
    config,
    createDomainObject,
    storeDomainObject,
    deleteDomainObject,
    backToParent,

    FilterDSL
} from "@quinscape/automaton-js";


import Q_FooList from "../datagrid-test/queries/Q_FooList";
import report from "../../../../util/report";
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail";
import Q_FooType from "../datagrid-test/queries/Q_FooType";

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
                            "String",
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
    process.options.asDialog = false;
    process.options.forceSubProcess = true;

    process.addProcessEffect(
        () => {
            report("Run process effect for effect-sub-full");

            return (
                () => {
                    report("Cancel process effect for effect-sub-full");
                }
            )
        }
    );

    process.addEffect(
        "SubProcessFullHome",
        () => {
            report("Run effect for fullscreen SubProcessFullHome");

            return (
                () => {
                    report("Cancel effect for fullscreen SubProcessFullHome");
                }
            )
        }
    );

    process.addEffect(
        "SubProcessFullDetail",
        () => {
            const name = scope.currentFoo && scope.currentFoo.name;
            report("Run effect for SubProcessFullDetail for " + name);

            return (
                () => {
                    report("Cancel effect for SubProcessFullDetail for " + name);
                }
            )
        },
        () => [ scope.currentFoo && scope.currentFoo.id ]
    );


    // return process states and transitions
    return (
        {
            startState: "SubProcessFullHome",
            states: {
                "SubProcessFullHome": {
                    "choose" : {
                        action: t => process.endSubProcess(t.context)
                    },
                    "close" : {
                        action: t => process.endSubProcess(null)
                    },
                    "open-dialog": {
                        action: t =>
                            process.runSubProcess("effect-sub-dialog", t.context)
                                .then(
                                    result => result && runInAction( () => console.log("RESULT", result, "process =", process))
                                )
                    },
                    "open-full": {
                        action: t =>
                            process.runSubProcess("effect-sub-full", t.context)
                                .then(
                                    result => result && runInAction( () => console.log("RESULT", result, "process =", process))
                                )
                    },
                    "pick": {
                        to: "SubProcessFullDetail",
                        action: t => {

                            console.log("pick, context = ", t.context);

                            return updateDetail(scope, t.context);
                        }
                    }
                },
                "SubProcessFullDetail": {
                    "choose" : {
                        action: t => process.endSubProcess(t.context)
                    },
                    "open-dialog": {
                        action: t =>
                            process.runSubProcess("effect-sub-dialog", t.context)
                                .then(
                                    result => result && runInAction( () => console.log("RESULT", result))
                                )
                    },
                    "open-full": {
                        action: t =>
                            process.runSubProcess("effect-sub-full", t.context)
                                .then(
                                    result => result && runInAction( () => console.log("RESULT", result))
                                )
                    },
                    "cancel": {
                        to: "SubProcessFullHome",
                        discard: true,
                        action: t => {

                            console.log("Transition 'cancel'")
                        }
                    },
                    "next": {
                        to: "SubProcessFullDetail",
                        discard: true,
                        action: t => {

                            const { foos : { rows }, currentFoo } = scope;
                            for (let i = 0; i < rows.length; i++)
                            {
                                const foo = rows[i];
                                if (foo.id === currentFoo.id && i + 1 < rows.length)
                                {
                                    return updateDetail(scope, rows[i+1].id);
                                }
                            }

                            alert("No next object");
                        }
                    }
                }
            }
        }
    );
}

export default class EffectSubProcessFullScope {

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
