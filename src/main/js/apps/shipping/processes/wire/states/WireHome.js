import React from "react";
import { ViewState, config, i18n, Button } from "@quinscape/automaton-js";
import cx from "classnames";
import { Row, Col, ButtonToolbar, Card, CardHeader, CardBody } from "reactstrap";
import FooList from "../../../../../components/FooList";
import Calendar from "react-calendar";
import { Icon } from "domainql-form";

const WireHome = new ViewState("WireHome", (process, scope) => ({
    "test-target": {
        action: t =>
            WireTestQuery.execute(
                {
                target: {
                    ...t.context,
                    flag: true,
                    ownerId:
                        config.auth.id || ""
                },
                count: 123
            })
            .then(
                ({ wireTestMutation }) => scope.updateMutationResult(wireTestMutation),
                err => scope.updateMutationResult(mutationError(err))
            )
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <Row className="mt-3">
            <Col>
                <h1>
                    {
                        i18n("Injected Values")
                    }
                </h1>
                <dl>
                    <dt>{ "complex ( count " + scope.complex.rowCount + " )" } </dt>
                    <dd>
                        <FooList ob={ scope } path="complex.rows"/>
                    </dd>
                    <dt>scalar</dt>
                    <dd>
                        <Calendar className="shadow p-3 mb-5 bg-white rounded" value={ scope.scalar }/>
                    </dd>
                    <dt>list</dt>
                    <dd>
                        <ul>
                            {
                                scope.list.map(n => <li key={ n }>{ n }</li>)
                            }
                        </ul>
                    </dd>
                    <dt>complexList</dt>
                    <dd>
                        <FooList ob={ scope } path="complexList"/>
                    </dd>
                </dl>
            </Col>
            <Col>
                <ButtonToolbar>
                    <Button
                        className={ cx("btn", scope.mutationResult ? scope.mutationResult.successful ? "btn-success" : "btn-danger" : "btn-primary") }
                        transition="test-target"
                        context={ scope.complexList[0] }>
                        <Icon className="fa-check" />
                        Test Mutation
                    </Button>
                </ButtonToolbar>
                {
                    scope.mutationResult && (

                        <Card className="mt-2" color="secondary">
                            <CardHeader className={ scope.mutationResult.successful ? "bg-success" : "bg-danger" }>
                                Mutation Result
                            </CardHeader>
                            <CardBody>
                                <dl>
                                    <dt>id</dt>
                                    <dd>
                                        {
                                            String(scope.mutationResult.id)
                                        }
                                    </dd>
                                    <dt>created</dt>
                                    <dd>
                                        {
                                            String(scope.mutationResult.created.toISOString())
                                        }</dd>
                                    <dt>check</dt>
                                    <dd>
                                        {
                                            String(scope.mutationResult.check)
                                        }
                                    </dd>
                                </dl>

                            </CardBody>
                        </Card>
                    )
                }
            </Col>
        </Row>
    );
});

export default WireHome;