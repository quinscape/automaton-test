import React from "react";
import { ViewState, InteractiveQueryEditor, i18n, Button } from "@quinscape/automaton-js";
import { toJS } from "mobx";
import cx from "classnames";
import { Row, Col, ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";


const IQEditorHome = new ViewState(
    "IQEditorHome",
    (process, scope) => ({
        "store": {
            action: t => {

                // retrieve current state as "InteractiveQueryDefinition" instance
                const def = InteractiveQueryEditor.getInteractiveQueryDefinition("my-editor");

                // XXX: we just log here, replace with actual store
                console.log("STORE", toJS(def));
            }
        }
    }),
        props => {

        const {env} = props;

        const {scope} = env;

        return (
            <>
                <Row className="mt-3">
                    <Col>
                        <ButtonToolbar>
                            <Button
                                className={cx("btn btn-secondary")}
                                transition="store"
                                tooltip="Example for store transition"
                            >
                                <Icon className="fa-vial mr-1"/>
                                Store
                            </Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <h1>
                            {
                                i18n("IQuery Editor")
                            }
                        </h1>

                        <InteractiveQueryEditor
                            id="my-editor"
                            definition={scope.definition}
                        />

                        <ButtonToolbar>

                            <button
                                type="button"
                                className="btn btn-secondary mr-1"
                                onClick={ () => scope.executeQuery }
                            >
                                Test
                            </button>
                        </ButtonToolbar>
                        <hr/>
                        {
                            scope.queryResult && (
                                <>
                                    <JsonTable
                                        key={ scope.queryId }
                                        domainType={ scope.queryResult.type }
                                        value={ scope.queryResult.rows }
                                        fields={ fields }
                                        editorState={ state }
                                    />
                                    <Pagination
                                        iQuery={ queryResult }
                                        description={ i18n("Result Navigation") }
                                    />
                                </>
                            )
                        }

                    </Col>
                </Row>
            </>
        );
    });

export default IQEditorHome;
