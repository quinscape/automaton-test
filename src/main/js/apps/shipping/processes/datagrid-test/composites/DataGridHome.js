import React from "react"
import { observer } from "mobx-react";

import { ButtonToolbar } from "reactstrap"
import { IQueryGrid as DataGrid , Button, i18n } from "@quinscape/automaton-js"

@observer
class DataGridHome extends React.Component {

    render()
    {
        const { env } = this.props;

        const { scope } = env;

        return (
            <div>
                <h1>
                    {
                        i18n('DataGrid Home')
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
                                    action={ () => alert("Button for " + JSON.stringify(foo)) }
                                />
                            )
                        }
                    </DataGrid.Column>
                    <DataGrid.Column name="name"/>
                    <DataGrid.Column name="num" />
                    <DataGrid.Column name="description" />
                    <DataGrid.Column name="created" />
                    <DataGrid.Column name="type" />
                    <DataGrid.Column name="flag" />
                    <DataGrid.Column name="owner.login" heading={ i18n("owner") } />
                </DataGrid>
            </div>
        )
    }
}

export default DataGridHome
