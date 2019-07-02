import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, ButtonToolbar, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
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
                        <ListGroupItem className="bg-light">

                            <ListGroupItemHeading>
                                { foo.name}
                                <br/>
                                <small className="text-muted">
                                    Owner: { foo.owner.login }
                                </small>
                            </ListGroupItemHeading>
                            <ListGroupItemText>
                            {
                                foo.description
                            }
                            </ListGroupItemText>
                            <div className="row bg-white">
                                <div className="col">
                                    <button
                                        className="btn btn-link disabled float-right"
                                        disabled={ true}
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        </ListGroupItem>
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
