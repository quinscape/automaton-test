import React from "react"
import cx from "classnames"
import { observer as fnObserver } from "mobx-react-lite";

import { i18n, Button } from "@quinscape/automaton-js"
import FooList from "../../../../../components/FooList";
import Calendar from "react-calendar"
import { ButtonToolbar, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import ReactJson from 'react-json-view'

const QueryTestHome = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <Row className="mt-3">
            <Col>
                <h1>
                    Advanced nested queries.
                </h1>
                <ButtonToolbar>
                    <button
                        type="button"
                        className="btn btn-secondary mr-1"
                        onClick={ () => scope.bazFoos.update() }
                    >
                        Update 'bazFoos'
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary mr-1"
                        onClick={ () => scope.bazesWithValues.update() }
                    >
                        Update 'bazesWithValues'
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary mr-1"
                        onClick={ () => scope.nodes.update() }
                    >
                        Update 'nodes'
                    </button>
                </ButtonToolbar>
                <ReactJson name="bazFoos" src={scope.bazFoos.rows} collapsed={ true }/>
                <ReactJson name="bazesWithValues" src={scope.bazesWithValues.rows} collapsed={ true }/>
                <ReactJson name="nodes" src={scope.nodes.rows} collapsed={ true }/>



            </Col>
        </Row>
    )
};

export default fnObserver(QueryTestHome);
