import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { FormLayout } from "domainql-form"
import CorgeForm from "./CorgeForm";
import { useEntity } from "@quinscape/automaton-js"


const CorgeDetail = props => {

    const { env } = props;
    const { scope } = env;

    const entity = useEntity("Corge", scope.currentCorge.id);

    return (
        <React.Fragment>
            <div className="row">

                <div className="col">
                    <CorgeForm
                        value={ scope.currentCorge }
                        options={{
                            layout: FormLayout.HORIZONTAL,
                            isolation: false
                        }}
                    />
                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(CorgeDetail)
