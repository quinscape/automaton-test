import React from "react";
import { ViewState, i18n, Button } from "@quinscape/automaton-js";
import MultiLayoutHome from "./MultiLayoutHome";

const MultiLayoutB = new ViewState("MultiLayoutB", (process, scope) => ({
    "back" : { to: MultiLayoutHome }
}), props => {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Multi-Layout B')
                }
            </h1>

            <Button transition="back" className="mr-1 btn btn-secondary">
                Back
            </Button>
        </React.Fragment>
    );
});

export default MultiLayoutB;