import React from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { i18n } from "@quinscape/automaton-js"


const Home = props => {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Multi-Layout Home")
                }
            </h1>

            <p className="text-info">
                <i className="fas fa-info-circle"/> Use input parameters to choose sub view.
            </p>
        </React.Fragment>
    )
}

export default fnObserver(Home);
