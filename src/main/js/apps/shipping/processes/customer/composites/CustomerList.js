import { Icon } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";

import { Button, DataGrid, i18n } from "@quinscape/automaton-js"


const CustomerList = props => {

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
};

export default fnObserver(CustomerList);
