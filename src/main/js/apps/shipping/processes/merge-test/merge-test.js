import { action, observable } from "mobx";
import { computedFn } from "mobx-utils";

import {
    config,
    createDomainObject,
    deleteDomainObject,
    FilterDSL,
    injection,
    MergeOperation,
    WorkingSet,
    backToParent
} from "@quinscape/automaton-js";

import Q_CorgeType from "./queries/Q_CorgeType";
import Q_CorgeList from "./queries/Q_CorgeList";
import Q_CorgeDetail from "./queries/Q_CorgeDetail";
import { DateTime } from "luxon";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "CorgeList",
            states: {
                "CorgeList":
                    {
                        "new-corge": {
                            to: "CorgeDetail",
                            action: t => {

                                // use empty id to be replaced by a new id server-side (
                                const newObj = createDomainObject("CorgeInput", "");

                                newObj.name = "Unnamed Corge";
                                newObj.desc = "";
                                newObj.num = 0;
                                newObj.flag = false;
                                newObj.created = new Date();
                                newObj.type = "TYPE_A";

                                return scope.updateCurrent(newObj);
                            }
                        },
                        "to-detail": {
                            to: "CorgeDetail",
                            action: t => {

                                console.log("to-detail, context = ", t.context);

                                return Q_CorgeDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        t.context
                                                    )
                                                )
                                    }
                                }).then(({iQueryCorge}) => {

                                    if (iQueryCorge.rows.length === 0)
                                    {
                                        alert("Could not load Corge with id '" + t.context)
                                    }

                                    const corge = config.inputSchema.clone(iQueryCorge.rows[0]);

                                    scope.workingSet.registerBaseVersion(corge);

                                    return scope.updateCurrent(
                                        corge
                                    );
                                });
                            }
                        }
                    }
                ,
                "CorgeDetail": {
                    "save": {
                        to: "CorgeList",
                        action: t =>{

                            // update modified field
                            t.context.modified = DateTime.local();

                            //scope.workingSet.addChanges(t.context);

                            return scope.workingSet.merge().then(op => {

                                if (op === MergeOperation.STORE)
                                {
                                    // we actually did store the merged working set

                                    // update list view
                                    return scope.corges.update();
                                }
                                else
                                {
                                    // we did not store (might be CANCEL, DISCARD or APPLY)
                                    // in any case, we're going back into the mask
                                    // (everything else that needed to happen already happened)
                                    t.target = "CorgeDetail"
                                }
                            })
                        }
                    },
                    "delete": {
                        to: "CorgeList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("Corge", id)
                                .then(
                                    didDelete => didDelete && scope.corges.update()
                                )
                        }
                    },
                    "cancel": {
                        discard: true,
                        action: t => {

                            console.log("Transition 'cancel'")
                            t.back(backToParent);
                        }
                    }
                }
            }
        }
    );
}

export default class MergeTestScope {

    /**
     * Construct our working set with the merge config.
     *
     * (See Java class de.quinscape.automaton.model.merge.MergeConfig )
     * @type {WorkingSet}
     */
    workingSet = new WorkingSet({
        typeConfigs: [
            {
                name: "Corge",
                mergeGroups: [
                    {
                        fields: ["num", "num2"]
                    }
                ],
                ignored: ["modified"]
            }
        ],

        allowDiscard: true,
        allowApply: true
    });

    @observable
    currentCorge = null;

    /** Corge iQuery  */
    @observable
    corges = injection(Q_CorgeList);

    @observable
    corgeTypes = injection(Q_CorgeType);
    
    @action
    updateCorges(corges)
    {
        this.corges = corges;
    }

    @action
    removeCorge(id)
    {
        this.corges.rows = this.corges.rows.filter( corge => corge.id !== id);
    }

    @action
    updateCurrent(corge)
    {
        this.currentCorge = corge;
    }

    filter = computedFn((process, transition) =>
    {
        return process.scope.currentCorge.name === "AAA"
    })
}
