import { React, useState } from "react";
import { ViewState, storeDomainObject, config, backToParent, deleteDomainObject } from "@quinscape/automaton-js";
import { action } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import { DEFAULT_OPTIONS, FormLayout } from "domainql-form";
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
                .then(() => scope.foos.update())
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
                    didDelete => didDelete && scope.foos.update()
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
        layout: FormLayout.HORIZONTAL,
        isolation: false,
        validation: {
            validateField: (ctx, value) => {
                if (ctx.qualifiedName === "description" && value === "AAA")
                {
                    console.log("ERR", ctx, value)
                    return "HighLevel-Validation: Value can't be AAA"
                }
            }
        }
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
                    <FooForm value={scope.currentFoo} options={ control } />
                </div>
            </div>


        </React.Fragment>
    )
});

export default CRUDDetail;