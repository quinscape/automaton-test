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
import {  FieldMode  } from "domainql-form";
import Q_WaldoList from "./queries/Q_WaldoList";
import Q_WaldoDetail from "./queries/Q_WaldoDetail";
import Q_CorgeType from "../merge-test/queries/Q_CorgeType";
import Q_FooType from "../datagrid-test/queries/Q_FooType";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "WaldoList",
            states: {
                "WaldoList":
                    {
                        "new-meta-config": {
                            to: "WaldoDetail",
                            action: t => {
                                const newInstance = createDomainObject("Waldo");
                                newInstance.name = "Unnamed";
                                scope.updateCurrent(newInstance)
                            }
                        },
                        "to-detail": {
                            to: "WaldoDetail",
                            action: t => {

                                const id = t.context;

                                return Q_WaldoDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        id
                                                    )
                                                )
                                    }
                                }).then(({iQueryWaldo}) => {

                                    if (iQueryWaldo.rows.length === 0)
                                    {
                                        alert("Could not load Waldo with id '" + id)
                                    }

                                    scope.updateCurrent(
                                        config.inputSchema.clone(
                                            iQueryWaldo.rows[0]
                                        )
                                    );
                                })
                            }
                        }
                    }
                ,
                "WaldoDetail": {
                    "save": {

                        action: t =>
                            // 1.
                            Attachments.uploadPending(t.context)

                            // 2.
                            .then( () => storeDomainObject({
                                ... extractTypeData("WaldoInput", t.context),
                            }))
                            // 3.
                            .then(() => Attachments.deletePending(t.context))

                            .then(() => scope.waldos.update())
                            .then(() => t.back(backToParent(t)))
                    },
                    "delete": {
                        to: "WaldoList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("Waldo", id)
                                .then(
                                    didDelete => didDelete && scope.removeWaldo(id)
                                )
                        }
                    },
                    "cancel": {
                        to: "WaldoList",
                        discard: true,

                        action: t => {
                            console.log("Transition 'cancel'")
                            return Attachments.clearAll(t.context)
                        }
                    }
                }
            }
        }
    );
}

export default class DateTestScope {

    @observable
    currentWaldo = null;

    @observable
    formMode = FieldMode.NORMAL;

    /** Current todos */
    @observable
    waldos = injection( Q_WaldoList );

    @observable
    corgeTypes = injection(Q_CorgeType);

    @observable
    fooTypes = injection(
        Q_FooType
    );

    @action
    updateWaldos(waldos)
    {
        this.waldos = waldos;
    }
    @action
    setFormMode(fieldMode)
    {
        this.formMode = fieldMode;
    }

    @action
    removeWaldo(id)
    {
        this.waldos.rows = this.waldos.rows.filter( waldo => waldo.id !== id);
    }

    @action
    updateCurrent(waldo)
    {
        this.currentWaldo = waldo;
    }
}
