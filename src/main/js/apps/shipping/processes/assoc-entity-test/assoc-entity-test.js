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


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "AssocEntityList",
            states: {
                "AssocEntityList": {
                    "new-baz": {
                        to: "BazDetail",
                        action: t => {
                            const newBaz = createDomainObject("BazInput");

                            newBaz.name = "Unnamed Baz";
                            return scope.updateBaz(newBaz);
                        }
                    },
                    "new-baz-value": {
                        to: "BazValueDetail",
                        action: t => {
                            const newBazValue = createDomainObject("BazValueInput");

                            newBazValue.name = "Unnamed Baz Value";
                            return scope.updateBazValue(newBazValue);
                        }
                    },

                    "to-baz-detail": {
                        to: "BazDetail",
                        action: t => {

                            console.log("to-baz-detail, context = ", t.context);

                            return Q_BazDetail.execute({
                                config: {
                                    condition:
                                        field("id")
                                            .eq(
                                                value(t.context)
                                            )
                                }
                            }).then(
                                ({iQueryBaz}) => scope.updateBaz(iQueryBaz.rows[0])
                            );
                        }
                    },

                    "to-baz-value-detail": {
                        to: "BazValueDetail",
                        action: t => {

                            console.log("to-baz-value-detail, context = ", t.context);

                            return Q_BazValueDetail.execute({
                                config: {
                                    condition:
                                        field("id")
                                            .eq(
                                                value(t.context)
                                            )
                                }
                            }).then(
                                ({iQueryBazValue}) => scope.updateBazValue(iQueryBazValue.rows[0])
                            );
                        }
                    }
                },

                "BazDetail": {
                    "save": {
                        to: "AssocEntityList",
                        action: t => {

                            console.log("SAVE BAZ", toJS(t.context));

                            return storeDomainObject(t.context)
                                .then(
                                    () => updateAssociations({
                                        domainType: "BazLink",
                                        leftSideType: "Baz",
                                        sourceIds:[ t.context.id ],
                                        domainObjects: t.context.bazLinks.map( bl => ({
                                            id: bl.id,
                                            bazId: t.context.id,
                                            valueId: bl.value.id
                                        }))
                                    })
                                )
                                .then(() => Promise.all([
                                    scope.links.update(),
                                    scope.bazes.update()
                                ]));
                        }
                    },
                    "delete": {
                        to: "AssocEntityList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("Baz", id)
                                .then(
                                    didDelete => didDelete && Promise.all([
                                        scope.links.update(),
                                        scope.bazes.update()
                                    ])
                                )
                        }
                    },
                    "cancel": {
                        to: "AssocEntityList",
                        discard: true,
                        action: t => {

                            console.log("Transition 'cancel'")
                        }
                    }
                },

                "BazValueDetail": {
                    "save": {
                        to: "AssocEntityList",
                        action: t => {

                            console.log("SAVE BAZ VALUE", toJS(t.context));

                            return storeDomainObject(t.context)
                                .then(
                                    () => updateAssociations({
                                        domainType: "BazLink",
                                        leftSideType: "BazValue",
                                        sourceIds: [ t.context.id ],
                                        domainObjects: t.context.bazLinks.map( bl => ({
                                            id: bl.id,
                                            bazId: bl.baz.id,
                                            valueId: t.context.id
                                        }))
                                    })
                                )
                                .then(() => Promise.all([
                                    scope.links.update(),
                                    scope.bazValues.update()
                                ]));
                        }
                    },
                    "delete": {
                        to: "AssocEntityList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("BazValue", id)
                                .then(
                                    didDelete => didDelete && Promise.all([
                                        scope.links.update(),
                                        scope.bazValues.update()
                                    ])
                                )
                        }
                    },
                    "cancel": {
                        to: "AssocEntityList",
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
