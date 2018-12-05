import React from "react"
import cx from "classnames"
import { observer } from "mobx-react";
import { config, i18n, Icon, Button } from "automaton-js"

import { Field, GlobalErrors, TextArea, withForm } from "domainql-form"
import { ButtonToolbar } from "reactstrap";

class FooForm extends React.Component {

    render()
    {
        const {formConfig} = this.props;

        const {root} = formConfig;

        //console.log("FOO FORM", root);

        const auth = config.auth;
        //console.log({auth, root});

        const canAccess = auth.id === root.owner.id;

        return (
            <React.Fragment>
                <GlobalErrors/>
                <Field name="name"/>
                <TextArea name="description"/>
                <Field name="num"/>
                <Field name="created"/>

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
    }
}


export default withForm(
    observer(
        FooForm
    ),
    {
        type: "FooInput"
    }
)

