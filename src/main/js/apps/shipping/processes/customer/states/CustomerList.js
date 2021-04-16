import React from "react";
import { ViewState, i18n, DataGrid, Button } from "@quinscape/automaton-js";
import { Icon } from "domainql-form";
import CustomerDetail from "./CustomerDetail";

const CustomerList = new ViewState("CustomerList", (process, scope) => ({
    "to-detail": {
        to: CustomerDetail,
        action: t => {
            scope.currentCustomer = t.context;
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h1>
                {
                    i18n("Customer List")
                }
            </h1>
            <DataGrid
                value={ scope.customers }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        customer => (
                            <Button className="btn btn-secondary" transition="to-detail" context={ customer }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="number"/>
                <DataGrid.Column name="name" heading={ i18n("Customer:fullName") }>
                    {
                        customer => customer.salutation ? customer.salutation + " " + customer.name : customer.name
                    }
                </DataGrid.Column>
            </DataGrid>
        </div>
    );
});

export default CustomerList;