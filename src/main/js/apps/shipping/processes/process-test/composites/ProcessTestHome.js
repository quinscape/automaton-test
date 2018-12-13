import React from "react"
import { toJS } from "mobx";
import { observer } from "mobx-react";

import { DataGrid, Button, i18n } from "@quinscape/automaton-js"
import JSONData from "../../../../../components/JSONData"

@observer
class ProcessTestHome extends React.Component {

    render()
    {
        const { env } = this.props;

        const { scope } = env;


        return (
            <React.Fragment>
                <h1>
                    {
                        i18n('Process-Tests')
                    }
                </h1>

                <Button
                    transition="open-sub"
                    className="mr-1 btn btn-secondary"
                    icon="fa-subway"
                    text="Open Sub-Process"
                />

                <Button
                    transition="open-sub2"
                    className="mr-1 btn btn-secondary"
                    icon="fa-subway"
                    text="Open Customer as Sub"
                />

                <Button
                    transition="clear"
                    className="mr-1 btn btn-secondary"
                    icon="fa-minus-circle"
                    text="Clear"
                />



                <JSONData
                    name="chosen"
                    value={ scope.currentOrder }
                    maxHeight={ 20 }
                />


            </React.Fragment>
        )
    }
}

export default ProcessTestHome
