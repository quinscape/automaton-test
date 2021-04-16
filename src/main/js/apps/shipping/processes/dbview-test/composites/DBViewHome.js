import { Icon, Select } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { Button, i18n, DataGrid } from "@quinscape/automaton-js";
import { Card, CardBody }  from "reactstrap";
/**
 * Localized array of month names.

 * @return {{name: string, value: number}[]}
 */
const MONTHS = (() => {

    const date = new Date("1970-01-15");
    const array = new Array(12);
    for (let i=0; i < 12; i++)
    {
        date.setMonth(i);
        array[i] = {
            name: date.toLocaleString('en-us', {month: 'long'}),
            value: i + 1
        };
    }
    return array;
})();

const DBViewHome = props => {

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
};

export default fnObserver(DBViewHome);
