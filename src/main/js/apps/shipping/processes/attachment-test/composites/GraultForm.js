import { Field, GlobalErrors, Icon, TextArea, withForm, FieldMode, Addon } from "domainql-form"
import React, { useRef } from "react"
import cx from "classnames"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, config, i18n, useAutomatonEnv,AttachmentField, URLField } from "@quinscape/automaton-js"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"


const GraultForm = props => {

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Grault Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="name"/>
            <AttachmentField
                name="attachmentId"
            />

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
        GraultForm
    ),
    {
        id: "upload-form",
        type: "Grault",
        validation: validation("Grault")
    }
)

