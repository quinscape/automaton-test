import React from "react"

import { Card, CardBody, CardHeader } from "reactstrap"

import { observer as fnObserver } from "mobx-react-lite";

const CounterCard = props => {

    const { title, value } = props;

    return (
        <Card>
            <CardHeader>
                { title }
            </CardHeader>
            <CardBody>
                { value }
            </CardBody>
        </Card>
    )
};

export default fnObserver(CounterCard)
