import React from "react";
import { ViewState, i18n, Button } from "@quinscape/automaton-js";
import Home from "./Home";

const TargetB = new ViewState("TargetB", (process, scope) => ({
    "back" : { to : Home }
}), props => {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Target B')
                }
            </h1>

            <Button transition="back" className="mr-1 btn btn-secondary">
                Back
            </Button>
        </React.Fragment>
    );
});

export default TargetB;