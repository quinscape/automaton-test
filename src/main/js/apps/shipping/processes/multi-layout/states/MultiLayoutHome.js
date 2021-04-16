import React from "react";
import { ViewState, i18n, Button } from "@quinscape/automaton-js";
import JSONData from "../../../../../components/JSONData";
import MultiLayoutA from "./MultiLayoutA";
import MultiLayoutB from "./MultiLayoutB";
import MultiLayoutC from "./MultiLayoutC";

const MultiLayoutHome = new ViewState("MultiLayoutHome", (process, scope) => ({
    "to-a" : { to: MultiLayoutA },
    "to-b" : { to: MultiLayoutB },
    "to-c" : { to: MultiLayoutC }
}), props =>  {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Multi-Layout Home')
                }
            </h1>

            <Button transition="to-a" className="mr-1 btn btn-secondary">
                To A
            </Button>
            <Button transition="to-b" className="mr-1 btn btn-secondary">
                To B
            </Button>
            <Button transition="to-c" className="mr-1 btn btn-secondary">
                To C
            </Button>

            <JSONData name="processLayout" flatten={ true } value={ env.process.options.layout }/>
        </React.Fragment>
    );
});

export default MultiLayoutHome;