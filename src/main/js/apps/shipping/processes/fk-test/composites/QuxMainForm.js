import { Addon, Field, GlobalConfig, GlobalErrors, Icon, withForm } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, FilterDSL, FKSelector, i18n, ScrollTracker } from "@quinscape/automaton-js"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"

import Q_QuxA from "../../../queries/Q_QuxA";
import Q_QuxB from "../../../queries/Q_QuxB";
import Q_QuxC from "../../../queries/Q_QuxC";
import Q_QuxD from "../../../queries/Q_QuxD";


const { and, or, field, value, component } = FilterDSL;

const QuxMainForm = props => {

    const { formConfig } = props;

    const { root } = formConfig;

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
                display="quxA.name"
                validateInput="name"
                tooltip="Example of FK to id field"
                required={ true }
                query={ Q_QuxA }
            />

            <FKSelector
                name="quxBName"
                tooltip="Example of FK to name field"
                targetField="name"
                helpText={ "Select a QuxB"}
                query={ Q_QuxB }
            />

            <FKSelector
                name="quxCId1"
                tooltip="Example of multiple fks to the same type C (FK-1)"
                display={ () => root.quxC1.name }
                onUpdate={
                    row => formConfig.root.quxC1 = row
                }
                query={ Q_QuxC }
            />

            <FKSelector
                name="quxCId2"
                tooltip="Example of multiple fks to the same type C (FK-2)"
                display={ () => root.quxC2 && root.quxC2.name }
                onUpdate={
                    row => formConfig.root.quxC2 = row
                }
                query={ Q_QuxC }
            />

            <FKSelector
                tooltip="Example for reference object only operation ( see transition 'FKTestDetail.save')"
                label="quxD"
                display="quxD.name"
                validateInput="name"
                query={ Q_QuxD }
            />

            <FKSelector
                tooltip="Example for fk with custom validation filter"
                label="quxD2"
                display="quxD.name"
                validateInput={
                    val => or(
                        field("id")
                            .startsWith(
                                value(
                                    "String",
                                    val
                                )
                            ),
                        field("name")
                            .startsWith(
                                value(
                                    "String",
                                    val
                                )
                            )
                    )
                }
                query={ Q_QuxD }
            >
                <Addon placement={ Addon.RIGHT} text={ true } className="text-monospace">
                    {
                        () => (root.quxD && root.quxD.id) || GlobalConfig.none()
                    }
                </Addon>

            </FKSelector>

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

        </ScrollTracker>
    );
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
