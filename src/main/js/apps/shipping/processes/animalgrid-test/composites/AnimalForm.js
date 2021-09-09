import { Field, GlobalErrors, Icon, withForm } from "domainql-form"
import React from "react"
import { observer } from "mobx-react-lite";
import { Button, i18n, ScrollTracker } from "@quinscape/automaton-js"
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
                <Button className="btn btn-secondary mr-1" transition="back">
                    <Icon className="fa-times mr-1" />
                    Back
                </Button>
                <Button className="btn btn-primary mr-1" transition="save">
                    <Icon className="fa-times mr-1" />
                    Save
                </Button>

            </ButtonToolbar>
            </ScrollTracker>
        </React.Fragment>
    );
};

export default withForm(
    observer(AnimalForm),
    {
        type: "NodeInput"
    }
)

