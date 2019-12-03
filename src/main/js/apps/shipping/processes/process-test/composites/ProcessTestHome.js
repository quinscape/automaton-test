import { Icon } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { Button, i18n } from "@quinscape/automaton-js"
import JSONData from "../../../../../components/JSONData"


const ProcessTestHome = props => {

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
};

export default fnObserver(ProcessTestHome);
