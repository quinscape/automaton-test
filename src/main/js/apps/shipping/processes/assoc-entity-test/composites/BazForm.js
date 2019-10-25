import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, i18n, AssociationSelector, FKSelector, useAutomatonEnv } from "@quinscape/automaton-js"

import { Field, FieldMode, GlobalErrors, withForm } from "domainql-form"
import { ButtonToolbar } from "reactstrap";
import Q_BazValueList from "../queries/Q_BazValueList";
import Q_QuxA from "../../../queries/Q_QuxA";
import Q_AppUser from "../../../queries/Q_AppUser";


const BazForm = props => {

    const env = useAutomatonEnv();

    const { formConfig } = props;
    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Associate Entity Detail A")
                }
            </h1>


            <GlobalErrors/>
            <Field name="id" mode={ FieldMode.PLAIN_TEXT }/>
            <Field name="name" wrapperColumnClass="col-md-4"/>
            <AssociationSelector
                name="bazLinks"
                label="Associated Values"
                display="value.name"
                value="value.id"
                helpText="Select associated baz values"
                query={
                    Q_BazValueList
                }

            />

            <FKSelector
                name="ownerId"
                display="owner.login"
                validateInput="login"
                tooltip="Baz-Owner"
                required={ true }
                query={ Q_AppUser }
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
        BazForm
    ),
    {
        type: "BazInput"
    }
)

