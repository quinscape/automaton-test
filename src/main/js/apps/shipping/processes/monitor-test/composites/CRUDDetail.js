import React, { useState } from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { DEFAULT_OPTIONS, FormLayout } from "domainql-form"
import { useEntity } from "@quinscape/automaton-js"
import FooForm from "./FooForm";
import FormOptions from "./FormOptions";


const CRUDDetail = props => {

    const [ control, setControl] = useState(() => ({
        ... DEFAULT_OPTIONS,
        layout: FormLayout.HORIZONTAL,
        isolation: false
    }));

    const changeControl = (k, v) => setControl({
        ...control,
        [k]: v
    });

    const {env} = props;
    const {scope} = env;

    const entity = useEntity("Foo", scope.currentFoo.id);

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
