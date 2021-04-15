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
import GraultForm from "../composites/GraultForm";
import GraultList from "./GraultList";

const GraultDetail = new ViewState("GraultDetail", () => ({
    "save": {

        action: t =>
            // 1.
            Attachments.uploadPending(t.context)

            // 2.
            .then( () => storeDomainObject({
                ... extractTypeData("GraultInput", t.context),
            }))
            // 3.
            .then(() => Attachments.deletePending(t.context))

            .then(() => scope.graults.update())
            .then(() => t.back(backToParent(t)))
    },

    "delete": {
        to: GraultList,
        discard: true,
        confirmation: context => `Delete ${context.name} ?`,

        action: t => {
            const { id } = t.context;

            return deleteDomainObject("Grault", id)
                .then(
                    didDelete => didDelete && scope.removeGrault(id)
                )
        }
    },

    "cancel": {
        to: GraultList,
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
                    <GraultForm
                        key={ scope.currentGrault.id }
                        value={ scope.currentGrault }
                    />
                </div>
            </div>


        </React.Fragment>
    )
});

export default GraultDetail;