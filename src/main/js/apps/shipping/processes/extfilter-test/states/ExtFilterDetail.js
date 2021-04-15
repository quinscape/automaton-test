import { React } from "react";
import { ViewState } from "@quinscape/automaton-js";
import { action } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import BarValuesForm from "../composites/BarForm";
import ExtFilterHome from "./ExtFilterHome";

const ExtFilterDetail = new ViewState("ExtFilterDetail", () => ({
    "back": {
        discard: true,
        to: ExtFilterHome,
        action: t => {
            console.log("Back to Home");
        }
    }
}), props => {

    const { env } = props;
    const { scope } = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <BarValuesForm
                        value={ scope.currentBar }
                    />
                </div>
            </div>
        </React.Fragment>
    )
});

export default ExtFilterDetail;