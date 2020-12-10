import { Icon } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { Button, FilterDSL, IQueryGrid as DataGrid } from "@quinscape/automaton-js"

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


const AssocEntityList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>

            <h1>
                {
                    ("Associations")
                }
            </h1>
            <DataGrid
                id="assoc-grid"
                value={ scope.links }
            >
                <DataGrid.Column
                    heading={ ("Left") }
                    filter={
                        val => field("baz.name")
                            .containsIgnoreCase(
                                value(
                                    val,
                                    "String"
                                )
                            )
                    }
                    sort="baz.name"
                >
                    {
                        link => (
                            <Button
                                className="btn btn btn-link"
                                transition="to-baz-detail"
                                context={ link.baz.id }>
                                { link.baz.name }
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column
                    heading={ ("Right") }
                    filter={
                        val => field("value.name")
                            .containsIgnoreCase(
                                value(
                                    val,
                                    "String"
                                )
                            )
                    }
                    sort="value.name"
                >
                    {
                        link => (
                            <Button
                                className="btn btn btn-link"
                                transition="to-baz-value-detail"
                                context={ link.value.id }>
                                { link.value.name }
                            </Button>
                        )
                    }
                </DataGrid.Column>
            </DataGrid>

            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="new-baz">
                    <Icon className="fa-save mr-1" />
                    New
                </Button>
                <Button className="btn btn-secondary mr-1" transition="new-baz-value">
                    <Icon className="fa-save mr-1" />
                    New Value
                </Button>
            </ButtonToolbar>

            <h2>
                {
                    ("Left-side Entities (Baz)")
                }
            </h2>
            <DataGrid
                id="baz-grid"
                value={ scope.bazes }
            >
                <DataGrid.Column
                    heading={ ("Action") }
                >
                    {
                        baz => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                transition="to-baz-detail"
                                context={ baz.id }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="owner.login" filter="containsIgnoreCase"/>
            </DataGrid>

            <h2>
                {
                    ("Right-side Entities (BazValue)")
                }
            </h2>
            <DataGrid
                id="baz-value-grid"
                value={ scope.bazValues }
            >
                <DataGrid.Column
                    heading={ ("Action") }
                >
                    {
                        bazValue => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                transition="to-baz-value-detail"
                                context={ bazValue.id }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
            </DataGrid>


        </React.Fragment>
    );
};

export default fnObserver(AssocEntityList);
