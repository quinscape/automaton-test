import React from "react";

import {
    ViewState,
    storeDomainObject,
    updateAssociations,
    deleteDomainObject,
    FilterDSL,
} from "@quinscape/automaton-js";

import { toJS } from "mobx";
import { FormLayout } from "domainql-form";
import BazForm from "../composites/BazForm";
import AssocEntityList from "./AssocEntityList";

const {
    value
} = FilterDSL;

const BazDetail = new ViewState("BazDetail", (process, scope) => ({
    "save": {
        to: AssocEntityList,
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
        to: AssocEntityList,
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
        to: AssocEntityList,
        discard: true,
        action: t => {

            console.log("Transition 'cancel'")
        }
    }
}), props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <BazForm
                        key={ scope.currentBaz.id }
                        value={scope.currentBaz}
                        options={{
                            layout: FormLayout.HORIZONTAL
                        }}
                    />
                </div>
            </div>
        </React.Fragment>
    )
});

export default BazDetail;