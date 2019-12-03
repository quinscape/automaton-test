import { Icon } from "domainql-form"
import React from "react"

import { ButtonToolbar } from "reactstrap"
import { Button, i18n } from "@quinscape/automaton-js"

import { observer as fnObserver } from "mobx-react-lite";
import CounterCard from "./CounterCard";


const BackTestHome = props => {

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
};

export default fnObserver(BackTestHome)
