import React from "react";
import { ViewState, i18n } from "@quinscape/automaton-js";

const TreeTestHome = new ViewState("TreeTestHome", (process, scope) => ({}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Tree Test Home")
                }
            </h1>
        </React.Fragment>
    );
});

export default TreeTestHome;