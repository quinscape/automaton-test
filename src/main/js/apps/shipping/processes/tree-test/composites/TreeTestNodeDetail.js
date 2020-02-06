import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { i18n } from "@quinscape/automaton-js"


const TreeTestNodeDetail = props => {

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
};

export default fnObserver(TreeTestNodeDetail);
