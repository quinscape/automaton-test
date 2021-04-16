import React from "react";
import { ViewState, i18n, Button, DataGrid } from "@quinscape/automaton-js";
import { Icon } from "domainql-form";

const SubProcessHome = new ViewState("SubProcessHome", (process, scope) => ({
    "choose" : {
        action: t => process.endSubProcess(t.context)
    },

    "close" : {
        action: t => process.endSubProcess(null)
    }
}), props => {

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
});

export default SubProcessHome;