import React, { useState } from "react";

import {
    Button,
    ViewState,
    storeDomainObject,
    config,
    backToParent,
    deleteDomainObject,
    FilterDSL,
    CalendarField,
    i18n
} from "@quinscape/automaton-js";

import {
    Form,
    DEFAULT_OPTIONS,
    Field,
    FieldGroup,
    FieldMode,
    FormLayout,
    GlobalErrors, Icon,
    Select,
    TextArea
} from "domainql-form";
import FormOptions from "../composites/FormOptions";
import CRUDList from "./CRUDList";
import { ButtonToolbar } from "reactstrap";


const {
    value
} = FilterDSL;

const CRUDDetail = new ViewState(
    "CRUDDetail",
    (process, scope) => ({
        "save": {
            action: t =>
                storeDomainObject({
                    ...t.context,
                    ownerId: config.auth.id || "",
                })
                    .then(() => scope.foos.update())
                    .then(() => t.back(backToParent(t)))
        },

        "delete": {
            to: CRUDList,
            discard: true,
            confirmation: context => `Delete ${context.name} ?`,

            action: t => {
                const {id} = t.context;

                return deleteDomainObject("Foo", id)
                    .then(
                        didDelete => didDelete && scope.foos.update()
                    )
            }
        },

        "cancel": {
            to: CRUDList,
            discard: true,
            action: t => {

                console.log("Transition 'cancel'")
            }
        }
    }), props => {

        const [control, setControl] = useState(() => ({
            ...DEFAULT_OPTIONS,
            layout: FormLayout.HORIZONTAL,
            isolation: false
        }));

        const changeControl = (k, v) => setControl({
            ...control,
            [k]: v
        });

        const {env} = props;
        const {scope} = env;

        return (
            <React.Fragment>

                <FormOptions
                    control={control}
                    changeControl={changeControl}
                />

                <div className="row">

                    <div className="col">
                        <Form type="Foo" value={scope.currentFoo} options={control}>
                            <h1>
                                {
                                    i18n("Foo Detail")
                                }
                            </h1>


                            <GlobalErrors/>
                            <Field name="id" mode={ FieldMode.PLAIN_TEXT }/>
                            <FieldGroup>
                                <Field name="name" wrapperColumnClass="col-md-4"/>
                                <Field name="num"  wrapperColumnClass="col-md-3"/>
                            </FieldGroup>
                            <TextArea name="description"/>
                            <CalendarField name="created"/>
                            <Field name="flag"/>
                            <Select
                                name="type"
                                values={ scope.fooTypes.rows }
                                nameProperty={ "name" }
                                valueProperty={ "name" }
                            />
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
                        </Form>
                    </div>
                </div>


            </React.Fragment>
        )
    });

export default CRUDDetail;
