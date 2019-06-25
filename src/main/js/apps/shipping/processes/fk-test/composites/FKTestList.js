import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { Button, i18n, IQueryGrid as DataGrid, CalendarField } from "@quinscape/automaton-js"
import { Select, FieldMode } from "domainql-form";


const MIN_DATE = new Date("2018-11-01T00:00:00Z");
const MAX_DATE = new Date("2019-03-30T23:59:59Z");

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
                <Button
                    className="btn btn-primary mr-1"
                    transition="new-qux"
                    icon="fa-save mr-1"
                    text="New"
                />
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
                                icon="fa-edit"
                                text="Detail"
                                transition="to-detail"
                                context={ qux.id }
                            />
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
    )
};

export default fnObserver(FKTestList);
