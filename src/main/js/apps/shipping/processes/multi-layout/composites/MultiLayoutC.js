import React from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { Button, i18n } from "@quinscape/automaton-js"


const MultiLayoutC = props => {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Multi-Layout C')
                }
            </h1>

            <Button transition="back" className="mr-1 btn btn-secondary">
                Back
            </Button>
        </React.Fragment>
    );
};

export default fnObserver(MultiLayoutC);
