import { action, observable, runInAction } from "mobx";

import {
    backToParent,
    config,
    createDomainObject,
    FilterDSL,
    injection,
    storeDomainObject
} from "@quinscape/automaton-js";

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
        "EffectList",
        () => {
            registerAppEffect("EffectList");

            return (
                () => {
                    unregisterAppEffect("EffectList");
                }
            )
        }
    );

    process.addEffect(
        "EffectDetail",
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

    // return process states and transitions
    return (
        {
            startState: "EffectList",
            states: {
                "EffectList":
                    {
                        "new-foo": {
                            to: "EffectDetail",
                            action: t => {
                                const newObj = createDomainObject("FooInput");

                                newObj.name = "Unnamed Foo";
                                newObj.desc = "";
                                newObj.num = 0;
                                newObj.flag = false;
                                newObj.created = new Date();
                                newObj.type = "TYPE_A";

                                return scope.updateCurrent(newObj);
                            }
                        },
                        "to-detail": {
                            to: "EffectDetail",
                            action: t => {

                                console.log("to-detail, context = ", t.context);

                                return updateDetail(scope, t.context);
                            }
                        }
                    }
                ,
                "EffectDetail": {
                    "save": {
                        action: t =>
                            storeDomainObject({
                                ... t.context,
                                ownerId:  config.auth.id || "",
                            })
                                .then(() => scope.foos.update())
                                .then(() => t.back(backToParent(t)))
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
                        to: "EffectList",
                        discard: true,
                        action: t => {

                            console.log("Transition 'cancel'")
                        }
                    },
                    "next": {
                        to: "EffectDetail",
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
