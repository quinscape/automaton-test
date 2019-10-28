import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar, Col, Row } from "reactstrap";
import ReactJson from "react-json-view"

const QueryTestHome = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <Row className="mt-3">
            <Col>
                <h1>
                    Advanced nested queries.
                </h1>
                <hr className="m-6"/>
                <div id="bazFoos">
                    <h2>
                        bazFoos
                    </h2>
                    <ButtonToolbar>
                        <button
                            type="button"
                            className="btn btn-secondary mr-1"
                            onClick={ () => scope.bazFoos.update() }
                        >
                            Rerun 'bazFoos' query
                        </button>
                        <a
                            className="btn btn-secondary mr-1"
                            href="#bazesWithValues"
                        >
                            Scroll to bazesWithValues
                        </a>
                        <a
                            className="btn btn-secondary mr-1"
                            href="#nodes"
                        >
                            Scroll to nodes
                        </a>
                    </ButtonToolbar>
                    <div className="mt-3">
                                                <pre>
                            {
                                scope.bazFoos._query.query
                            }
                        </pre>

                        <ReactJson name="bazFoos" theme="flat" src={scope.bazFoos.rows} />
                    </div>
                </div>
                <hr className="m-6"/>
                <div id="bazesWithValues">
                    <h2>
                        bazesWithValues
                    </h2>
                    <ButtonToolbar>
                        <button
                            type="button"
                            className="btn btn-secondary mr-1"
                            onClick={ () => scope.bazesWithValues.update() }
                        >
                            Rerun 'bazesWithValues' query
                        </button>
                        <a
                            className="btn btn-secondary mr-1"
                            href="#bazFoos"
                        >
                            Scroll to foo (top)
                        </a>
                        <a
                            className="btn btn-secondary mr-1"
                            href="#nodes"
                        >
                            Scroll to nodes
                        </a>
                    </ButtonToolbar>
                    <div className="mt-3">
                        <pre>
                            {
                                scope.bazesWithValues._query.query
                            }
                        </pre>
                        <ReactJson name="bazesWithValues" theme="flat" src={scope.bazesWithValues.rows}/>
                    </div>
                </div>

                <hr className="m-6"/>
                <div id="nodes">
                    <h2>
                        nodes (recursive)
                    </h2>
                    <ButtonToolbar>
                        <button
                            type="button"
                            className="btn btn-secondary mr-1"
                            onClick={ () => scope.nodes.update() }
                        >
                            Rerun 'nodes' query
                        </button>
                        <a
                            className="btn btn-secondary mr-1"
                            href="#bazFoos"
                        >
                            Scroll to foo (top)
                        </a>
                        <a
                            className="btn btn-secondary mr-1"
                            href="#bazesWithValues"
                        >
                            Scroll to bazesWithValues
                        </a>
                    </ButtonToolbar>
                    <div className="mt-3">
                        <pre>
                            {
                                scope.nodes._query.query
                            }
                        </pre>
                        <ReactJson name="nodes" theme="flat" src={scope.nodes.rows}/>
                    </div>
                </div>
            </Col>

        </Row>
    )
};

export default fnObserver(QueryTestHome);
