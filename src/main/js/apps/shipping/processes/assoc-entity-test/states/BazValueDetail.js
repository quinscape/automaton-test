import { React } from "react";
import { ViewState, storeDomainObject, updateAssociations, deleteDomainObject } from "@quinscape/automaton-js";
import { action, toJS } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import BazValueForm from "../composites/BazValueForm";
import { FormLayout } from "domainql-form";
import BazForm from "../composites/BazForm";
import AssocEntityList from "./AssocEntityList";

const BazValueDetail = new ViewState("BazValueDetail", () => ({
    "save": {
        to: AssocEntityList,
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
        to: AssocEntityList,
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
                    <BazValueForm
                        key={ scope.currentBazValue.id }
                        value={scope.currentBazValue}
                        options={{
                            layout: FormLayout.HORIZONTAL
                        }}
                    />
                </div>
            </div>


        </React.Fragment>
    )
});

export default BazValueDetail;