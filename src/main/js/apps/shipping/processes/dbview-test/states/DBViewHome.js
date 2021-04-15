import { React } from "react";
import { ViewState, Button, i18n, DataGrid } from "@quinscape/automaton-js";
import { Icon, Select } from "domainql-form";
import { observer as fnObserver } from "mobx-react-lite";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import { action } from "mobx";

const DBViewHome = new ViewState("DBViewHome", () => ({}), props => {

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