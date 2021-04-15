import { React } from "react";
import { ViewState, i18n } from "@quinscape/automaton-js";
import { observer as fnObserver } from "mobx-react-lite";

const TreeTestBazValueDetail = new ViewState("TreeTestBazValueDetail", () => ({}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("BazValue '{0}'", scope.currentName )
                }
            </h1>
        </React.Fragment>
    );
});

export default TreeTestBazValueDetail;