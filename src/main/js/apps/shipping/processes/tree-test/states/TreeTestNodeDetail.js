import React from "react";
import { ViewState, i18n } from "@quinscape/automaton-js";

const TreeTestNodeDetail = new ViewState("TreeTestNodeDetail", (process, scope) => ({}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Node '{0}'", scope.currentName )
                }
            </h1>
        </React.Fragment>
    );
});

export default TreeTestNodeDetail;