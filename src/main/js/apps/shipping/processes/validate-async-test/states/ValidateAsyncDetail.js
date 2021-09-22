import React from "react";

import {
    backToParent,
    Button,
    CalendarField,
    config,
    deleteDomainObject,
    FilterDSL,
    i18n,
    storeDomainObject,
    ViewState
} from "@quinscape/automaton-js";

import { Field, FieldMode, Form, FormLayout, GlobalErrors, Icon, Select, TextArea } from "domainql-form";
import ValidateAsyncList from "./ValidateAsyncList";
import { ButtonToolbar } from "reactstrap";
import Q_CheckFoo from "../queries/Q_CheckFoo";


const {
    and,
    field,
    value
} = FilterDSL;

const ValidateAsyncDetail = new ViewState(
    "ValidateAsyncDetail",
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
            to: ValidateAsyncList,
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
            to: ValidateAsyncList,
            discard: true,
            action: t => {

                console.log("Transition 'cancel'")
            }
        }
    }), props => {

        const {env} = props;
        const {scope} = env;

        const { currentFoo } = scope

        const checkName = (ctx, val) => Q_CheckFoo.execute(
                {
                    config: {
                        condition: and(
                            field("name").equal(value(val)),
                            currentFoo.id && field("id").notEqual(value( currentFoo.id, "String"))
                        )
                    }
                }
            )
            .then(
                ({foos}) => {
                    const result = foos.rows.length ? i18n("Name already exists") : null;

                    console.log("ValidateAsyncDetail: validateAsync => ", result)
                    return result
                }
            );


        return (
            <React.Fragment>


                <div className="row">

                    <div className="col">
                        <Form
                            type="Foo"
                            value={ currentFoo }
                            options={{
                                layout: FormLayout.HORIZONTAL
                            }}
                        >
                            {
                                formConfig => (
                                    <React.Fragment>
                                        <h1>
                                            {
                                                i18n("Async Validation Detail")
                                            }
                                        </h1>


                                        <GlobalErrors/>
                                        <Field name="id" mode={ FieldMode.READ_ONLY }/>
                                        <Field
                                            name="name"
                                            validateAsync={ checkName }
                                        />
                                        <Field name="num"/>
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
                                    </React.Fragment>
                                )
                            }
                        </Form>
                    </div>
                </div>


            </React.Fragment>
        )
    });

export default ValidateAsyncDetail;
