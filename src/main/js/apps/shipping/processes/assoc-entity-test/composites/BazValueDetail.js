import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import BazValueForm from "./BazValueForm";
import { FormLayout } from "domainql-form";
import BazForm from "./BazForm";


const BazDetail = props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <BazValueForm
                        key={ scope.currentBazValue.id }
                        value={scope.currentBazValue}
                        options={{
                            layout: FormLayout.HORIZONTAL
                        }}
                    />
                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(BazDetail)
