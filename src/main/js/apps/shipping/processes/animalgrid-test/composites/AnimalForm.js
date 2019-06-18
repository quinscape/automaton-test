import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, i18n, ScrollTracker } from "@quinscape/automaton-js"

import { Field, GlobalErrors, withForm } from "domainql-form"
import { ButtonToolbar } from "reactstrap";


const AnimalForm = props => {

    const { formConfig } = props;

    return (
        <React.Fragment>
            <ScrollTracker formConfig={ formConfig }>
            <h1>
                {
                    i18n("Node Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="name"/>

            <ButtonToolbar>
                <Button
                    className="btn btn-secondary mr-1"
                    transition="back"
                    icon="fa-times mr-1"
                    text="Back"
                />
                <Button
                    className="btn btn-primary mr-1"
                    transition="save"
                    icon="fa-times mr-1"
                    text="Save"
                />

            </ButtonToolbar>
            </ScrollTracker>
        </React.Fragment>
    )
};

export default withForm(
    fnObserver(
        AnimalForm
    ),
    {
        type: "NodeInput"
    }
)

