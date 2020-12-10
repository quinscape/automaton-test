import React from "react"
import cx from "classnames"
import { Icon, Select } from "domainql-form"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { config, Button, i18n, IQueryGrid as DataGrid } from "@quinscape/automaton-js"

const CRUDList = props => {

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
                <Button className="btn btn-primary mr-1" transition="new-foo">
                    <Icon className="fa-save mr-1" />
                    New
                </Button>
                <Button className="btn btn-primary mr-1" transition="new-foo-no-ddefaults" tooltip="Revalidation example">
                    <Icon className="fa-save mr-1" />
                    New w/o defaults
                </Button>
            </ButtonToolbar>

            <DataGrid
                id="iquery-test"
                value={ scope.foos }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        foo => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                transition="to-detail"
                                context={ foo.id }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column
                    name="name"
                    filter="containsIgnoreCase"
                    className={ row => cx(row.name.indexOf("3") >= 0 && "bg-danger") }
                />
                <DataGrid.Column name="description" filter="containsIgnoreCase"/>
                <DataGrid.Column name="flag" filter="eq"/>
                <DataGrid.Column name="created"/>
                <DataGrid.Column name="type" filter="eq" renderFilter={
                    (name, scalarType, label) => {
                        /**
                         * Use another iQuery (on FooType) as select values
                         */
                        return (
                            <Select
                                name={ name }
                                values={ scope.fooTypes.rows }
                                type={ scalarType }
                                label={ label }
                                labelClass="sr-only"
                                nameProperty={ "name" }
                                valueProperty={ "name" }
                            />
                        );
                    }
                }/>
            </DataGrid>

        </React.Fragment>
    );
};

export default fnObserver(CRUDList);
