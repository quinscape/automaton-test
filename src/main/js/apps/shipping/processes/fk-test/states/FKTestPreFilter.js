import React from "react";

import {
    backToParent,
    Button,
    deleteDomainObject,
    extractTypeData,
    FilterDSL,
    FKSelector,
    i18n,
    storeDomainObject,
    ViewState,
} from "@quinscape/automaton-js";

import FKTestList from "./FKTestList";
import { Addon, Field, Form, GlobalConfig, GlobalErrors, Icon } from "domainql-form";
import Q_QuxA from "../../../queries/Q_QuxA";
import Q_QuxB from "../../../queries/Q_QuxB";
import Q_QuxC from "../../../queries/Q_QuxC";
import Q_QuxD from "../../../queries/Q_QuxD";
import { ButtonToolbar } from "reactstrap";
import { toJS } from "mobx"
import Q_QuxAPrefiltered from "../queries/Q_QuxAPrefiltered"


const { and, or, field, value, component } = FilterDSL;

const FKTestPreFilter = new ViewState("FKTestPreFilter", (process, scope) => ({
    "save": {
        action: t =>
            storeDomainObject({
                ... extractTypeData("QuxMainInput", t.context),
                quxDId: t.context.quxD && t.context.quxD.id
            })
            .then(() => scope.quxes.update())
            .then(() => t.back(backToParent(t)))
    },

    "delete": {
        to: FKTestList,
        discard: true,
        confirmation: context => `Delete ${context.name} ?`,

        action: t => {
            const { id } = t.context;

            return deleteDomainObject("QuxMain", id)
                .then(
                    didDelete => didDelete && scope.quxes.update()
                )
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


    console.log("CURRENT", toJS(scope.currentQux) )

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <Form
                        type="QuxMain"
                        value={
                            scope.currentQux
                        }
                    >
                        {
                            formConfig => {
                                const { root } = formConfig;

                                return(
                                    <React.Fragment>
                                        <h1>
                                            {
                                                i18n("Qux Detail")
                                            }
                                        </h1>


                                        <GlobalErrors/>

                                        <Field name="name" />

                                        <FKSelector
                                            name="quxAId"
                                            helpText="Field A!"
                                            label="prefiltered"
                                            display="quxA.name"
                                            searchFilter="name"
                                            tooltip={ (root.quxA && root.quxA.name) || GlobalConfig.none() }
                                            query={ Q_QuxAPrefiltered }
                                            required={ true }
                                        />

                                        <FKSelector
                                            name="quxAId"
                                            helpText="Field A!"
                                            label="prefiltered (no search)"
                                            display="quxA.name"
                                            searchFilter="name"
                                            tooltip={ (root.quxA && root.quxA.name) || GlobalConfig.none() }
                                            modalFilter={ FKSelector.NO_SEARCH_FILTER }
                                            query={ Q_QuxAPrefiltered }
                                            required={ true }
                                        />


                                        <ButtonToolbar>
                                            <Button className="btn btn-primary mr-1" transition="save">
                                                <Icon className="fa-save mr-1" />
                                                Save
                                            </Button>
                                            <Button className="btn btn-secondary mr-1" transition="delete">
                                                <Icon className="fa-times mr-1 text-danger" />
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
                        }
                    </Form>
                </div>
            </div>


        </React.Fragment>
    )
});

export default FKTestPreFilter;
