import { Field, FieldMode, GlobalErrors, Icon, withForm } from "domainql-form"
import React from "react"
import { observer } from "mobx-react-lite";
import { Button, i18n, ScrollTracker } from "@quinscape/automaton-js"
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
                <Button className="btn btn-secondary mr-1" transition="back">
                    <Icon className="fa-times mr-1" />
                    Back
                </Button>

            </ButtonToolbar>
            </ScrollTracker>
        </React.Fragment>
    );
};

export default withForm(
    observer(BarForm),
    {
        type: "BarInput"
    }
)

