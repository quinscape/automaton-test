import React from "react";
import { ViewState, createDomainObject, config, i18n, Button, DataGrid, FilterDSL } from "@quinscape/automaton-js";
import { DateTime } from "luxon";
import Q_FooDetail from "../../datagrid-test/queries/Q_FooDetail";
import { FormLayout, Icon, Select } from "domainql-form";
import { ButtonToolbar } from "reactstrap";
import FooForm from "../composites/FooForm";

const {
    field,
    value
} = FilterDSL;

const WSTestList = new ViewState("WSTestList", (process, scope) => ({
    "new-foo": {
        action: t => {

            const newObj = createDomainObject("Foo");

            newObj.name = "Unnamed Foo";
            newObj.description = "";
            newObj.num = 0;
            newObj.flag = false;
            newObj.created = DateTime.local();
            newObj.type = "TYPE_A";
            newObj.ownerId = config.auth.id;

            scope.workingSet.addNew(newObj);
            scope.updateCurrent(newObj);

            //console.log("new-foo", newObj)

        }
    },

    "edit-foo": {
        action: t => {

            const id = t.context;

            //console.log("edit-foo, context = ", id);

            // Either edit the working set instance...
            const entry = scope.workingSet.lookup("Foo", id);
            if (entry)
            {
                scope.updateCurrent(entry.domainObject)
            }
            else
            {
                // ... or query the detail object
                return Q_FooDetail.execute({
                    config: {
                        condition:
                            field("id")
                                .eq(
                                    value(
                                        id
                                    )
                                )
                    }
                }).then(({iQueryFoo}) => {

                    if (iQueryFoo.rows.length === 0)
                    {
                        alert("Could not load Foo with id '" + t.context)
                    }
                    scope.updateCurrent(iQueryFoo.rows[0]);
                });
            }

        }
    },

    "revert-foo": {
        action: t => {
            scope.workingSet.revert(t.context)
        }
    },

    "delete-foo": {
        action: t => {
            scope.workingSet.markDeleted(t.context);

            if (scope.currentFoo && scope.currentFoo.id === t.context.id)
            {
                scope.updateCurrent(null);
            }
        }
    },

    "save-all": {
        action: t => {
            scope.workingSet.persist()
                .then(() => {
                    scope.foos.update();
                });
        }
    },

    "revert-all": {
        discard: true,
        confirmation: context => `Revert all changes?`,

        action: t => {
            scope.workingSet.revertAll();
        }
    }
}), props => {

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
});

export default WSTestList;