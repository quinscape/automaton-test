import { React } from "react";
import { ViewState, Button, i18n } from "@quinscape/automaton-js";
import { observer as fnObserver } from "mobx-react-lite";
import MultiLayoutHome from "./MultiLayoutHome";

const MultiLayoutC = new ViewState("MultiLayoutC", () => ({
    "back" : { to: MultiLayoutHome }
}), props => {

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
});

export default MultiLayoutC;