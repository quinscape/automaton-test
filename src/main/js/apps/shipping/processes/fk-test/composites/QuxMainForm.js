import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, config, FKSelector, i18n, ScrollTracker } from "@quinscape/automaton-js"

import { Field, GlobalErrors, withForm } from "domainql-form"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"

import Q_QuxA from "../../../queries/Q_QuxA";
import Q_QuxB from "../../../queries/Q_QuxB";
import Q_QuxC from "../../../queries/Q_QuxC";
import Q_QuxD from "../../../queries/Q_QuxD";


const QuxMainForm = props => {

    const { formConfig } = props;

    const { root } = formConfig;

    //console.log("QUX FORM", root);

    const auth = config.auth;
    //console.log({ auth, root });

    return (
        <ScrollTracker formConfig={ formConfig }>
            <h1>
                {
                    i18n("Qux Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="name" helpText="Field A!"/>

            <FKSelector
                name="quxAId"
                display={ () => root.quxA.name }
                required={ true }
                query={ Q_QuxA }
            />

            <FKSelector
                name="quxBName"
                targetField="name"
                helpText={ "Select a QuxB"}
                query={ Q_QuxB }
            />

            <FKSelector
                name="quxCId1"
                display={ () => root.quxC1.name }
                onUpdate={
                    row => formConfig.root.quxC1 = row
                }
                query={ Q_QuxC }
            />

            <FKSelector
                name="quxCId2"
                display={ () => root.quxC2 && root.quxC2.name }
                onUpdate={
                    row => formConfig.root.quxC2 = row
                }
                query={ Q_QuxC }
            />

            <FKSelector
                label="quxD"
                display={ () => root.quxD && root.quxD.name }
                query={ Q_QuxD }
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

        </ScrollTracker>
    )
};

export default withForm(
    fnObserver(
        QuxMainForm
    ),
    {
        type: "QuxMainInput",
        validation: validation("QuxMainInput")
    }
)

