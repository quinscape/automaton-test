import React from "react";
import { ViewState, config, i18n, Button, DataGrid } from "@quinscape/automaton-js";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import CRUDDetail from "./CRUDDetail";

const CRUDList = new ViewState("CRUDList", (process, scope) => ({
    "new-foo": {
        to: CRUDDetail,
        action: t =>
            CreateFooMutation.execute({
                name: "Unnamed Foo"
            })
            .then(
                ({ createFoo }) =>
                    scope.updateCurrent(createFoo)
            )

    },

    "to-detail": {
        to: CRUDDetail,
        action: t => {
            scope.currentFoo = config.inputSchema.clone(t.context);
        }
    }
}), props => {

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
});

export default CRUDList;