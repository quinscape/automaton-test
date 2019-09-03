import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, i18n, AssociationSelector } from "@quinscape/automaton-js"

import { Field, FieldMode, GlobalErrors, withForm } from "domainql-form"
import { ButtonToolbar } from "reactstrap";
import Q_BazList from "../queries/Q_BazList";


const BazValueForm = props => {

    const { formConfig } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Associate Entity Detail B")
                }
            </h1>


            <GlobalErrors/>
            <Field name="id" mode={ FieldMode.PLAIN_TEXT }/>
            <Field name="name" wrapperColumnClass="col-md-4"/>
            <AssociationSelector
                name="bazLinks"
                label="Associated Values"
                display="baz.name"
                value="baz.id"
                helpText="Select associated bazes"
                query={
                    Q_BazList
                }

            />
            <ButtonToolbar>
                <Button
                    className="btn btn-primary mr-1"
                    transition="save"
                    icon="fa-save mr-1"
                    text="Save"
                />
                <Button
                    className="btn btn-danger mr-1"
                    transition="delete"
                    icon="fa-times mr-1"
                    text="Delete"
                />
                <Button
                    className="btn btn-secondary mr-1"
                    transition="cancel"
                    icon="fa-times mr-1"
                    text="Cancel"
                />

            </ButtonToolbar>
        </React.Fragment>
    )
};

export default withForm(
    fnObserver(
        BazValueForm
    ),
    {
        type: "BazValueInput"
    }
)

