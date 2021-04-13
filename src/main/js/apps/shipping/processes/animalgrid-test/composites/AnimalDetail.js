import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import NodeForm from "./AnimalForm";


const AnimalDetail = props => {

    const {env} = props;
    const {scope} = env;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <NodeForm
                        value={scope.currentNode}
                    />
                </div>
            </div>
        </React.Fragment>
    )
};

export default fnObserver(AnimalDetail)
