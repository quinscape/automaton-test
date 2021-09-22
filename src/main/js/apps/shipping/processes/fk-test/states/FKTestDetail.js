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


const { and, or, field, value, component } = FilterDSL;

const FKTestDetail = new ViewState("FKTestDetail", (process, scope) => ({
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


    //  console.log("CURRENT", toJS(scope.currentQux) )

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <Form
                        type="QuxMainInput"
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

                                        <Field name="name" helpText="Field A!"/>

                                        <FKSelector
                                            name="quxAId"
                                            label="simple search filter"
                                            display="quxA.name"
                                            searchFilter="name"
                                            tooltip={ (root.quxA && root.quxA.name) || GlobalConfig.none() }
                                            query={ Q_QuxA }
                                            required={ true }
                                        />

                                        <FKSelector
                                            name="quxBName"
                                            label="foreign key to name field"
                                            tooltip="Example of FK to name field"
                                            helpText={ "Select a QuxB"}
                                            searchFilter="name"
                                            modalFilter={ FKSelector.NO_FILTER }
                                            query={ Q_QuxB }
                                        />

                                        <FKSelector
                                            name="quxCId1"
                                            label="multi-relation / no-search (required)"
                                            tooltip="Example of multiple fks to the same type C (FK-1)"
                                            display={ "quxC1.name" }
                                            query={ Q_QuxC }
                                        />

                                        <FKSelector
                                            name="quxCId2"
                                            label="multi-relation / no-search (optional)"
                                            tooltip="Example of multiple fks to the same type C (FK-2)"
                                            display={ "quxC2.name" }
                                            query={ Q_QuxC }
                    />

                                        <FKSelector
                                            name="quxDId"
                                            label="complex search / description addon"
                                            tooltip="Example for fk with complex search filter"
                                            display="quxD.name"
                                            searchFilter={
                                                val => or(
                                                    field("name")
                                                        .containsIgnoreCase(
                                                            value(
                                                                val
                                                            )
                                                        ),
                                                    field("description")
                                                        .containsIgnoreCase(
                                                            value(
                                                                val
                                                            )
                                                        )
                                                )
                                            }
                                            query={ Q_QuxD }
                                        >
                                            <Addon placement={ Addon.RIGHT} text={ true } className="text-monospace">
                                                {
                                                    () => (root.quxD && "Description: " + root.quxD.description) || GlobalConfig.none()
                                                }
                                            </Addon>

                                        </FKSelector>

                                        <FKSelector
                                            tooltip="Custom validation filter with both search and column filter"
                                            name="quxD2Id"
                                            display="quxD2.name"
                                            label="extra column filter"
                                            modalTitle="Select target (extra column filter)"
                                            modalFilter={ FKSelector.COLUMN_FILTER }
                                            searchFilter={
                                                val => or(
                                                    field("name")
                                                        .containsIgnoreCase(
                                                            value(
                                                                val
                                                            )
                                                        ),
                                                    field("description")
                                                        .containsIgnoreCase(
                                                            value(
                                                                val
                                                            )
                                                        )
                                                )
                                            }
                                            query={ Q_QuxD }
                                        />

                                        <FKSelector
                                            tooltip="Example for fk with custom validation filter with search filter in the modal"
                                            name="quxD3Id"
                                            display="quxD3.name"
                                            label="no search filter"
                                            modalTitle="Select target (no search filter)"
                                            modalFilter={ FKSelector.NO_SEARCH_FILTER }
                                            searchFilter="name"
                                            query={ Q_QuxD }
                                        />

                                        <FKSelector
                                            tooltip="Example for fk with custom validation filter with search filter in the modal"
                                            name="quxD3Id"
                                            display="quxD3.value"
                                            label="no search filter / numeric"
                                            modalTitle="Select target (no search filter)"
                                            modalFilter={ FKSelector.NO_SEARCH_FILTER }
                                            searchFilter="value"
                                            query={ Q_QuxD }
                                        />


                                        <FKSelector
                                            tooltip="Example for fk with custom validation filter with search filter in the modal"
                                            name="quxD4Id"
                                            display="quxD4.name"
                                            label="injection-based"
                                            modalTitle="Select target"
                                            searchFilter={
                                                val => or(
                                                    field("name")
                                                        .containsIgnoreCase(
                                                            value(
                                                                val
                                                            )
                                                        ),
                                                    field("description")
                                                        .containsIgnoreCase(
                                                            value(
                                                                val
                                                            )
                                                        )
                                                )
                                            }
                                            query={ scope.quxDs }
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

export default FKTestDetail;
