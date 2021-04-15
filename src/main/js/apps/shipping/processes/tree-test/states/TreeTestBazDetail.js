import { React } from "react";
import { ViewState, i18n } from "@quinscape/automaton-js";
import { observer as fnObserver } from "mobx-react-lite";

const TreeTestBazDetail = new ViewState("TreeTestBazDetail", () => ({}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Baz '{0}'", scope.currentName )
                }
            </h1>
        </React.Fragment>
    );
});

export default TreeTestBazDetail;