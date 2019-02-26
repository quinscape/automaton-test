import React from "react"

import { ButtonToolbar } from "reactstrap"
import { DataGrid, Button, i18n } from "@quinscape/automaton-js"

import { observer as fnObserver } from "mobx-react-lite";

const CRUDList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h1>
                {
                    i18n("Foo List")
                }
            </h1>
            <ButtonToolbar>
                <Button
                    className="btn btn-secondary mr-1"
                    icon="fa-plus-circle"
                    text="New Foo"
                    transition="new-foo"
                />
            </ButtonToolbar>


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
                <DataGrid.Column name="num"/>
                <DataGrid.Column name="owner.login" heading={ i18n("owner") }/>
            </DataGrid>
        </div>
    )
};

export default fnObserver(CRUDList)
