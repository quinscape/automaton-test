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

    const pathFilterCallback = ({fieldPath}) => {
        return !fieldPath.endsWith("bazLinks") && !fieldPath.endsWith("id");
    };

    console.log("unfiltered tree:", createTreeRepresentationForInputSchema("AppUser", {recursive: true}));

    return (
        <Row className="mt-3">
            <Col>
                <h1>Query Editor Test</h1>
                <hr/>
                <QueryEditor
                    key={ scope.counter }
                    className="mb-3"
                    header={"Query Editor Test"}
                    rootType="AppUser"
                    schemaResolveFilterCallback={pathFilterCallback}
                    columnNameRenderer={(value, {
                        isTree = false,
                        isDirectory = false
                    } = {}) => {
                        console.log("render: %s; tree: %s; dir: %s", value, isTree, isDirectory);
                        if (isTree) {
                            if (isDirectory) {
                                return (
                                    <>
                                        <Icon className="fa-book mr-2"/>
                                        {
                                            value
                                        }
                                    </>
                                )
                            }
                            return value.split(".").at(-1);
                        }
                        return value;
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
