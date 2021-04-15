import { React } from "react";

import {
    ViewState,
    Attachments,
    storeDomainObject,
    extractTypeData,
    backToParent,
    deleteDomainObject,
} from "@quinscape/automaton-js";

import { action } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import WaldoForm from "../composites/WaldoForm";
import WaldoList from "./WaldoList";

const WaldoDetail = new ViewState("WaldoDetail", () => ({
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
        to: WaldoList,
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
        to: WaldoList,
        discard: true,

        action: t => {
            console.log("Transition 'cancel'")
            return Attachments.clearAll(t.context)
        }
    }
}), props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <WaldoForm
                        key={ scope.currentWaldo.id }
                        value={ scope.currentWaldo }
                    />
                </div>
            </div>


        </React.Fragment>
    )
});

export default WaldoDetail;