import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import BarValuesForm from "./BarForm";


const ExtFilterDetail = props => {

    const { env } = props;
    const { scope } = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <BarValuesForm
                        value={ scope.currentBar }
                    />
                </div>
            </div>
        </React.Fragment>
    )
};

export default fnObserver(ExtFilterDetail)
