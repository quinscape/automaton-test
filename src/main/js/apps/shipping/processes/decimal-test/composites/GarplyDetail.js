import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import GarplyForm from "./GarplyForm";


const GarplyDetail = props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <GarplyForm
                        key={ scope.currentGarply.id }
                        value={ scope.currentGarply }
                    />
                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(GarplyDetail)
