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

import MetaConfigList from "./states/MetaConfigList";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return MetaConfigList;
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
