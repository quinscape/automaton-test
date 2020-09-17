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
import Q_MetaConfigList from "./queries/Q_MetaConfigList";
import Q_MetaConfigDetail from "./queries/Q_MetaConfigDetail";
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
            startState: "MetaConfigList",
            states: {
                "MetaConfigList":
                    {
                        "new-meta-config": {
                            to: "MetaConfigDetail",
                            action: t => {
                                const newInstance = createDomainObject("MetaConfig");
                                newInstance.name = "Unnamed";
                                scope.updateCurrent(newInstance)
                            }
                        },
                        "to-detail": {
                            to: "MetaConfigDetail",
                            action: t => {

                                const id = t.context;

                                return Q_MetaConfigDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        id
                                                    )
                                                )
                                    }
                                }).then(({iQueryMetaConfig}) => {

                                    if (iQueryMetaConfig.rows.length === 0)
                                    {
                                        alert("Could not load MetaConfig with id '" + id)
                                    }

                                    scope.updateCurrent(
                                        config.inputSchema.clone(
                                            iQueryMetaConfig.rows[0]
                                        )
                                    );
                                })
                            }
                        }
                    }
                ,
                "MetaConfigDetail": {
                    "save": {

                        action: t =>
                            // 1.
                            Attachments.uploadPending(t.context)

                            // 2.
                            .then( () => storeDomainObject({
                                ... extractTypeData("MetaConfigInput", t.context),
                            }))
                            // 3.
                            .then(() => Attachments.deletePending(t.context))

                            .then(() => scope.metaConfigs.update())
                            .then(() => t.back(backToParent(t)))
                    },
                    "delete": {
                        to: "MetaConfigList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("MetaConfig", id)
                                .then(
                                    didDelete => didDelete && scope.removeMetaConfig(id)
                                )
                        }
                    },
                    "cancel": {
                        to: "MetaConfigList",
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

export default class MetaConfigTestScope {

    @observable
    currentMetaConfig = null;

    @observable
    formMode = FieldMode.NORMAL;

    /** Current todos */
    @observable
    metaConfigs = injection( Q_MetaConfigList );

    @observable
    corgeTypes = injection(Q_CorgeType);

    @observable
    fooTypes = injection(
        Q_FooType
    );

    @action
    updateMetaConfigs(metaConfigs)
    {
        this.metaConfigs = metaConfigs;
    }
    @action
    setFormMode(fieldMode)
    {
        this.formMode = fieldMode;
    }

    @action
    removeMetaConfig(id)
    {
        this.metaConfigs.rows = this.metaConfigs.rows.filter( metaConfig => metaConfig.id !== id);
    }

    @action
    updateCurrent(metaConfig)
    {
        this.currentMetaConfig = metaConfig;
    }
}
