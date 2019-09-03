import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { FormLayout } from "domainql-form";
import BazForm from "./BazForm";
import BazValueForm from "./BazValueForm";


const BazDetail = props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <BazForm
                        key={ scope.currentBaz.id }
                        value={scope.currentBaz}
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
