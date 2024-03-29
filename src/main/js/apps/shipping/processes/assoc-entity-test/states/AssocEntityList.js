import React from "react";
import { ViewState, createDomainObject, DataGrid, Button, FilterDSL } from "@quinscape/automaton-js";
import Q_BazDetail from "../queries/Q_BazDetail";
import Q_BazValueDetail from "../queries/Q_BazValueDetail";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import BazDetail from "./BazDetail";
import BazValueDetail from "./BazValueDetail";

const {
    field,
    value
} = FilterDSL;

const AssocEntityList = new ViewState("AssocEntityList", (process, scope) => ({
    "new-baz": {
        to: BazDetail,
        action: t => {
            const newBaz = createDomainObject("BazInput");

            newBaz.name = "Unnamed Baz";
            return scope.updateBaz(newBaz);
        }
    },

    "new-baz-value": {
        to: BazValueDetail,
        action: t => {
            const newBazValue = createDomainObject("BazValueInput");

            newBazValue.name = "Unnamed Baz Value";
            return scope.updateBazValue(newBazValue);
        }
    },

    "to-baz-detail": {
        to: BazDetail,
        action: t => {

            console.log("to-baz-detail, context = ", t.context);

            return Q_BazDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(t.context)
                            )
                }
            }).then(
                ({iQueryBaz}) => scope.updateBaz(iQueryBaz.rows[0])
            );
        }
    },

    "to-baz-value-detail": {
        to: BazValueDetail,
        action: t => {

            console.log("to-baz-value-detail, context = ", t.context);

            return Q_BazValueDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(t.context)
                            )
                }
            }).then(
                ({iQueryBazValue}) => scope.updateBazValue(iQueryBazValue.rows[0])
            );
        }
    }
}), props => {

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
                        (fieldName, val) => field("baz.name")
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
                        (fieldName, val) => field("value.name")
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
});

export default AssocEntityList;