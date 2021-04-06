import React from "react"
import { toJS } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import QuxMainForm from "./QuxMainForm";
import { FormLayout } from "domainql-form";


const FKTestDetail = props => {

    const {env} = props;
    const {scope} = env;


    //  console.log("CURRENT", toJS(scope.currentQux) )

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <QuxMainForm
                        value={
                            scope.currentQux
                        }
                    />
                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(FKTestDetail)
