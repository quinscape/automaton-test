import React from "react"
import { observer } from "mobx-react";

import { Button, i18n, Icon, config } from "@quinscape/automaton-js"
import { UserFormControl, FormConfigProvider, DEFAULT_OPTIONS } from "domainql-form"
import FooForm from "./FooForm";
import { ButtonToolbar, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

@observer
class CRUDDetail extends React.Component {

    state = {
        control: { ... DEFAULT_OPTIONS }
    };

    changeControl = (k,v) => this.setState({
        control: {
            ... this.state.control,
            [k] : v
        }
    });

    render()
    {
        const { env } = this.props;
        const { control } = this.state;

        const { scope } = env;

        return (
            <React.Fragment>
                <h1>
                    {
                        i18n("Foo Detail")
                    }
                </h1>
                <FooForm value={ scope.currentFoo } { ... control } />
                <Card className="mt-4" color="light">
                    <CardHeader>
                        User Form Control
                    </CardHeader>
                    <CardBody>
                        <UserFormControl
                            control={ control }
                            changeControl={ this.changeControl }
                        />
                    </CardBody>
                </Card>


            </React.Fragment>
        )
    }
}


export default CRUDDetail
