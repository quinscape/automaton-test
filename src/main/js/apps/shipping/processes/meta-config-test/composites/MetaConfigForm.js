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


const FieldModeControl = fnObserver(({}) =>
    {
        const { scope } = useAutomatonEnv();

        return <div
            onChangeCapture={ev => scope.setFormMode(ev.target.value)}
        >

            <div
                className="form-check form-check-inline ml-3 pl-1 border-left"
            >
                <input
                    className="form-check-input"
                    type="radio"
                    name="formMode"
                    id="radioFormMode1"
                    defaultValue={FieldMode.PLAIN_TEXT}
                    defaultChecked={scope.formMode === FieldMode.PLAIN_TEXT}
                />
                <label className="form-check-label" htmlFor="radioFormMode1">
                    PLAIN_TEXT
                </label>
            </div>
            <div
                className="form-check form-check-inline"
            >
                <input
                    className="form-check-input"
                    type="radio"
                    name="formMode"
                    id="radioFormMode2"
                    defaultValue={FieldMode.READ_ONLY}
                    defaultChecked={scope.formMode === FieldMode.READ_ONLY}
                />
                <label
                    className="form-check-label"
                    htmlFor="radioFormMode2"
                >
                    READ_ONLY
                </label>
            </div>
            <div
                className="form-check form-check-inline"
            >
                <input
                    className="form-check-input"
                    type="radio"
                    name="formMode"
                    id="radioFormMode3"
                    defaultValue={FieldMode.NORMAL}
                    defaultChecked={scope.formMode === FieldMode.NORMAL}
                />
                <label
                    className="form-check-label"
                    htmlFor="radioFormMode3"
                >
                    NORMAL
                </label>
            </div>
        </div>;
    }
)

const MetaConfigForm = props => {

    const { formConfig } = props;


    const { scope } = useAutomatonEnv();

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("MetaConfig Detail")
                }
            </h1>

            <GlobalErrors/>
            <FormBlock
                options={{
                    mode: scope.formMode
                }}
            >

                <FieldModeControl/>

                <Field name="name">
                    <Addon placement={Addon.RIGHT} moveIfPlainText={true}>
                        <FieldMetaButton subProcess="meta-config-sub" dialogOptions={ { title: "xxx"}}/>
                    </Addon>
                </Field>

                <Field name="num">
                    <Addon placement={Addon.RIGHT} moveIfPlainText={true}>
                        <FieldMetaButton subProcess="meta-config-sub" dialogOptions={ { title: "" }}/>
                    </Addon>
                </Field>

                <Field name="flag">
                    <Addon placement={Addon.AFTER}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </Field>
                <TextArea name="text">
                    <Addon placement={Addon.RIGHT} moveIfPlainText={true}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </TextArea>


                <Select
                    name="type"
                    values={scope.fooTypes.rows}
                    nameProperty={"name"}
                    valueProperty={"name"}
                >
                    <Addon placement={Addon.RIGHT} moveIfPlainText={true}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </Select>

                <AttachmentField
                    name="attachmentId"
                >
                    <Addon placement={Addon.RIGHT} moveIfPlainText={true}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </AttachmentField>

                <DecimalField name="bigNum">
                    <Addon placement={Addon.RIGHT} moveIfPlainText={true}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </DecimalField>

                <URLField
                    name="url"
                    mode={scope.formMode}
                >
                    <Addon placement={Addon.RIGHT} moveIfPlainText={true}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </URLField>

                <FKSelector
                    key={formConfig.root.corgeType && formConfig.root.corgeType.id}
                    name="corgeTypeId"
                    display="corgeType.name"
                    validateInputJS={(row, value) => row.name === value}
                    tooltip="Corge Type"
                    required={true}
                    query={scope.corgeTypes}
                >
                    <Addon placement={Addon.RIGHT}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </FKSelector>

                <CalendarField name="date">
                    <Addon placement={Addon.RIGHT}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </CalendarField>
                <CalendarField name="timestamp">
                    <Addon placement={Addon.RIGHT}>
                        <FieldMetaButton subProcess="meta-config-sub"/>
                    </Addon>
                </CalendarField>
            </FormBlock>


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
        MetaConfigForm
    ),
    {
        id: "upload-form",
        type: "MetaConfig",
        validation: validation("MetaConfig")
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
