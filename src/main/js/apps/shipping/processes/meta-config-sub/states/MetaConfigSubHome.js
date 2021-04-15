import { React } from "react";
import { ViewState, Button } from "@quinscape/automaton-js";
import { action } from "mobx";
import { Icon } from "domainql-form";
import { observer as fnObserver } from "mobx-react-lite";
import JSONData from "../../../../../components/JSONData";

const MetaConfigSubHome = new ViewState("MetaConfigSubHome", () => ({
    "close" : {
        action: t => process.endSubProcess(null)
    }
}), props => {

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
});

export default MetaConfigSubHome;