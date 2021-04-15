import {
    observable,
    action, toJS
} from "mobx";

import {
    injection,
    config,
    createDomainObject,
    storeDomainObject,
    deleteDomainObject,
    backToParent,
    updateAssociations,

    FilterDSL
} from "@quinscape/automaton-js";
import Q_BazList from "./queries/Q_BazList";
import Q_BazLinkList from "./queries/Q_BazLinkList";
import Q_BazValueList from "./queries/Q_BazValueList";
import Q_BazDetail from "./queries/Q_BazDetail";
import Q_BazValueDetail from "./queries/Q_BazValueDetail";


// deconstruct FilterDSL methods
const { field, value, and, or, not } = FilterDSL;


import AssocEntityList from "./states/AssocEntityList";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return AssocEntityList;
}

export default class AssociativeEntityTestScope {

    @observable
    currentBaz = null;

    @observable
    currentBazValue = null;

    /** Associative Entity  / Link-Table iQuery  */
    @observable
    links = injection(Q_BazLinkList);

    /** Left side entity list */
    @observable
    bazes = injection(Q_BazList);

    /** Right side entity list */
    @observable
    bazValues = injection(Q_BazValueList);

    @action
    updateBaz(baz)
    {
        console.log("updateBaz", toJS(baz));
        this.currentBaz = baz;
    }

    @action
    updateBazValue(bazValue)
    {
        console.log("updateBazValue", toJS(bazValue));
        this.currentBazValue = bazValue;
    }
}
