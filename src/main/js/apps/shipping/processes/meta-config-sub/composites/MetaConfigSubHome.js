import { Icon } from "domainql-form"
import React from "react"

import { observer as fnObserver } from "mobx-react-lite";

import { Button } from "@quinscape/automaton-js"
import JSONData from "../../../../../components/JSONData";


const MetaConfigSubHome = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h3>
                Meta-Config<br/>
                <small className="text-muted">
                    Example for a meta-config subprocess invoked with &lt;FieldMetaButton/&gt;
                </small>
            </h3>
            
            <div className="btn-toolbar">
                <Button className="btn btn-danger" transition="close">
                    <Icon className="fa-close" />
                    Close
                </Button>
            </div>

            <JSONData name="Meta Config Location" value={ scope.location } />

        </div>
    );
}

export default fnObserver(MetaConfigSubHome)
