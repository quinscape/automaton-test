import React from "react"
import { toJS } from "mobx";
import { observer } from "mobx-react";

import { DataGrid, Button, i18n } from "automaton-js"

@observer
class SubProcessHome extends React.Component {

    render()
    {
        const { env } = this.props;

        const { scope } = env;

        return (
            <div>
                <h1>SubProcessHome</h1>
                <div className="btn-toolbar">
                    <Button
                        className="btn btn-danger"
                        icon="fa-close"
                        text="Close"
                        transition="close"
                    />
                </div>
                <DataGrid
                    value={ scope.orders }
                >
                    <DataGrid.Column name="number" heading={ i18n("Order:number") }/>
                    <DataGrid.Column name="shippingType" heading={ i18n("Customer:shippingType") }>
                        {
                            order => order.shippingType.name
                        }
                    </DataGrid.Column>
                    <DataGrid.Column name="customer" heading={ i18n("Order:customer") }>
                        {
                            order => order.customer.salutation ? order.customer.salutation + " " + order.customer.name : order.customer.name
                        }
                    </DataGrid.Column>
                    <DataGrid.Column name="accepted" heading={ i18n("Order:accepted") }/>
                    <DataGrid.Column
                        heading={ i18n("Action") }
                    >
                        {
                            order => {
                                return (
                                    <Button
                                        className="btn btn-success"
                                        icon="fa-clipboard-check"
                                        text="Choose"
                                        transition="choose"
                                        context={ order }
                                    />
                                );
                            }
                        }
                    </DataGrid.Column>
                </DataGrid>
            </div>
        )
    }
}

export default SubProcessHome
