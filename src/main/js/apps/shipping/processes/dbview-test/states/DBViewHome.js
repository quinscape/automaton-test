import React from "react";
import { ViewState, i18n, DataGrid, Button } from "@quinscape/automaton-js";
import { Card, CardBody } from "reactstrap";
import { Icon, Select } from "domainql-form";

const DBViewHome = new ViewState("DBViewHome", (process, scope) => ({}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("DB-View Home")
                }
            </h1>

            <Card color="info">
                <CardBody>
                    Sums per month statistic.
                </CardBody>
            </Card>

            <DataGrid
                id="iquery-test"
                value={ scope.statistics }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        sumPerMonth => (
                            <Button
                                className="btn btn-secondary text-nowrap disabled"
                                action={ () => null}
                                disabled={ () => true }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="year" filter="eq"/>
                <DataGrid.Column name="month" filter="eq" renderFilter={
                    (name, scalarType, label) => {
                        return (
                            <Select
                                name={ name }
                                values={ MONTHS }
                                type={ scalarType }
                                label={ label }
                                labelClass="sr-only"
                            />
                        );
                    }
                }/>
                <DataGrid.Column name="sum" filter="between"/>
            </DataGrid>

        </React.Fragment>
    );
});

export default DBViewHome;