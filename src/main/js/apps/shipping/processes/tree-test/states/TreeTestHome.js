import { React } from "react";
import { ViewState, Button, i18n, DataGrid } from "@quinscape/automaton-js";
import { Icon } from "domainql-form";
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";

const TreeTestHome = new ViewState("TreeTestHome", () => ({}), props => {

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
});

export default TreeTestHome;