import { React } from "react";
import { ViewState, Button, i18n } from "@quinscape/automaton-js";
import { action, runInAction } from "mobx";
import { Icon } from "domainql-form";
import { observer as fnObserver } from "mobx-react-lite";
import JSONData from "../../../../../components/JSONData";
import ProcessTestHome from "./ProcessTestHome";

const ProcessTestHome = new ViewState("ProcessTestHome", () => ({
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

    "open-sub2" : {
        to: ProcessTestHome,
        action: t => {

            return (
                process.runSubProcess("customer", t.context)
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

            <Button transition="open-sub2" className="mr-1 btn btn-secondary">
                <Icon className="fa-subway" />
                Open Customer as Sub
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