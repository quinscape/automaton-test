import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, ButtonToolbar, ListGroup } from "reactstrap";
import { i18n, Pagination } from "@quinscape/automaton-js"

const IteratorTestList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Iterator Test")
                }
            </h1>

            <ListGroup>
                {
                    scope.foos.rows.map(foo => (
                        <React.Fragment>

                            <h3>
                                { foo.name}
                                <br/>
                                <small className="text-muted">
                                    Owner: { foo.owner.login }
                                </small>
                            </h3>
                            <p>
                            {
                                foo.description
                            }
                            </p>
                            <hr/>
                            <div className="row">
                                <div className="col">
                                    <button
                                        className="btn btn-success disabled float-right"
                                        disabled={ true}
                                    >
                                        Button
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
            </ListGroup>
            <Pagination
                iQuery={ scope.foos }
            />
        </React.Fragment>
    )
};

export default fnObserver(IteratorTestList);
