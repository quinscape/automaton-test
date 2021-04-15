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

import WaldoList from "./states/WaldoList";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return WaldoList;
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
