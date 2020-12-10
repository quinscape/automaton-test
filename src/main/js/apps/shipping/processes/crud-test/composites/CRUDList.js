import { Icon } from "domainql-form"
import React from "react"

import { ButtonToolbar } from "reactstrap"
import { Button, DataGrid, i18n } from "@quinscape/automaton-js"

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
                <Button className="btn btn-secondary mr-1" transition="new-foo">
                    <Icon className="fa-plus-circle" />
                    New Foo
                </Button>
            </ButtonToolbar>


            <DataGrid
                value={ scope.foos }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        foo => (
                            <Button className="btn btn-secondary" transition="to-detail" context={ foo }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name"/>
                <DataGrid.Column name="num"/>
                <DataGrid.Column name="owner.login" heading={ i18n("owner") }/>
                <DataGrid.Column name="created"/>
            </DataGrid>
        </div>
    );
};

export default fnObserver(CRUDList)
