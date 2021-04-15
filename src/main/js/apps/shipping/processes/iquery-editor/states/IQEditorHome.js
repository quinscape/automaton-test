import { React } from "react";
import { ViewState, InteractiveQueryEditor, Button, i18n } from "@quinscape/automaton-js";
import { toJS } from "mobx";
import { Form, Icon } from "domainql-form";
import cx from "classnames";
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar, Col, Row } from "reactstrap";

const IQEditorHome = new ViewState("IQEditorHome", () => ({
    "store": {
        action: t => {

            // retrieve current state as "InteractiveQueryDefinition" instance
            const def = InteractiveQueryEditor.getInteractiveQueryDefinition("my-editor");

            // XXX: we just log here, replace with actual store
            console.log("STORE", toJS(def));
        }
    }
}), props => {

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
});

export default IQEditorHome;