import React from "react";
import { Button, ViewState } from "@quinscape/automaton-js";
import cx from "classnames";
import { ButtonToolbar, Col, Row } from "reactstrap";
import ConditionEditorTestHome from "./ConditionEditorTestHome";


const ConditionEditorTestStart = new ViewState(
    "ConditionEditorTestStart",
    (process, scope) => ({

    "to-home": {
        to: ConditionEditorTestHome
    },

}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <Row className="mt-3">
            <Col>
                <h1>Condition-Test Test Start</h1>


                <ButtonToolbar>
                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="to-home"
                    >
                        Test
                    </Button>
                </ButtonToolbar>
        </Col>
        </Row>
    );
});

export default ConditionEditorTestStart;
