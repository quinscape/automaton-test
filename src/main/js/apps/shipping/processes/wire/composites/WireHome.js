import React from "react"
import cx from "classnames"
import { observer } from "mobx-react";

import { i18n, Button } from "@quinscape/automaton-js"
import FooList from "../../../../../components/FooList";
import Calendar from "react-calendar"
import { ButtonToolbar, Row, Col, Card, CardHeader, CardBody } from "reactstrap";


@observer
class WireHome extends React.Component {

    render()
    {
        const {env} = this.props;

        const {scope} = env;

        return (
            <Row className="mt-3">
                <Col>
                <h1>
                    {
                        i18n("Injected Values")
                    }
                </h1>
                <dl>
                    <dt>{"complex ( count " + scope.complex.rowCount + " )"} </dt>
                    <dd>
                        <FooList ob={scope} path="complex.rows"/>
                    </dd>
                    <dt>scalar</dt>
                    <dd>
                        <Calendar className="shadow p-3 mb-5 bg-white rounded" value={scope.scalar}/>
                    </dd>
                    <dt>list</dt>
                    <dd>
                        <ul>
                            {
                                scope.list.map(n => <li key={n}>{n}</li>)
                            }
                        </ul>
                    </dd>
                    <dt>complexList</dt>
                    <dd>
                        <FooList ob={scope} path="complexList"/>
                    </dd>
                </dl>
                </Col>
                <Col>
                <ButtonToolbar>
                    <Button
                        className={ cx("btn", scope.mutationResult ? scope.mutationResult.successful ? "btn-success" : "btn-danger" : "btn-primary") }
                        icon="fa-check"
                        text="Test Mutation"
                        transition="test-target"
                        context={scope.complexList[0]}
                    />
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
        )
    }
}


export default WireHome
