import React from "react"
import { Button } from "@quinscape/automaton-js";
import { FormLayout, FieldMode } from "domainql-form";
import { observer as fnObserver } from "mobx-react-lite";
import FooForm from "./FooForm";
import { ButtonToolbar } from "reactstrap";

const SubProcessDialogDetail = props => {

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
};

export default fnObserver(SubProcessDialogDetail)
