import React, { useState } from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { DEFAULT_OPTIONS, FormLayout } from "domainql-form"
import FooForm from "./FooForm";
import FormOptions from "./FormOptions";


const CRUDDetail = props => {

    const [ control, setControl] = useState(() => ({
        ... DEFAULT_OPTIONS,
        layout: FormLayout.HORIZONTAL
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
};

export default fnObserver(CRUDDetail)
