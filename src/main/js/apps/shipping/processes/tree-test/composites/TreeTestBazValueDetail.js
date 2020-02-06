import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { i18n } from "@quinscape/automaton-js"


const TreeTestBazValueDetail = props => {

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
};

export default fnObserver(TreeTestBazValueDetail);
