import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import MetaConfigForm from "./MetaConfigForm";


const MetaConfigDetail = props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <MetaConfigForm
                        key={ scope.currentMetaConfig.id }
                        value={ scope.currentMetaConfig }
                    />
                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(MetaConfigDetail)
