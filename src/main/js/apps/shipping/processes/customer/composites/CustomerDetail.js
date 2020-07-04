import React from "react"
import { observer } from "mobx-react";

import { DataGrid, Button, i18n } from "automaton-js"
import CustomerForm from "./CustomerForm";

@observer
class CustomerDetail extends React.Component {

    render()
    {
        const { env } = this.props;

        const { process } = env;

        return (
            <div>
                <h1>
                    {
                        i18n('Customer Detail')
                    }
                </h1>
                <pre>
                    {
                        JSON.stringify(process.currentObject, null, 4)
                    }
                </pre>
            </div>
        )
    }
}

export default CustomerDetail
