import React from "react";
import { ViewState, i18n, Pagination } from "@quinscape/automaton-js";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";

const IteratorTestList = new ViewState("IteratorTestList", (process, scope) => ({}), props => {

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
});

export default IteratorTestList;