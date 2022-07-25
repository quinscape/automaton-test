import React, {useState} from "react";
import {config, QueryEditor, ViewState, createTreeRepresentationForInputSchema} from "@quinscape/automaton-js";
import {Col, Row} from "reactstrap";
import {Icon} from "domainql-form";


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
                        console.log("QUERY EDITOR SAVE");
                        console.log(JSON.parse(JSON.stringify(queryConfiguration)));
                    }}
                    queryConfiguration={{
                        "select": [
                            "roles",
                            "login",
                            "foos.created"
                        ],
                        "where": {
                            "type": "Condition",
                            "name": "or",
                            "operands": [
                                {
                                    "type": "Condition",
                                    "name": "containsIgnoreCase",
                                    "operands": [
                                        {
                                            "type": "Field",
                                            "name": "foos.name"
                                        },
                                        {
                                            "type": "Value",
                                            "scalarType": "String",
                                            "value": "gfd"
                                        }
                                    ]
                                },
                                {
                                    "type": "Condition",
                                    "name": "equal",
                                    "operands": [
                                        {
                                            "type": "Field",
                                            "name": "login"
                                        },
                                        {
                                            "type": "Value",
                                            "scalarType": "String",
                                            "value": "gfdsgfdsxg"
                                        }
                                    ]
                                }
                            ]
                        },
                        "sort": [
                            "login",
                            "!foos.num"
                        ]
                    }}
                />
            </Col>
        </Row>
    );
});

export default QueryEditorTestHome;
