import { Icon } from "domainql-form"
import React from "react"

import { ButtonToolbar } from "reactstrap"
import { Button, DataGrid, i18n } from "@quinscape/automaton-js"

import { observer as fnObserver } from "mobx-react-lite";


const GraultList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h1>
                {
                    i18n("Grault List")
                }
                <small>
                    attachment example
                </small>
            </h1>
            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="new-grault">
                    <Icon className="fa-plus-circle mr-1" />
                    New Grault
                </Button>
            </ButtonToolbar>


            <DataGrid
                value={ scope.graults }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        grault => (
                            <Button
                                className="btn btn-secondary"
                                transition="to-detail"
                                context={ grault.id }
                            >
                                <Icon className="fa-edit mr-1" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name"/>
            </DataGrid>
        </div>
    );
};

export default fnObserver(GraultList)
