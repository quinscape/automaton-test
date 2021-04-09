import { Icon } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { Button, i18n, DataGrid } from "@quinscape/automaton-js";


const TreeTestHome = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Tree Test Home")
                }
            </h1>
        </React.Fragment>
    );
};

export default fnObserver(TreeTestHome);
