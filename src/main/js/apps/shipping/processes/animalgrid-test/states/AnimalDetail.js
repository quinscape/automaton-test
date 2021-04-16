import React from "react";
import { ViewState, storeDomainObject } from "@quinscape/automaton-js";
import NodeForm from "../composites/AnimalForm";
import AnimalGridHome from "./AnimalGridHome";

const AnimalDetail = new ViewState("AnimalDetail", (process, scope) => ({
    "back": {
        discard: true,
        to: AnimalGridHome,
        action: t => {
            console.log("Back to Home");
        }
    },

    "save": {
        to: AnimalGridHome,
        action: t => {
            storeDomainObject({
                _type: "NodeInput",
                id: t.context.id,
                name: t.context.name,
                parentId: t.context.parent.id
            });
        }
    }
}), props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <NodeForm
                        value={scope.currentNode}
                    />
                </div>
            </div>
        </React.Fragment>
    )
});

export default AnimalDetail;