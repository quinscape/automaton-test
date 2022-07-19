import React, {useState} from "react";
import {config, QueryEditor, ViewState} from "@quinscape/automaton-js";
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

    console.log(config.inputSchema);

    return (
        <Row className="mt-3">
            <Col>
                <h1>Query Editor Test</h1>
                <hr/>
                <QueryEditor
                    key={ scope.counter }
                    className="mb-3"
                    header={"Query Editor Test"}
                    // columnNameRenderer
                    availableColumnTreeObject={{
                        "id": true,
                        "bstId": true,
                        "ABst": {
                            "id": true
                        }
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
                />
            </Col>
        </Row>
    );
});

export default QueryEditorTestHome;
