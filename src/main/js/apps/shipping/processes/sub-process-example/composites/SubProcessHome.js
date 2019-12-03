import { Icon } from "domainql-form"
import React from "react"

import { observer as fnObserver } from "mobx-react-lite";

import { Button, DataGrid, i18n } from "@quinscape/automaton-js"


const SubProcessHome = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h1>SubProcessHome</h1>
            <div className="btn-toolbar">
                <Button className="btn btn-danger" transition="close">
                    <Icon className="fa-close" />
                    Close
                </Button>
            </div>

            <DataGrid
                id="iquery-test"
                value={ scope.foos }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        order => {
                            return (
                                <Button className="btn btn-success" transition="choose" context={ order }>
                                    <Icon className="fa-clipboard-check" />
                                    Choose
                                </Button>
                            );
                        }
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="description" filter="containsIgnoreCase"/>
                <DataGrid.Column name="flag" filter="eq"/>
                <DataGrid.Column name="owner.login" filter="containsIgnoreCase" heading={ i18n("owner") }/>
            </DataGrid>
        </div>
    );
}

export default fnObserver(SubProcessHome)
