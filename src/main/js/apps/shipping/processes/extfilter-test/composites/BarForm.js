import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, i18n, ScrollTracker } from "@quinscape/automaton-js"

import { Field, FieldMode, GlobalErrors, withForm } from "domainql-form"
import { ButtonToolbar } from "reactstrap";


const BarForm = props => {

    const { formConfig } = props;

    return (
        <React.Fragment>
            <ScrollTracker formConfig={ formConfig }>
            <h1>
                {
                    i18n("Bar Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="created" mode={ FieldMode.READ_ONLY }/>
            <Field name="name"/>
            <Field name="numa"/>
            <Field name="numb"/>

            <ButtonToolbar>
                <Button
                    className="btn btn-secondary mr-1"
                    transition="back"
                    icon="fa-times mr-1"
                    text="Back"
                />

            </ButtonToolbar>
            </ScrollTracker>
        </React.Fragment>
    )
};

export default withForm(
    fnObserver(
        BarForm
    ),
    {
        type: "BarInput"
    }
)

