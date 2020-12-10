import { Form, Icon } from "domainql-form"
import React from "react"
import cx from "classnames"
import { observer as fnObserver } from "mobx-react-lite";

import { Button, i18n, InteractiveQueryEditor } from "@quinscape/automaton-js"
import { ButtonToolbar, Col, Row } from "reactstrap";


const IQEditorHome = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <>
            <Row className="mt-3">
                <Col>
                    <ButtonToolbar>
                        <Button
                            className={ cx("btn btn-secondary") }
                            transition="store"
                            tooltip="Example for store transition"
                        >
                            <Icon className="fa-vial mr-1" />
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
                        definition={ scope.definition }
                    />
                </Col>
            </Row>
        </>
    );
};

export default fnObserver(IQEditorHome);

