import React from "react";
import { ViewState } from "@quinscape/automaton-js";
import { runInAction } from "mobx";
import { FormLayout, FieldMode } from "domainql-form";
import FooForm from "../composites/FooForm";
import SubProcessFullHome from "./SubProcessFullHome";

const SubProcessFullDetail = new ViewState("SubProcessFullDetail", (process, scope) => ({
    "choose" : {
        action: t => process.endSubProcess(t.context)
    },

    "open-dialog": {
        action: t =>
            process.runSubProcess("effect-sub-dialog", t.context)
                .then(
                    result => result && runInAction( () => console.log("RESULT", result))
                )
    },

    "open-full": {
        action: t =>
            process.runSubProcess("effect-sub-full", t.context)
                .then(
                    result => result && runInAction( () => console.log("RESULT", result))
                )
    },

    "cancel": {
        to: SubProcessFullHome,
        discard: true,
        action: t => {

            console.log("Transition 'cancel'")
        }
    },

    "next": {
        to: SubProcessFullDetail,
        discard: true,
        action: t => {

            const { foos : { rows }, currentFoo } = scope;
            for (let i = 0; i < rows.length; i++)
            {
                const foo = rows[i];
                if (foo.id === currentFoo.id && i + 1 < rows.length)
                {
                    return updateDetail(scope, rows[i+1].id);
                }
            }

            alert("No next object");
        }
    }
}), props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>


            <div className="row">

                <div className="col">
                    <FooForm
                        key={ scope.currentFoo.id }
                        value={scope.currentFoo}
                        options={{
                            layout: FormLayout.HORIZONTAL,
                            mode: FieldMode.READ_ONLY
                        }}
                    />
                </div>
            </div>

        </React.Fragment>
    )
});

export default SubProcessFullDetail;
