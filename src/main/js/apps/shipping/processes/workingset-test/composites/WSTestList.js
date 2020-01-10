import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { Button, i18n, IQueryGrid as DataGrid, CalendarField } from "@quinscape/automaton-js"
import { Select, FormLayout, Icon } from "domainql-form";
import FooForm from "./FooForm";
import WorkingSetTestScope from "../workingset-test";


const WSTestList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("DataGrid with WorkingSet")
                }
            </h1>

            <ButtonToolbar>
                <Button
                    className="btn btn-primary mr-1"
                    transition="save-all"
                    disabled={ () => !scope.workingSet.hasChanges }>
                    <Icon className="fa-save mr-1" />
                    Save All
                </Button>

                <Button
                    className="btn btn-secondary mr-1"
                    transition="revert-all"
                    disabled={ () => !scope.workingSet.hasChanges }>
                    <Icon className="fa-save mr-1" />
                    Revert
                </Button>
            </ButtonToolbar>

            <DataGrid
                id="iquery-test"
                value={ scope.foos }
                workingSet={ scope.workingSet }
                rowClasses={ row => scope.currentFoo && row.id === scope.currentFoo.id && "table-active" }
            >
                <DataGrid.Column
                    heading={ "Status" }

                >
                    {
                        foo => (
                            <DataGrid.WorkingSetStatus
                                currentObj={ foo }
                                workingSet={ scope.workingSet }
                            />
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="description" filter="containsIgnoreCase"/>
                <DataGrid.Column name="flag" filter="eq"/>
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
                <DataGrid.Column name="owner.login" filter="containsIgnoreCase" heading={ i18n("owner") }/>
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        foo => (
                            <React.Fragment>

                                <Button
                                    className="btn btn-secondary btn-sm mr-1 mb-1"
                                    transition="edit-foo"
                                    context={ foo.id }
                                    text="edit in working set"
                                >
                                    <Icon className="fa-edit" />
                                </Button>
                                <Button
                                    className="btn btn-secondary btn-sm mr-1 mb-1"
                                    transition="delete-foo"
                                    context={ foo }
                                    text="Delete in working set"
                                >
                                    <Icon className="fa-trash-alt" />
                                </Button>
                                <Button
                                    className="btn btn-secondary btn-sm mr-1 mb-1"
                                    disabled={ () => !scope.workingSet.lookup(foo._type, foo.id)}
                                    transition="revert-foo"
                                    text="Revert changes in working set"
                                    context={ foo }
                                >
                                    <Icon className="fa-history" />
                                </Button>
                            </React.Fragment>
                        )
                    }
                </DataGrid.Column>
            </DataGrid>
            <ButtonToolbar>
                <Button className="btn btn-primary mr-1" transition="new-foo">
                    <Icon className="fa-save mr-1" />
                    New
                </Button>
            </ButtonToolbar>
            {
                scope.currentFoo &&
                    <FooForm
                        key={ scope.currentFoo.id }
                        value={ scope.currentFoo }
                        onSubmit={ formConfig => {

                            formConfig.root.submit();
                            scope.workingSet.addChanges(scope.currentFoo);
                        }}
                        options={{
                            layout: FormLayout.HORIZONTAL,
                            autoSubmit: true
                        }}
                    />
            }

        </React.Fragment>
    );
};

WSTestList.displayName = "WSTestList";

export default fnObserver(WSTestList);
