import React from "react"
import { toJS } from "mobx";
import { observer } from "mobx-react";

import { DataGrid, Button, i18n } from "automaton-js"
import JSONData from "../../../../../components/JSONData"

@observer
class ProcessTestHome extends React.Component {

    render()
    {
        const { env } = this.props;

        const { process } = env;


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
                    transition="clear"
                    className="mr-1 btn btn-secondary"
                    icon="fa-minus-circle"
                    text="Clear"
                />



                <JSONData
                    name="chosen"
                    value={ process.currentObject }
                    maxHeight={ 20 }
                />


            </React.Fragment>
        )
    }
}

export default ProcessTestHome
