import React from "react"
import { observer } from "mobx-react";

import { DataGrid, Button, i18n } from "automaton-js"

@observer
class CRUDList extends React.Component {

    render()
    {
        const { env } = this.props;

        const { scope } = env;

        return (
            <div>
                <h1>
                    {
                        i18n('Foo List')
                    }
                </h1>
                <DataGrid
                    value={ scope.foos }
                >
                    <DataGrid.Column
                        heading={ i18n("Action") }
                    >
                        {
                            foo => (
                                <Button
                                    className="btn btn-secondary"
                                    icon="fa-edit"
                                    text="Detail"
                                    transition="to-detail"
                                    context={ foo }
                                />
                            )
                        }
                    </DataGrid.Column>
                    <DataGrid.Column name="name"/>
                    <DataGrid.Column name="num" />
                    <DataGrid.Column name="owner.login" heading={ i18n("owner") } />
                </DataGrid>
            </div>
        )
    }
}

export default CRUDList
