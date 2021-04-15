import { React } from "react";
import { ViewState, storeDomainObject, config, backToParent, Button } from "@quinscape/automaton-js";
import { action, runInAction } from "mobx";
import { FormLayout } from "domainql-form";
import { observer as fnObserver } from "mobx-react-lite";
import FooForm from "../composites/FooForm";
import { ButtonToolbar } from "reactstrap";
import EffectList from "./EffectList";
import EffectDetail from "./EffectDetail";

const EffectDetail = new ViewState("EffectDetail", () => ({
    "save": {
        action: t =>
            storeDomainObject({
                ... t.context,
                ownerId:  config.auth.id || "",
            })
                .then(() => scope.foos.update())
                .then(() => t.back(backToParent(t)))
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
        to: EffectList,
        discard: true,
        action: t => {

            console.log("Transition 'cancel'")
        }
    },

    "next": {
        to: EffectDetail,
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
                            layout: FormLayout.HORIZONTAL
                        }}
                    />
                </div>
            </div>

        </React.Fragment>
    )
});

export default EffectDetail;