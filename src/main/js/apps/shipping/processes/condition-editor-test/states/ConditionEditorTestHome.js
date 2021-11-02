import React from "react";
import { Button, ConditionEditor, i18n, ViewState } from "@quinscape/automaton-js";
import cx from "classnames";
import { ButtonToolbar, Col, Row } from "reactstrap";
import { testCases } from "../condition-editor-test";


const ConditionEditorTestHome = new ViewState(
    "ConditionEditorTestHome",
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
        <Row className="mt-3">
            <Col>
                <h1>Condition-Test Test Home</h1>

                <ButtonToolbar>
                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test"
                    >
                        Test
                    </Button>
                    <select
                        defaultValue=""
                        onChange={
                            ev => {

                                window.setTimeout(
                                    () => {
                                        const name = ev.target.value;
                                        if (name)
                                        {
                                            scope.useTestCase(name);
                                        }
                                    },
                                    10
                                )
                            }
                        }
                    >
                        <option
                            value=""
                        >
                            {
                                i18n("Select TestCase")
                            }

                        </option>
                        {
                            Object.keys(testCases).map(name => (
                                <option
                                    key={ name }
                                >
                                    {
                                        name
                                    }
                                </option>
                            ))
                        }

                    </select>
                </ButtonToolbar>
                <hr/>
                <ConditionEditor
                    key={ scope.counter }
                    className="mb-3"
                    rootType={ scope.rootType }
                    container={ scope }
                    path="condition"
                />


        </Col>
        </Row>
    );
});

export default ConditionEditorTestHome;
