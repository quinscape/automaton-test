import React from "react"

import { ButtonToolbar } from "reactstrap"
import { Button, i18n } from "@quinscape/automaton-js"

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
                        <Button
                            className="btn btn-secondary mr-1"
                            icon="fa-plus-square"
                            text="Increment"
                            transition="increment"
                        />
                        <Button
                            className="btn btn-secondary mr-1"
                            icon="fa-minus-square"
                            text="Decrement"
                            transition="decrement"
                        />
                        <Button
                            className="btn btn-secondary mr-1"
                            icon="fa-plus-square"
                            text="Increment Non-Versioned"
                            transition="increment-nv"
                        />
                        <Button
                            className="btn btn-secondary mr-1"
                            icon="fa-minus-square"
                            text="Decrement Non-Versioned"
                            transition="decrement-nv"
                        />
                    </ButtonToolbar>
                    <ButtonToolbar className="m-1">
                        <Button
                            className="btn btn-secondary mr-1"
                            icon="fa-arrow-left"
                            text="Back"
                            transition="back"
                        />
                        <Button
                            className="btn btn-secondary mr-1"
                            icon="fa-arrow-left"
                            text="Back 2"
                            transition="back-2"
                        />
                        <Button
                            className="btn btn-primary mr-1"
                            icon="fa-arrow-left"
                            text="Back to Home"
                            transition="back-home"
                        />
                    </ButtonToolbar>
                </div>

            </div>
        </React.Fragment>
    )
};

export default fnObserver(BackTestCounter)
