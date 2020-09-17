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
import Q_GarplyList from "./queries/Q_GarplyList";
import Q_GarplyDetail from "./queries/Q_GarplyDetail";

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
            startState: "GarplyList",
            states: {
                "GarplyList":
                    {
                        "new-garply": {
                            to: "GarplyDetail",
                            action: t => {
                                const newInstance = createDomainObject("Garply");
                                newInstance.name = "Unnamed";
                                newInstance.value = (1 + Math.sqrt(5))/2;
                                newInstance.opt = Math.PI * 2;
                                scope.updateCurrent(newInstance)
                            }
                        },
                        "to-detail": {
                            to: "GarplyDetail",
                            action: t => {

                                const id = t.context;

                                return Q_GarplyDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        id
                                                    )
                                                )
                                    }
                                }).then(({iQueryGarply}) => {

                                    if (iQueryGarply.rows.length === 0)
                                    {
                                        alert("Could not load Garply with id '" + id)
                                    }

                                    scope.updateCurrent(
                                        config.inputSchema.clone(
                                            iQueryGarply.rows[0]
                                        )
                                    );
                                })
                            }
                        }
                    }
                ,
                "GarplyDetail": {
                    "save": {

                        action: t => storeDomainObject({
                                ... extractTypeData("GarplyInput", t.context),
                            })
                            .then(() => scope.garplys.update())
                            .then(() => t.back(backToParent(t)))
                    },
                    "delete": {
                        to: "GarplyList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("Garply", id)
                                .then(
                                    didDelete => didDelete && scope.removeGarply(id)
                                )
                        }
                    },
                    "cancel": {
                        to: "GarplyList",
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
    currentGarply = null;

    /** Current todos */
    @observable
    garplys = injection( Q_GarplyList );
    
    @action
    updateGarplys(garplys)
    {
        this.garplys = garplys;
    }

    @action
    removeGarply(id)
    {
        this.garplys.rows = this.garplys.rows.filter( garply => garply.id !== id);
    }

    @action
    updateCurrent(garply)
    {
        this.currentGarply = garply;
    }
}
