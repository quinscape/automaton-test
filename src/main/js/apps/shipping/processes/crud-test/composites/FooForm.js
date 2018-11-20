import React from "react"
import cx from "classnames"
import { observer } from "mobx-react";
import { config } from "automaton-js";

import { Field, GlobalErrors, Icon, TextArea, withForm } from "domainql-form"

@observer
class FooForm extends React.Component {

    render()
    {
        const { formConfig } = this.props;

        const { root } = formConfig;

        const auth = config.auth;
        console.log({auth,root});

        const canAccess = auth.id === root.owner.id;

        return (
            <React.Fragment>
                <GlobalErrors/>
                <Field name="name"/>
                <TextArea name="description"/>
                <Field name="num"/>
                <Field name="created"/>

                <div>
                    <button
                        type="reset"
                        className="btn btn-secondary"
                    >
                        <Icon className="fa-recycle"/>
                        { " " }
                        Reset
                    </button>
                    { " " }
                    <button
                        type="submit"
                        className={
                            cx(
                                "btn",
                                canAccess ? "btn-success" : "btn-danger"
                            )
                        }
                    >
                        <Icon className="fa-save"/>
                        { " " }
                        Save
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default withForm(
    FooForm,
    {
        type: "FooInput"
    }
)


