import { Field, GlobalErrors, Icon, TextArea, withForm, FieldMode, Addon } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, config, i18n, ScrollTracker,AttachmentField,DecimalField } from "@quinscape/automaton-js"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"


const GarplyForm = props => {

    const { formConfig } = props;

    const { root } = formConfig;

    //console.log("FOO FORM", root);

    const auth = config.auth;
    //console.log({ auth, root });

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Garply Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="name"/>
            <DecimalField name="value"/>
            <DecimalField name="opt"/>

            <ButtonToolbar>
                <Button className="btn btn-primary mr-1" transition="save">
                    <Icon className="fa-save mr-1" />
                    Save
                </Button>
                <Button className="btn btn-danger mr-1" transition="delete">
                    <Icon className="fa-times mr-1" />
                    Delete
                </Button>
                <Button className="btn btn-secondary mr-1" transition="cancel">
                    <Icon className="fa-times mr-1" />
                    Cancel
                </Button>

            </ButtonToolbar>

        </React.Fragment>
    );
};

export default withForm(
    fnObserver(
        GarplyForm
    ),
    {
        id: "upload-form",
        type: "Garply",
        validation: validation("Garply")
    }
)

