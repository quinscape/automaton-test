import React from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { Button, i18n } from "@quinscape/automaton-js"

const MultiLayoutA = props => {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Multi-Layout A')
                }
            </h1>

            <Button
                transition="back"
                className="mr-1 btn btn-secondary"
                text="Back"
            />
        </React.Fragment>
    )
};

export default fnObserver(MultiLayoutA);
