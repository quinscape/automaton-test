import React from "react"
import { observer } from "mobx-react";

import { Button, i18n } from "@quinscape/automaton-js"
import JSONData from "../../../../../components/JSONData";


@observer
class MultiLayoutHome extends React.Component {

    render()
    {
        const { env } = this.props;


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
    }
}

export default MultiLayoutHome
