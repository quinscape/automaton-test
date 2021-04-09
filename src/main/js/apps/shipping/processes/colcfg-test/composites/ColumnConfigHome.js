import React, { useCallback, useState } from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, i18n, DataGrid } from "@quinscape/automaton-js";

import { ButtonToolbar } from "reactstrap"
import { Icon } from "domainql-form";
import GridConfigModal from "../../../../../components/GridConfigModal";

function toggleValue(open)
{
    return !open;
}

const ColumnConfigHome = props => {

    const { env } = props;

    const [ configOpen, setConfigOpen ] = useState();

    const toggle = useCallback(
        () => setConfigOpen(toggleValue),
        []
    );

    const { scope } = env;

    const id = "configurable-foo-grid";

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("DataGrid (Configurable) Home")
                }
            </h1>

            <ButtonToolbar>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={ () => setConfigOpen(true) }
                >
                    <Icon className="fa-cog mr-1"/>
                    Configure
                </button>

            </ButtonToolbar>

            <DataGrid
                id={ id }
                value={ scope.foos }
            >
                <DataGrid.Column heading="Action">
                    {
                        row => (
                            <button
                                className="btn btn-secondary disabled"
                                disabled={ true}
                            >
                                Button
                            </button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="num" filter="eq"/>
                <DataGrid.Column name="description" filter="containsIgnoreCase"/>
                <DataGrid.Column name="type"/>
                <DataGrid.Column name="flag" filter="eq"/>
                <DataGrid.Column name="owner.login" filter="containsIgnoreCase" heading={ i18n("owner") }/>
            </DataGrid>

            <GridConfigModal
                gridId={ id }
                iQuery={ scope.foos }
                isOpen={ configOpen }
                toggle={ toggle }
                requiredColumns={ [ "id", "name"]}
            />

        </React.Fragment>
    )
};

export default fnObserver(ColumnConfigHome);
