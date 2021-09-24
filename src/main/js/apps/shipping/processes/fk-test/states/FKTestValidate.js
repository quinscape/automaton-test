import React, { useMemo, useState } from "react";
import cx from "classnames";

import { Button, config, createDomainObject, FKSelector, i18n, ViewState, getWireFormat } from "@quinscape/automaton-js";

import FKTestList from "./FKTestList";
import { Field, Form, FormContext, GlobalConfig, GlobalErrors, Icon } from "domainql-form";
import Q_QuxA from "../../../queries/Q_QuxA";
import { ButtonToolbar } from "reactstrap";
import { useLocalObservable, observer } from "mobx-react-lite";
import { toJS } from "mobx";
import Q_QuxC from "../../../queries/Q_QuxC";

function createQuxMain(template)
{
    return getWireFormat().convert({
        kind: "OBJECT",
        name: "QuxMain"
    }, template, true)
}


const FKTestValidate = new ViewState("FKTestValidate", (process, scope) => ({
    "ok": {
        to: FKTestList,
        action: t => {
            console.log("OK:", toJS(t.context))
        }
    },

    "cancel": {
        to: FKTestList,
        discard: true,
        action: t => {

            console.log("Transition 'cancel'")
        }
    }
}), props => {

    const {env} = props;
    const {scope} = env;


    // XXX: set up our own form context with high-level validation. This is *not* what you should be doing normally
    //      You should set up that form context as default form context in your startup.js

    const localFormContext = useMemo(
        () => {
            return new FormContext(config.inputSchema, {
                validation: {
                    validateField: (ctx, value) => {

                        if (ctx.qualifiedName === "quxAId" && value === "3f88c30e-2bf9-458c-b016-dac001d02274")
                        {
                            return "error from high-level validation";
                        }
                        return null
                    }
                }
            });
        },
        []
    )

    const [quxIndex,setQuxIndex] = useState(0);

    const quxes = useLocalObservable(() => {
        return [
            // valid object
            createQuxMain({
                id: "365051d7-f10a-41fd-88ac-452a215595b1",
                name: "Unnamed",
                quxAId: "17861d28-a11d-4dd5-b66c-b4351ca1a980",
                quxA: {
                    name: "Qux A #3",
                    value: 3
                }

            }),
            // invalid selection according to local validation
            createQuxMain({
                id: "76cdfae9-7731-4c81-ad3b-fc5e1b8b293b",
                name: "Unnamed #2",
                quxAId: "cd816e04-a7cf-4df8-aad9-f021907cd81c",
                quxA: {
                    name: "Qux A #1",
                    value: 1
                }
            }),
            // invalid selection according to high-level validation
            createQuxMain({
                id: "bb658293-a4d3-412d-88b0-a804e5eea210",
                name: "Unnamed #3",
                quxAId: "3f88c30e-2bf9-458c-b016-dac001d02274",
                quxA: {
                    name: "Qux A #2",
                    value: 2
                }
            }),
            // invalid selection according to async validation
            createQuxMain({
                id: "64fbd80f-a4bf-41b6-8e41-cb62653cc9c8",
                name: "Unnamed #4",
                quxAId: "17861d28-a11d-4dd5-b66c-b4351ca1a980",
                quxA: {
                    name: "Qux A #3",
                    value: 3
                },
                quxCId1: "1098633c-9260-4884-a952-03c122efe53b",
                quxC1: {
                    name: "Qux C #1",
                    value: 1
                }
            })
        ];
    })

    //  console.log("CURRENT", toJS(scope.currentQux) )

    const currentQux = quxes[quxIndex];

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <ButtonToolbar>
                        <button
                            type="button"
                            className={ cx("btn btn-secondary mr-1", quxIndex === 0 && "active" ) }
                            onClick={ () => setQuxIndex(0)}
                            aria-pressed={ quxIndex === 0 }
                        >
                            Valid Object
                        </button>
                        <button
                            type="button"
                            className={ cx("btn btn-secondary mr-1", quxIndex === 1 && "active") }
                            onClick={ () => setQuxIndex(1)}
                            aria-pressed={ quxIndex === 1 }
                        >
                            Invalid Local
                        </button>
                        <button
                            type="button"
                            className={ cx("btn btn-secondary mr-1", quxIndex === 2 && "active") }
                            onClick={ () => setQuxIndex(2)}
                            aria-pressed={ quxIndex === 2 }
                        >
                            Invalid HL
                        </button>
                        <button
                            type="button"
                            className={ cx("btn btn-secondary mr-1", quxIndex === 3 && "active") }
                            onClick={ () => setQuxIndex(3)}
                            aria-pressed={ quxIndex === 3 }
                        >
                            Invalid Async
                        </button>
                    </ButtonToolbar>

                    <hr/>
                </div>
            </div>

            <div className="row">

                <div className="col">
                    <Form
                        key={ currentQux.id }
                        formContext={ localFormContext }
                        type="QuxMainInput"
                        value={
                            currentQux
                        }
                    >
                        {
                            formConfig => {
                                const { root } = formConfig;

                                return(
                                    <React.Fragment>
                                        <h1>
                                            {
                                                i18n("FKSelector Validation")
                                            }
                                        </h1>


                                        <GlobalErrors/>

                                        <Field name="name" helpText="Field A!"/>

                                        <FKSelector
                                            name="quxAId"
                                            label="local and high-level validation"
                                            display="quxA.name"
                                            searchFilter="name"
                                            tooltip={ (root.quxA && root.quxA.name) || GlobalConfig.none() }
                                            query={ Q_QuxA }
                                            required={ true }
                                            validate={(ctx,value) => {
                                                return value === "cd816e04-a7cf-4df8-aad9-f021907cd81c" ? "error from local validation" : null
                                            }}
                                        />

                                        <FKSelector
                                            name="quxCId1"
                                            label="async validation"
                                            display={ "quxC1.name" }
                                            query={ Q_QuxC }
                                            searchFilter="name"
                                            validateAsync={(ctx,value) => {
                                                return value === "1098633c-9260-4884-a952-03c122efe53b" ? "error from async validation" : null
                                            }}
                                        />


                                        <ButtonToolbar>
                                            <Button className="btn btn-primary mr-1" transition="ok">
                                                <Icon className="fa-save mr-1" />
                                                Ok
                                            </Button>
                                            <Button className="btn btn-secondary mr-1" transition="cancel">
                                                <Icon className="fa-times mr-1" />
                                                Cancel
                                            </Button>

                                        </ButtonToolbar>
                                    </React.Fragment>
                                )
                            }
                        }
                    </Form>
                </div>
            </div>


        </React.Fragment>
    )
});

export default FKTestValidate;
