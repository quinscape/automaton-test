import { React } from "react";

import {
    ViewState,
    storeDomainObject,
    extractTypeData,
    backToParent,
    deleteDomainObject,
} from "@quinscape/automaton-js";

import { action, toJS } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import QuxMainForm from "../composites/QuxMainForm";
import { FormLayout } from "domainql-form";
import FKTestList from "./FKTestList";

const FKTestDetail = new ViewState("FKTestDetail", () => ({
    "save": {
        action: t =>
            storeDomainObject({
                ... extractTypeData("QuxMainInput", t.context),
                quxDId: t.context.quxD && t.context.quxD.id
            })
            .then(() => scope.quxes.update())
            .then(() => t.back(backToParent(t)))
    },

    "delete": {
        to: FKTestList,
        discard: true,
        confirmation: context => `Delete ${context.name} ?`,

        action: t => {
            const { id } = t.context;

            return deleteDomainObject("QuxMain", id)
                .then(
                    didDelete => didDelete && scope.quxes.update()
                )
        }
    },

    "cancel": {
        to: FKTestList,
        discard: true,
        action: t => {

            console.log("Transition 'cancel'")
        }
    }
}), props => {

    const {env} = props;
    const {scope} = env;


    //  console.log("CURRENT", toJS(scope.currentQux) )

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <QuxMainForm
                        value={
                            scope.currentQux
                        }
                    />
                </div>
            </div>


        </React.Fragment>
    )
});

export default FKTestDetail;