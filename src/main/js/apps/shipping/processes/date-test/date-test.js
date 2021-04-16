import { observable, computed, action } from "mobx";
import { injection, FilterDSL } from "@quinscape/automaton-js";
import { FieldMode } from "domainql-form";
import Q_WaldoList from "./queries/Q_WaldoList";
import Q_CorgeType from "../merge-test/queries/Q_CorgeType";
import Q_FooType from "../datagrid-test/queries/Q_FooType";
import WaldoList from "./states/WaldoList";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

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
