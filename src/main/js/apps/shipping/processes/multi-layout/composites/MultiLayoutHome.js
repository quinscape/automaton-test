import React from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { Button, i18n } from "@quinscape/automaton-js"
import JSONData from "../../../../../components/JSONData";


const MultiLayoutHome = props =>  {

    const { env } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n('Multi-Layout Home')
                }
            </h1>

            <Button
                transition="to-a"
                className="mr-1 btn btn-secondary"
                text="To A"
            />
            <Button
                transition="to-b"
                className="mr-1 btn btn-secondary"
                text="To B"
            />
            <Button
                transition="to-c"
                className="mr-1 btn btn-secondary"
                text="To C"
            />

            <JSONData name="processLayout" flatten={ true } value={ env.process.options.layout }/>
        </React.Fragment>
    )
};

export default fnObserver(MultiLayoutHome);
