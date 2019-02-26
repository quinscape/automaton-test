import React from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { Button, i18n } from "@quinscape/automaton-js"

const TargetC = props => {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Target C')
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

export default fnObserver(TargetC);
