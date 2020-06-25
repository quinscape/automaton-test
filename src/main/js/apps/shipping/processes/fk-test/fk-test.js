import { action, observable } from "mobx";

import {
    backToParent,
    createDomainObject,
    deleteDomainObject,
    extractTypeData,
    FilterDSL,
    injection,
    storeDomainObject
} from "@quinscape/automaton-js";

import Q_QuxMain from "./queries/Q_QuxMain";
import Q_QuxDetail from "./queries/Q_QuxDetail";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "FKTestList",
            states: {
                "FKTestList":
                    {
                        "new-qux": {
                            to: "FKTestDetail",
                            action: t => {
                                const newObj = createDomainObject("QuxMainInput");

                                newObj.name = "Unnamed Qux";
                                newObj.desc = "";
                                newObj.num = 0;
                                newObj.flag = false;
                                newObj.created = new Date();
                                newObj.type = "TYPE_A";

                                return scope.updateCurrent(newObj);
                            }
                        },
                        "to-detail": {
                            to: "FKTestDetail",
                            action: t => {

                                console.log("to-detail, context = ", t.context);

                                return Q_QuxDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        t.context
                                                    )
                                                )
                                    }
                                }).then(({iQueryQuxMain}) => {

                                    if (iQueryQuxMain.rows.length === 0)
                                    {
                                        alert("Could not load Qux with id '" + t.context)
                                    }
                                    return scope.updateCurrent(iQueryQuxMain.rows[0]);
                                });
                            }
                        }
                    }
                ,
                "FKTestDetail": {
                    "save": {
                        action: t =>
                            storeDomainObject({
                                ... extractTypeData("QuxMainInput", t.context),
                                quxDId: t.context.quxD && t.context.quxD.id
                            })
                            .then(() => scope.quxes.update())
                            .then(() => t.back(backToParent(t)))
                    },
                    "delete": {
                        to: "FKTestList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("QuxMain", id)
                                .then(
                                    didDelete => didDelete && scope.quxes.update()
                                )
                        }
                    },
                    "cancel": {
                        to: "FKTestList",
                        discard: true,
                        action: t => {

                            console.log("Transition 'cancel'")
                        }
                    }
                }
            }
        }
    );
}

export default class FKTestScope {

    @observable
    currentQux = null;

    /** Qux iQuery  */
    @observable
    quxes = injection( Q_QuxMain );

    @action
    updateCurrent(qux)
    {
        this.currentQux = qux;
    }
}
