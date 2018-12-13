import React from "react"
import { observer } from "mobx-react";

import { i18n } from "@quinscape/automaton-js"


@observer
class Home extends React.Component {

    render()
    {
        const { env } = this.props;

        return (
            <React.Fragment>
                <h1>
                    {
                        i18n('Multi-Layout Home')
                    }
                </h1>

                <p className="text-info">
                    <i className="fas fa-info-circle"/> Use input parameters to choose sub view.
                </p>
            </React.Fragment>
        )
    }
}

export default Home
