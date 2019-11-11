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
        <React.Fragment>
            <GlobalErrors/>
            <Field name="name" wrapperColumnClass="col-md-4"/>
            <Field name="num"  wrapperColumnClass="col-md-3"/>
            <TextArea name="description"/>
            <CalendarField name="created"/>
            <Field name="flag"/>
            <Field name="type" wrapperColumnClass="col-md-1"/>
        </React.Fragment>
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

