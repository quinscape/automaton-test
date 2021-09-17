import React from "react";
import { ViewState, config, i18n, Button, promiseUI } from "@quinscape/automaton-js";
import cx from "classnames";
import { Row, Col, ButtonToolbar, Card, CardHeader, CardBody } from "reactstrap";
import FooList from "../../../../../components/FooList";
import Calendar from "react-calendar";
import { Form, Field, Icon } from "domainql-form";
import Q_ResultInfo from "../queries/Q_ResultInfo";
import Q_ResultError from "../queries/Q_ResultError";
import Q_ResultWarning from "../queries/Q_ResultWarning";
import { toJS } from "mobx";
import Q_FiftyFifty from "../queries/Q_FiftyFifty";
import { toast } from "react-toastify";
import Q_MultipleResults from "../queries/Q_MultipleResults";
import Q_ResultSilent from "../queries/Q_ResultSilent";

const PromiseUITestHome = new ViewState("PromiseUITestHome", (process, scope) => ({

    "test-info": {
        action: t => {
              return promiseUI(
                    Q_ResultInfo.execute({ delay: scope.delay })
                  )
                  .then(({resultInfo}) => {
                      console.info("in transition:", toJS(resultInfo))
                  }
              )
        }
    },

    "test-warning": {
        action: t => {
              return promiseUI(
                  Q_ResultWarning.execute({ delay: scope.delay })
              )
                  .then(({resultWarning}) => {
                      console.warn("warning in transition:", resultWarning)
                  }
              )
        }
    },

    "test-error": {
        action: t => {
              return promiseUI(
                  Q_ResultError.execute({ delay: scope.delay })
              )
                  .then(
                      () => {
                          // we never get here
                      },
                      err => console.error("resultError rejected", err)
              )
        }
    },

    "test-multiple": {
        action: t => {
              return promiseUI(
                  Q_MultipleResults.execute({ delay: scope.delay })
              )
              .then(({a, b, c}) => {
                  console.log("MULTIPLE RESULTS", toJS(a.payload), b.payload, c.payload)
              })
        }
    },

    "test-silent": {
        action: t => {
              return promiseUI(
                  Q_ResultSilent.execute({ delay: scope.delay })
              )
              .then(({a, b, c}) => {
                  console.log("MULTIPLE RESULTS", toJS(a.payload), b.payload, c.payload)
              })
        }
    },

    "test-non-result": {
        action: t => {
              return promiseUI(
                  Q_FiftyFifty.execute({ delay: scope.delay }),
                  {
                      loadingText: "Flipping Coin"
                  }
              )
              .then(({fiftyFifty}) => {
                  console.log("RESULT", fiftyFifty)
              })
        }
    },

}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <Row className="mt-3">
            <Col>
                <ButtonToolbar>
                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test-info"
                    >
                        <Icon className="fa-info text-info mr-1" />
                        Info Test
                    </Button>
                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test-warning"
                    >
                        <Icon className="fa-exclamation text-warning mr-1" />
                        Warning Test
                    </Button>
                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test-error"
                    >
                        <Icon className="fa-exclamation text-danger mr-1" />
                        Error Test
                    </Button>

                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test-multiple"
                    >
                        Multi
                    </Button>

                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test-silent"
                    >
                        Result 'SILENT'
                    </Button>

                    <Button
                        className={ cx("btn btn-secondary mr-1") }
                        transition="test-non-result"
                    >
                        50/50
                    </Button>
                    <Form
                        value={ scope }
                    >
                        <Field name="delay" type="Boolean"/>
                    </Form>
                </ButtonToolbar>
            </Col>
        </Row>
    );
});

export default PromiseUITestHome;
