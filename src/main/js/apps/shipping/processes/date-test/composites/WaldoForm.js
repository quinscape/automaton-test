import { Addon, Field, FieldMode, FormBlock, GlobalErrors, Icon, Select, TextArea, withForm } from "domainql-form"
import React, { useState } from "react"
import { observer as fnObserver } from "mobx-react-lite";
import {
    AttachmentField,
    Button,
    CalendarField,
    DecimalField,
    FieldMetaButton,
    FKSelector,
    i18n,
    URLField,
    useAutomatonEnv
} from "@quinscape/automaton-js"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"
import FieldModeControl from "../../../../../components/FieldModeControl";



const WaldoForm = props => {

    const { formConfig } = props;


    const { scope } = useAutomatonEnv();

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Waldo Detail")
                }
            </h1>

            <GlobalErrors/>

            <FieldModeControl>

                <Field name="name"/>

                <CalendarField name="timestamp"/>
                <CalendarField name="date"/>
                <CalendarField name="opt1"/>
                <CalendarField name="opt2"/>
                
            </FieldModeControl>


            <ButtonToolbar>
                <Button className="btn btn-primary mr-1" transition="save">
                    <Icon className="fa-save mr-1"/>
                    Save
                </Button>
                <Button className="btn btn-danger mr-1" transition="delete">
                    <Icon className="fa-times mr-1"/>
                    Delete
                </Button>
                <Button className="btn btn-secondary mr-1" transition="cancel">
                    <Icon className="fa-times mr-1"/>
                    Cancel
                </Button>

            </ButtonToolbar>

        </React.Fragment>
    );
};

export default withForm(
    fnObserver(
        WaldoForm
    ),
    {
        id: "upload-form",
        type: "Waldo",
        validation: validation("Waldo")
    }
)


/*
    attachment: AppAttachment
    attachmentId: String
    bigNum: BigDecimal
    corgeType: CorgeType
    corgeTypeId: String
    date: Date
    flag: Boolean
    id: String!
    name: String!
    num: Int
    text: String
    timestamp: Timestamp
    type: String
    url: String!
 */
