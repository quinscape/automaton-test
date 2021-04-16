import React from "react";
import { ViewState, i18n, Button } from "@quinscape/automaton-js";
import CounterCard from "../composites/CounterCard";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import BackTestCounter from "./BackTestCounter";

const BackTestHome = new ViewState("BackTestHome", (process, scope) => ({
    "to-counter": {
        to: BackTestCounter
    }
}), props => {

    const {env} = props;

    const {scope} = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">

                    <h1>
                        {
                            i18n("Back Test Home")
                        }
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CounterCard title="currentCounter" value={scope.currentCounter}/>
                </div>
                <div className="col">
                    <CounterCard title="nonVersioned" value={scope.nonVersioned}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ButtonToolbar>
                        <Button className="btn btn-primary mr-1" transition="to-counter">
                            <Icon className="fa-play" />
                            Counter
                        </Button>
                    </ButtonToolbar>
                </div>

            </div>
        </React.Fragment>
    );
});

export default BackTestHome;