import { React } from "react";
import { ViewState, i18n } from "@quinscape/automaton-js";
import { observer as fnObserver } from "mobx-react-lite";

const TreeTestNodeDetail = new ViewState("TreeTestNodeDetail", () => ({}), props => {

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