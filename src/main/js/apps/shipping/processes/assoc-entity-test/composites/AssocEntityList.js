import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { Button, i18n, IQueryGrid as DataGrid, FilterDSL } from "@quinscape/automaton-js"
import { Select } from "domainql-form";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


const AssocEntityList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>

            <h2>
                {
                    i18n("Associations")
                }
            </h2>
            <DataGrid
                id="assoc-grid"
                value={ scope.links }
            >
                <DataGrid.Column
                    heading={ i18n("Left") }
                    filter={
                        val => field("baz.name")
                            .containsIgnoreCase(
                                value(
                                    "String",
                                    val
                                )
                            )
                    }
                    sort="baz.name"
                >
                    {
                        link => (
                            <Button
                                className="btn btn btn-link"
                                text={ link.baz.name }
                                transition="to-baz-detail"
                                context={ link.baz.id }
                            />
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column
                    heading={ i18n("Right") }
                    filter={
                        val => field("value.name")
                            .containsIgnoreCase(
                                value(
                                    "String",
                                    val
                                )
                            )
                    }
                    sort="value.name"
                >
                    {
                        link => (
                            <Button
                                className="btn btn btn-link"
                                text={ link.value.name }
                                transition="to-baz-value-detail"
                                context={ link.value.id }
                            />
                        )
                    }
                </DataGrid.Column>
            </DataGrid>

            <ButtonToolbar>
                <Button
                    className="btn btn-secondary mr-1"
                    transition="new-baz"
                    icon="fa-save mr-1"
                    text="New"
                />
                <Button
                    className="btn btn-secondary mr-1"
                    transition="new-baz-value"
                    icon="fa-save mr-1"
                    text="New Value"
                />
            </ButtonToolbar>

            <h1>
                {
                    i18n("Left-side Entities")
                }
            </h1>
            <DataGrid
                id="baz-grid"
                value={ scope.bazes }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        baz => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                icon="fa-edit"
                                text="Detail"
                                transition="to-baz-detail"
                                context={ baz.id }
                            />
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
            </DataGrid>

            <h1>
                {
                    i18n("Right-side Entities")
                }
            </h1>
            <DataGrid
                id="baz-value-grid"
                value={ scope.bazValues }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        bazValue => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                icon="fa-edit"
                                text="Detail"
                                transition="to-baz-value-detail"
                                context={ bazValue.id }
                            />
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
            </DataGrid>


        </React.Fragment>
    )
};

export default fnObserver(AssocEntityList);
