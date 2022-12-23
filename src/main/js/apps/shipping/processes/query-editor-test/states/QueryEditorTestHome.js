import React, {useEffect} from "react";
import {QueryEditor, ViewState, createTreeRepresentationForInputSchema, decompileFilter} from "@quinscape/automaton-js";
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

    useEffect(() => {
        const { columns, condition, sort } = scope.editorQuery;

        console.group("SCOPE DATA CHANGE");
        console.log("SELECT", `[\n\t${columns.join("\n\t")}\n]`);
        console.log("CONDITION", decompileFilter(condition));
        console.log("SORT", `[\n\t${sort.map(a => JSON.stringify(a)).join("\n\t")}\n]`);
        console.groupEnd("SCOPE DATA CHANGE");
    }, [
        scope.editorQuery.columns,
        scope.editorQuery.condition,
        scope.editorQuery.sort
    ]);

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
                        const { columns, condition, sort } = queryConfiguration

                        console.group("QUERY EDITOR SAVE");
                        console.log("SELECT", toJS(columns));
                        console.log("CONDITION", decompileFilter(condition));
                        console.log("SORT", toJS(sort));
                        console.groupEnd("QUERY EDITOR SAVE");
                    }}
                    onChange={(queryConfiguration) => {
                        const { columns, condition, sort } = queryConfiguration

                        console.group("QUERY EDITOR CHANGE");
                        console.log("SELECT", toJS(columns));
                        console.log("CONDITION", decompileFilter(condition));
                        console.log("SORT", toJS(sort));
                        console.groupEnd("QUERY EDITOR CHANGE");
                    }}
                    queryConfiguration={ scope.queryConfig }
                />
            </Col>
        </Row>
    );
});

export default QueryEditorTestHome;
