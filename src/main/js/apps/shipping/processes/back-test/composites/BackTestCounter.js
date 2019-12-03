import { Icon } from "domainql-form"
import React from "react"

import { ButtonToolbar } from "reactstrap"
import { Button } from "@quinscape/automaton-js"

import { observer as fnObserver } from "mobx-react-lite";
import CounterCard from "./CounterCard";


const BackTestCounter = props => {

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
};

export default fnObserver(BackTestCounter)
