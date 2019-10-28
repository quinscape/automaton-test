import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, config, i18n, ScrollTracker, CalendarField } from "@quinscape/automaton-js"

import { Field, GlobalErrors, TextArea, withForm, FieldMode, FieldGroup } from "domainql-form"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"


const FooForm = props => {

    const { formConfig } = props;

    const { root } = formConfig;

    //console.log("FOO FORM", root);

    const auth = config.auth;
    //console.log({ auth, root });

    return (
        <ScrollTracker formConfig={ formConfig }>
            <h1>
                {
                    i18n("SubProcess Fullscreen Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="id" mode={ FieldMode.PLAIN_TEXT }/>
            <Field name="name" wrapperColumnClass="col-md-4"/>
            <Field name="num"  wrapperColumnClass="col-md-3"/>
            <TextArea name="description"/>
            <CalendarField name="created"/>
            <Field name="flag"/>
            <Field name="type" wrapperColumnClass="col-md-1"/>
            <ButtonToolbar>
                <Button
                    className="btn btn-success mr-1"
                    icon="fa-clipboard-check"
                    text="Choose"
                    transition="choose"
                    context={ root.id }
                />
                <Button
                    className="btn btn-secondary mr-1"
                    transition="next"
                    icon="fa-forward mr-1"
                    text="Next"
                />
                <Button
                    className="btn btn-secondary mr-1"
                    transition="open-dialog"
                    icon="fa-th-list mr-1"
                    text="Open Dialog Sub"
                />
                <Button
                    className="btn btn-secondary mr-1"
                    transition="open-full"
                    icon="fa-th-list mr-1"
                    text="Open Fullscreen Sub"
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

