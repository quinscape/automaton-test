import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, config, i18n, ScrollTracker } from "@quinscape/automaton-js"

import { Field, GlobalErrors, TextArea, withForm } from "domainql-form"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"


const FooForm = props => {

    const { formConfig } = props;

    const { root } = formConfig;

    //console.log("FOO FORM", root);

    const auth = config.auth;
    //console.log({ auth, root });

    const canAccess = auth.id === root.owner.id;

    return (
        <ScrollTracker formConfig={ formConfig }>
            <h1>
                {
                    i18n("Foo Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="name"/>
            <TextArea name="description"/>
            <Field name="created"/>
            <Field name="flag"/>
            <Field name="num"/>

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

        </ScrollTracker>
    )
};

export default withForm(
    fnObserver(
        FooForm
    ),
    {
        type: "FooInput",
        validation: validation("FooInput")
    }
)

