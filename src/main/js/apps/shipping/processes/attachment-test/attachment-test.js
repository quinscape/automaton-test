import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    config,
    storeDomainObject,
    deleteDomainObject,
    backToParent,
    FilterDSL,
    createDomainObject,
    extractTypeData,
    Attachments
} from "@quinscape/automaton-js";
import Q_GraultList from "./queries/Q_GraultList";
import Q_GraultDetail from "./queries/Q_GraultDetail";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config
    //process.versioningStrategy = name => false;

    // return process states and transitions
    return (
        {
            startState: "GraultList",
            states: {
                "GraultList":
                    {
                        "new-grault": {
                            to: "GraultDetail",
                            action: t => {
                                const newInstance = createDomainObject("Grault");
                                newInstance.name = "Unnamed";
                                scope.updateCurrent(newInstance)
                            }
                        },
                        "to-detail": {
                            to: "GraultDetail",
                            action: t => {

                                const id = t.context;

                                return Q_GraultDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        id
                                                    )
                                                )
                                    }
                                }).then(({iQueryGrault}) => {

                                    if (iQueryGrault.rows.length === 0)
                                    {
                                        alert("Could not load Grault with id '" + id)
                                    }

                                    scope.updateCurrent(config.inputSchema.clone(iQueryGrault.rows[0]));
                                })
                            }
                        }
                    }
                ,
                "GraultDetail": {
                    "save": {

                        action: t => Attachments.uploadPending(t.context)
                            .then( () => storeDomainObject({
                                ... extractTypeData("GraultInput", t.context),
                            }))
                            .then(() => Attachments.deletePending(t.context))
                            .then(() => scope.graults.update())
                            .then(() => t.back(backToParent(t)))
                    },
                    "delete": {
                        to: "GraultList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("Grault", id)
                                .then(
                                    didDelete => didDelete && scope.removeGrault(id)
                                )
                        }
                    },
                    "cancel": {
                        to: "GraultList",
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

export default class AttachmentTestScope {

    @observable
    currentGrault = null;

    /** Current todos */
    @observable
    graults = injection( Q_GraultList );
    
    @action
    updateGraults(graults)
    {
        this.graults = graults;
    }

    @action
    removeGrault(id)
    {
        this.graults.rows = this.graults.rows.filter( grault => grault.id !== id);
    }

    @action
    updateCurrent(grault)
    {
        this.currentGrault = grault;
    }
}
