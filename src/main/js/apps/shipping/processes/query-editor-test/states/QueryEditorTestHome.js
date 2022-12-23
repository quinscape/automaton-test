import React, {useEffect, useState} from "react";
import {QueryEditor, ViewState, createTreeRepresentationForInputSchema} from "@quinscape/automaton-js";
import {Col, Row} from "reactstrap";
import {Icon} from "domainql-form";


const TEST_DATA = {
    "columns": [
        "roles",
        "login",
        "foos.created"
    ],
    "condition": {
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
            },
            {
                "type": "Condition",
                "name": "equal",
                "operands": [
                    {
                        "type": "Field",
                        "name": "foos.created"
                    },
                    {
                        "type": "Value",
                        "scalarType": "Date",
                        "value": ""
                    }
                ]
            }
        ]
    },
    "sort": [
        "login",
        "!foos.num"
    ]
};


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

    useEffect(() => {
        console.log("SCOPE DATA CHANGE:", JSON.parse(JSON.stringify(scope.editorQuery)));
    }, [
        scope.editorQuery.columns,
        scope.editorQuery.condition,
        scope.editorQuery.sort
    ]);

    const pathFilterCallback = ({fieldPath}) => {
        return !fieldPath.endsWith("bazLinks") && !fieldPath.endsWith("id");
    };

    //console.log("unfiltered tree:", createTreeRepresentationForInputSchema("AppUser", {recursive: true}));

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
                    container={scope}
                    path="editorQuery"
                    schemaResolveFilterCallback={pathFilterCallback}
                    columnNameRenderer={(value, data = {}) => {
                        //console.log("render: %s", value, data);
                        const {
                            isTree = false,
                            isDirectory = false,
                            fieldData
                        } = data;
                        if (isTree) {
                            if (isDirectory) {
                                return (
                                    <>
                                        <Icon className="fa-book mr-2"/>
                                        {
                                            fieldData.description || value
                                        }
                                    </>
                                )
                            }
                            return fieldData.description || value.split(".").at(-1);
                        }
                        return fieldData.description || value;
                    }}
                    saveButtonOnClick={(queryConfiguration) => {
                        console.log("QUERY EDITOR SAVE:", JSON.parse(JSON.stringify(queryConfiguration)));
                    }}
                    onChange={(queryConfiguration) => {
                        console.log("QUERY EDITOR CHANGE:", JSON.parse(JSON.stringify(queryConfiguration)));
                    }}
                    queryConfiguration={TEST_DATA}
                />
            </Col>
        </Row>
    );
});

export default QueryEditorTestHome;
