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
const { field, value } = FilterDSL;


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
                                id: t.context
                            }).then(
                                ({detailQueryBaz}) => scope.updateBaz(detailQueryBaz)
                            );
                        }
                    },

                    "to-baz-value-detail": {
                        to: "BazValueDetail",
                        action: t => {

                            console.log("to-baz-value-detail, context = ", t.context);

                            return Q_BazValueDetail.execute({
                                id: t.context
                            }).then(
                                ({detailQueryBazValue}) => scope.updateBazValue(detailQueryBazValue)
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
                                .then(() => updateAssociations(
                                    "BazLink",
                                    "bazId",
                                    "valueId",
                                    t.context.id,
                                    t.context.bazLinks.map(link => link.value.id)
                                ))
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
                                .then(() => updateAssociations(
                                    "BazLink",
                                    "valueId",
                                    "bazId",
                                    t.context.id,
                                    t.context.bazLinks.map(link => link.baz.id)
                                ))
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
