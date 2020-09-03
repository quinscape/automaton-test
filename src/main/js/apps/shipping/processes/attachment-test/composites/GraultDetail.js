import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import GraultForm from "./GraultForm";


const GraultDetail = props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <GraultForm
                        key={ scope.currentGrault.id }
                        value={ scope.currentGrault }
                    />
                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(GraultDetail)
