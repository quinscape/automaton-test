import React from "react";
import { ViewState, i18n, Button } from "@quinscape/automaton-js";
import { runInAction } from "mobx";
import { Icon } from "domainql-form";
import JSONData from "../../../../../components/JSONData";

const ProcessTestHome = new ViewState("ProcessTestHome", (process, scope) => ({
    "open-sub" : {
        to: ProcessTestHome,
        action: t => {

            return (
                process.runSubProcess("sub-process-example", t.context)
                .then(
                    result => result && runInAction( () => scope.currentOrder = result)
                )
            );
        }
    },
    "open-sub-small" : {
        to: ProcessTestHome,
        action: t => {

            return (
                process.runSubProcess(
                    "sub-process-example",
                    t.context,
                    {
                        props: {
                            size: "sm"
                        }
                    }
                )
                .then(
                    result => result && runInAction( () => scope.currentOrder = result)
                )
            );
        }
    },
    "open-sub-big" : {
        to: ProcessTestHome,
        action: t => {

            return (
                process.runSubProcess(
                    "sub-process-example",
                    t.context,
                    {
                        props: {
                            size: "lg",
                            style: {
                                maxWidth: 1600,
                                width: "80%"
                            }
                        }
                    }
                )
                .then(
                    result => result && runInAction( () => scope.currentOrder = result)
                )
            );
        }
    },

    "clear" : {
        to: ProcessTestHome,
        action: t => {
            scope.currentOrder = null
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;


    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Process-Tests')
                }
            </h1>

            <Button transition="open-sub" className="mr-1 btn btn-secondary">
                <Icon className="fa-subway" />
                Open Sub-Process
            </Button>

            <Button transition="open-sub-small" className="mr-1 btn btn-secondary">
                <Icon className="fa-subway" />
                Open Sub-Process (Small)
            </Button>

            <Button transition="open-sub-big" className="mr-1 btn btn-secondary">
                <Icon className="fa-subway" />
                Open Sub-Process(Big)
            </Button>

            <Button transition="clear" className="mr-1 btn btn-secondary">
                <Icon className="fa-minus-circle" />
                Clear
            </Button>



            <JSONData
                name="chosen"
                value={ scope.currentOrder }
                maxHeight={ 20 }
            />


        </React.Fragment>
    );
});

export default ProcessTestHome;
