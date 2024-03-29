import { Field, FieldMode, GlobalErrors, Icon, TextArea, withForm } from "domainql-form"
import React from "react"
import { observer } from "mobx-react-lite";
import { Button, CalendarField, config, i18n, ScrollTracker } from "@quinscape/automaton-js"
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
                    i18n("Foo Detail")
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
                <Button className="btn btn-primary mr-1" transition="save">
                    <Icon className="fa-save mr-1" />
                    Save
                </Button>
                <Button className="btn btn-secondary mr-1" transition="next">
                    <Icon className="fa-forward mr-1" />
                    Next
                </Button>
                <Button className="btn btn-secondary mr-1" transition="open-dialog">
                    <Icon className="fa-th-list mr-1" />
                    Open Dialog Sub
                </Button>
                <Button className="btn btn-secondary mr-1" transition="open-full">
                    <Icon className="fa-th-list mr-1" />
                    Open Fullscreen Sub
                </Button>
                <Button className="btn btn-secondary mr-1" transition="cancel">
                    <Icon className="fa-times mr-1" />
                    Cancel
                </Button>

            </ButtonToolbar>

        </ScrollTracker>
    );
};

export default withForm(
    observer(FooForm),
    {
        type: "FooInput",
        validation: validation("FooInput")
    }
)

