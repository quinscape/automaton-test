import React from "react"
import { observer } from "mobx-react";

import { Button, i18n, Icon } from "automaton-js"
import FooForm from "./FooForm";
import { ButtonToolbar } from "reactstrap";


@observer
class FooDetail extends React.Component {

    render()
    {
        const {env} = this.props;

        const {scope} = env;

        return (
            <React.Fragment>
                <h1>
                    {
                        i18n("Customer Detail")
                    }
                </h1>
                <FooForm value={scope.currentFoo} onSubmit={ root => scope.updateCurrent(root)}/>
                <ButtonToolbar>
                    <Button
                        className="btn btn-primary"
                    >
                        <Icon className="fa-save mr-1"/>
                        Save
                    </Button>
                    <Button
                        className="btn btn-secondary"
                    >
                        <Icon className="fa-save mr-1"/>
                        Cancel
                    </Button>

                </ButtonToolbar>
            </React.Fragment>
        )
    }
}


export default FooDetail
