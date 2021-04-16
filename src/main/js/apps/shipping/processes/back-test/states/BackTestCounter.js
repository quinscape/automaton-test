import React from "react";
import { ViewState, backToParent, Button } from "@quinscape/automaton-js";
import CounterCard from "../composites/CounterCard";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import BackTestHome from "./BackTestHome";

const BackTestCounter = new ViewState("BackTestCounter", (process, scope) => ({
    "increment": {
        to: BackTestCounter,
        action: t => {
            scope.currentCounter++;
        }
    },

    "decrement": {
        to: BackTestCounter,
        action: t => {
            scope.currentCounter--;
        }
    },

    "increment-nv": {
        to: BackTestCounter,
        action: t => {
            scope.nonVersioned++;
        }
    },

    "decrement-nv": {
        to: BackTestCounter,
        action: t => {
            scope.nonVersioned--;
        }
    },

    "back": {
        action: t => {
            t.back();
        }
    },

    "back-2": {
        action: t => {
            t.back(2);
        }
    },

    "back-fn": {
        action: t => {
            t.back(
                backToParent(t)
            );
        }
    },

    "back-home": {
        to: BackTestHome
    }
}), props => {

    const {env} = props;

    const {scope} = env;

    return (
        <React.Fragment>
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
                    <ButtonToolbar className="m-1">
                        <Button className="btn btn-secondary mr-1" transition="increment">
                            <Icon className="fa-plus-square" />
                            Increment
                        </Button>
                        <Button className="btn btn-secondary mr-1" transition="decrement">
                            <Icon className="fa-minus-square" />
                            Decrement
                        </Button>
                        <Button className="btn btn-secondary mr-1" transition="increment-nv">
                            <Icon className="fa-plus-square" />
                            Increment Non-Versioned
                        </Button>
                        <Button className="btn btn-secondary mr-1" transition="decrement-nv">
                            <Icon className="fa-minus-square" />
                            Decrement Non-Versioned
                        </Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="m-1">
                        <Button className="btn btn-secondary mr-1" transition="back">
                            <Icon className="fa-arrow-left" />
                            Back
                        </Button>
                        <Button className="btn btn-secondary mr-1" transition="back-2">
                            <Icon className="fa-arrow-left" />
                            Back 2
                        </Button>
                        <Button className="btn btn-success mr-1" transition="back-fn">
                            <Icon className="fa-arrow-left" />
                            Back to Parent
                        </Button>
                        <Button className="btn btn-primary mr-1" transition="back-home">
                            <Icon className="fa-arrow-left" />
                            Back to Home
                        </Button>
                    </ButtonToolbar>
                </div>

            </div>
        </React.Fragment>
    );
});

export default BackTestCounter;