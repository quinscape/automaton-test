import React from "react"
import { observer } from "mobx-react";

import { Button, i18n } from "automaton-js"


@observer
class MultiLayoutC extends React.Component {

    render()
    {
        const { env } = this.props;


        return (
            <React.Fragment>
                <h1>
                    {
                        i18n('Multi-Layout C')
                    }
                </h1>

                <Button
                    transition="back"
                    className="mr-1 btn btn-secondary"
                    text="Back"
                />
            </React.Fragment>
        )
    }
}

export default MultiLayoutC
