import React, { useState } from "react";
import {config, QueryEditor, ViewState, createTreeRepresentationForInputSchema, decompileFilter, createQuery} from "@quinscape/automaton-js";
import { ButtonToolbar, Col, Row } from "reactstrap"
import {Icon} from "domainql-form";
import { toJS } from "mobx"
import TestCaseSelector from "../../../../../components/TestCaseSelector"

import QueryTestCases from "../../../../../data/condition/condition-tests.json"

const QueryEditorTestHome = new ViewState(
    "QueryEditorTestHome",
    (process, scope) => ({

    "test": {
        action: t => {
            console.log("TEST", t.context);
        }
    },

}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <>
            <Row className="mt-3">
                <Col>
                    <QueryEditor
                        key={ scope.counter }
                        className="mb-3"
                        header={"Query Editor Test"}
                        rootType={ scope.rootType }
                        schemaResolveFilterCallback={({fieldPath}) => {
                            return !fieldPath.endsWith("id");
                        }}
                        columnNameRenderer={(value, {origin, isDirectory}) => {
                            if(origin === QueryEditor.ORIGIN_FIELD_SELECTION_TOKEN_LIST) {
                                console.log(value, isDirectory);
                            }
                            if (isDirectory) {
                                return (
                                    <>
                                        <Icon className="fa-book mr-2"/>
                                        {
                                            value
                                        }
                                    </>
                                )
                            } else {
                                return value;
                            }
                        }}
                        saveButtonOnClick={(queryConfiguration) => {

                            const { select, where, sort } = queryConfiguration

                            console.log("QUERY EDITOR SAVE");
                            console.log("SELECT", toJS(select))
                            console.log("WHERE", JSON.stringify(where))
                            console.log("SORT", toJS(sort))
                        }}
                        onChange={(queryConfiguration) => {

                            // const { select, where, sort } = queryConfiguration
                            //
                            // console.log("QUERY EDITOR CHANGE");
                            // console.log("SELECT", toJS(select))
                            // console.log("WHERE", decompileFilter(where))
                            // console.log("SORT", toJS(sort))
                        }}
                        queryConfiguration={ scope.queryConfig }
                    />
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col md={6} >
                </Col>
            </Row>
            <Row>
                <Col md={6} >
                    <ButtonToolbar>
                        <button
                            className="btn btn-secondary"
                            onClick={
                                () => {
                                    const q = createQuery(scope.rootType, scope.queryConfig)
                                    q.execute(q.defaultVars).then(data => console.log("RESULT", data))
                                }
                            }
                            >
                            Execute
                        </button>
                        <div
                        className="form form-inline">
                            <TestCaseSelector
                                label="Load Query Test-Case"
                                cases={ QueryTestCases }
                                onCaseSelect={ (testCase, name) => scope.loadTestcase(testCase) }
                                tooltip="The default test-case on startup can be controlled with a ?test=Name parameter"
                            />
                        </div>
                    </ButtonToolbar>
                </Col>
            </Row>
        </>
    );
});

export default QueryEditorTestHome;
