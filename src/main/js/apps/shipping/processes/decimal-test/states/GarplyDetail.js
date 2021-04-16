import React from "react";

import {
    ViewState,
    storeDomainObject,
    extractTypeData,
    backToParent,
    deleteDomainObject,
} from "@quinscape/automaton-js";

import GarplyForm from "../composites/GarplyForm";
import GarplyList from "./GarplyList";

const GarplyDetail = new ViewState("GarplyDetail", (process, scope) => ({
    "save": {

        action: t => storeDomainObject({
                ... extractTypeData("GarplyInput", t.context),
            })
            .then(() => scope.garplys.update())
            .then(() => t.back(backToParent(t)))
    },

    "delete": {
        to: GarplyList,
        discard: true,
        confirmation: context => `Delete ${context.name} ?`,

        action: t => {
            const { id } = t.context;

            return deleteDomainObject("Garply", id)
                .then(
                    didDelete => didDelete && scope.removeGarply(id)
                )
        }
    },

    "cancel": {
        to: GarplyList,
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
                    <GarplyForm
                        key={ scope.currentGarply.id }
                        value={ scope.currentGarply }
                    />
                </div>
            </div>


        </React.Fragment>
    )
});

export default GarplyDetail;