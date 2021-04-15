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
import MetaConfigForm from "../composites/MetaConfigForm";
import MetaConfigList from "./MetaConfigList";

const MetaConfigDetail = new ViewState("MetaConfigDetail", () => ({
    "save": {

        action: t =>
            // 1.
            Attachments.uploadPending(t.context)

            // 2.
            .then( () => storeDomainObject({
                ... extractTypeData("MetaConfigInput", t.context),
            }))
            // 3.
            .then(() => Attachments.deletePending(t.context))

            .then(() => scope.metaConfigs.update())
            .then(() => t.back(backToParent(t)))
    },

    "delete": {
        to: MetaConfigList,
        discard: true,
        confirmation: context => `Delete ${context.name} ?`,

        action: t => {
            const { id } = t.context;

            return deleteDomainObject("MetaConfig", id)
                .then(
                    didDelete => didDelete && scope.removeMetaConfig(id)
                )
        }
    },

    "cancel": {
        to: MetaConfigList,
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
                    <MetaConfigForm
                        key={ scope.currentMetaConfig.id }
                        value={ scope.currentMetaConfig }
                    />
                </div>
            </div>


        </React.Fragment>
    )
});

export default MetaConfigDetail;