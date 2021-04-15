import { React, useState } from "react";
import { ViewState, storeDomainObject, config, backToParent, deleteDomainObject } from "@quinscape/automaton-js";
import { action } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import { DEFAULT_OPTIONS } from "domainql-form";
import FooForm from "../composites/FooForm";
import FormOptions from "../composites/FormOptions";
import CRUDList from "./CRUDList";

const CRUDDetail = new ViewState("CRUDDetail", () => ({
    "save": {
        action: t =>
            storeDomainObject({
                ... t.context,
                ownerId:  config.auth.id || "",
            })
            .then(() => GetFoosQuery.execute())
            .then(({getFoos}) => scope.updateFoos(getFoos))
            .then(() => t.back(backToParent(t)))
    },

    "complex-save": {
        action: t =>
            storeDomainObject({
                foo: t.context,
                other: node
            })
            .then(() => GetFoosQuery.execute())
            .then(({getFoos}) => scope.updateFoos(getFoos))
            .then(() => t.back(backToParent(t)))
    },

    "delete": {
        to: CRUDList,
        discard: true,
        confirmation: context => `Delete ${context.name} ?`,

        action: t => {
            const { id } = t.context;

            return deleteDomainObject("Foo", id)
                .then(
                    didDelete => didDelete && scope.removeFoo(id)
                )
        }
    },

    "cancel": {
        to: CRUDList,
        discard: true,
        action: t => {

            console.log("Transition 'cancel'")
        }
    }
}), props => {

    const [ control, setControl] = useState(() => ({
        ... DEFAULT_OPTIONS,
        isolation: false
    }));

    const changeControl = (k, v) => setControl({
        ...control,
        [k]: v
    });

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>

             <FormOptions
                control={ control }
                changeControl={ changeControl }
             />

            <div className="row">

                <div className="col">
                    <FooForm
                        value={scope.currentFoo}
                        options={ control }
                    />
                </div>
            </div>


        </React.Fragment>
    )
});

export default CRUDDetail;