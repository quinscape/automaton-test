import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import WaldoForm from "./WaldoForm";


const WaldoDetail = props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>

            <div className="row">

                <div className="col">
                    <WaldoForm
                        key={ scope.currentWaldo.id }
                        value={ scope.currentWaldo }
                    />
                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(WaldoDetail)
