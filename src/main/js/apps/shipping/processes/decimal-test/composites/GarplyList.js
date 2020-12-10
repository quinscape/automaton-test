import { Icon } from "domainql-form"
import React from "react"

import { ButtonToolbar } from "reactstrap"
import { Button, IQueryGrid as DataGrid, i18n } from "@quinscape/automaton-js"

import { observer as fnObserver } from "mobx-react-lite";


const GarplyList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h1>
                {
                    i18n("Garply List")
                }
                <br/>
                <small>
                    decimal example
                </small>
            </h1>
            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="new-garply">
                    <Icon className="fa-plus-circle mr-1" />
                    New Garply
                </Button>
            </ButtonToolbar>


            <DataGrid
                value={ scope.garplys }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        garply => (
                            <Button
                                className="btn btn-secondary"
                                transition="to-detail"
                                context={ garply.id }
                            >
                                <Icon className="fa-edit mr-1" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name"/>
                <DataGrid.Column name="value"/>
                <DataGrid.Column name="opt" />
            </DataGrid>
        </div>
    );
};

export default fnObserver(GarplyList)
