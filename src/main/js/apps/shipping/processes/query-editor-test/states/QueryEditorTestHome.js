import React, {useState} from "react";
import {config, QueryEditor, ViewState, createTreeRepresentationForInputSchema, decompileFilter} from "@quinscape/automaton-js";
import {Col, Row} from "reactstrap";
import {Icon} from "domainql-form";
import { toJS } from "mobx"


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

    console.log("unfiltered tree representation:", createTreeRepresentationForInputSchema("AppUser"));

    const treeRepresentation = createTreeRepresentationForInputSchema("AppUser", ({fieldPath}) => {
        return !fieldPath.endsWith("bazLinks") && !fieldPath.endsWith("id");
    });
    console.log("filtered tree representation:", treeRepresentation);

    return (
        <Row className="mt-3">
            <Col>
                <h1>Query Editor Test</h1>
                <hr/>
                <QueryEditor
                    key={ scope.counter }
                    className="mb-3"
                    header={"Query Editor Test"}
                    availableColumnTreeObject={treeRepresentation}
                    rootType="AppUser"
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
                        console.log("WHERE", decompileFilter(where))
                        console.log("SORT", toJS(sort))
                    }}
                    onChange={(queryConfiguration) => {

                        const { select, where, sort } = queryConfiguration

                        console.log("QUERY EDITOR CHANGE");
                        console.log("SELECT", toJS(select))
                        console.log("WHERE", decompileFilter(where))
                        console.log("SORT", toJS(sort))
                    }}
                    queryConfiguration={ scope.queryConfig }
                />
            </Col>
        </Row>
    );
});

export default QueryEditorTestHome;
