import { Icon } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { Button, i18n, DataGrid } from "@quinscape/automaton-js";


const FKTestList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("CRUD List")
                }
            </h1>

            <ButtonToolbar>
                <Button className="btn btn-primary mr-1" transition="new-qux">
                    <Icon className="fa-save mr-1" />
                    New
                </Button>
            </ButtonToolbar>

            <DataGrid
                id="iquery-test"
                value={ scope.quxes }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        qux => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                transition="to-detail"
                                context={ qux.id }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" />
                <DataGrid.Column name="quxA.name" />
                <DataGrid.Column name="quxBName" />
                <DataGrid.Column name="quxC1.name" />
                <DataGrid.Column name="quxC2.name"/>
            </DataGrid>

        </React.Fragment>
    );
};

export default fnObserver(FKTestList);
