import React, {useState} from "react";
import { Button, ConditionEditor, i18n, ViewState, config, SelectionTreeModal } from "@quinscape/automaton-js";
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

    const [treeSelectionModalOpen, setTreeSelectionModalOpen] = useState(false);

    console.log(config.inputSchema);

    return (
        <Row className="mt-3">
            <Col>
                <h1>Condition-Test Test Home</h1>

                <ButtonToolbar>
                    <button
                        type="button"
                        className={ cx("btn btn-secondary mr-1") }
                        onClick={() => {
                            setTreeSelectionModalOpen(true);
                        }}
                    >
                        TREEEE
                    </button>
                    <SelectionTreeModal
                        modalHeader="TIMBEEEER (by Pitbull feat. Kesha)"
                        toggle={() => setTreeSelectionModalOpen(!treeSelectionModalOpen)}
                        isOpen={treeSelectionModalOpen}
                        selected={[]}
                        onSubmit={(selectedElements) => {
                            console.log(selectedElements)
                        }}
                        treeContent={{
                            "id": true,
                            "bstId": true,
                            "ABst": {
                                "id": true
                            }
                        }}
                    />
                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test"
                    >
                        Test
                    </Button>
                    <select
                        defaultValue={ scope.templateName }
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
                    <button
                        type="button"
                        className="btn btn-link"
                        >
                        Focus
                    </button>
                </ButtonToolbar>
                <hr/>
                <ConditionEditor
                    key={ scope.counter }
                    className="mb-3"
                    rootType={ scope.rootType }
                    container={ scope }
                    path="condition"
                    queryCondition={scope.condition}
                />


        </Col>
        </Row>
    );
});

export default ConditionEditorTestHome;
