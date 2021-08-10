import React, { useState } from "react";

import {
    ViewState,
    storeDomainObject,
    config,
    backToParent,
    deleteDomainObject,
    FilterDSL,
    CalendarField,
    i18n
} from "@quinscape/automaton-js";

import PlughList from "./PlughList";
import { Form, Field, FieldGroup, FieldMode, GlobalErrors, Icon, Select, TextArea } from "domainql-form";
import { Button, ButtonToolbar } from "reactstrap";


const {
    value
} = FilterDSL;

const PlughDetail = new ViewState(
    "PlughDetail",
    (process, scope) => ({
        "save": {
            action: t =>
                storeDomainObject({
                    ...t.context,
                    ownerId: config.auth.id || "",
                })
                    .then(() => scope.plughs.update())
                    .then(() => t.back(backToParent(t)))
        },

        "delete": {
            to: PlughList,
            discard: true,
            confirmation: context => `Delete ${context.name} ?`,

            action: t => {
                const {id} = t.context;

                return deleteDomainObject("Plugh", id)
                    .then(
                        didDelete => didDelete && scope.plughs.update()
                    )
            }
        },

        "cancel": {
            to: PlughList,
            discard: true,
            action: t => {

                console.log("Transition 'cancel'")
            }
        }
    }), props => {

        const {env} = props;
        const {scope} = env;

        return (
            <React.Fragment>

                <div className="row">

                    <div className="col">
                        <Form
                            type="Plugh"
                            value={scope.currentPlugh}

                        >
                            <h1>
                                {
                                    i18n("Plugh Detail")
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

export default PlughDetail;
