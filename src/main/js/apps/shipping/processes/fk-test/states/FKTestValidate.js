import React, { useMemo } from "react";

import { Button, config, createDomainObject, FKSelector, i18n, ViewState, } from "@quinscape/automaton-js";

import FKTestList from "./FKTestList";
import { Field, Form, FormContext, GlobalConfig, GlobalErrors, Icon } from "domainql-form";
import Q_QuxA from "../../../queries/Q_QuxA";
import { ButtonToolbar } from "reactstrap";
import { useLocalObservable } from "mobx-react-lite";
import { toJS } from "mobx";


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
                            return "Negative";
                        }
                        return null
                    }
                }
            });
        },
        []
    )

    const qux = useLocalObservable(() => {
        const newObj = createDomainObject("QuxMain");
        newObj.name = "Unnamed"
        return newObj;
    })


    //  console.log("CURRENT", toJS(scope.currentQux) )

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <Form
                        formContext={ localFormContext }
                        type="QuxMainInput"
                        value={
                            qux
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
                                            label="simple search filter"
                                            display="quxA.name"
                                            searchFilter="name"
                                            tooltip={ (root.quxA && root.quxA.name) || GlobalConfig.none() }
                                            query={ Q_QuxA }
                                            required={ true }
                                            validate={(ctx,value) => {
                                                return value === "cd816e04-a7cf-4df8-aad9-f021907cd81c" ? "Nope" : null
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
