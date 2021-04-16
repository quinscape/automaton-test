import React from "react";
import { ViewState, createDomainObject, config, i18n, Button, DataGrid, FilterDSL } from "@quinscape/automaton-js";
import Q_GarplyDetail from "../queries/Q_GarplyDetail";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import GarplyDetail from "./GarplyDetail";

const {
    field,
    value
} = FilterDSL;

const GarplyList = new ViewState("GarplyList", (process, scope) => ({
    "new-garply": {
        to: GarplyDetail,
        action: t => {
            const newInstance = createDomainObject("Garply");
            newInstance.name = "Unnamed";
            newInstance.value = (1 + Math.sqrt(5))/2;
            newInstance.opt = Math.PI * 2;
            scope.updateCurrent(newInstance)
        }
    },

    "to-detail": {
        to: GarplyDetail,
        action: t => {

            const id = t.context;

            return Q_GarplyDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(
                                    id
                                )
                            )
                }
            }).then(({iQueryGarply}) => {

                if (iQueryGarply.rows.length === 0)
                {
                    alert("Could not load Garply with id '" + id)
                }

                scope.updateCurrent(
                    config.inputSchema.clone(
                        iQueryGarply.rows[0]
                    )
                );
            })
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h1>
                {
                    i18n("Garply List")
                }
                <br/>
                <small>
                    decimal example
                </small>
            </h1>
            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="new-garply">
                    <Icon className="fa-plus-circle mr-1" />
                    New Garply
                </Button>
            </ButtonToolbar>


            <DataGrid
                value={ scope.garplys }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        garply => (
                            <Button
                                className="btn btn-secondary"
                                transition="to-detail"
                                context={ garply.id }
                            >
                                <Icon className="fa-edit mr-1" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name"/>
                <DataGrid.Column name="value"/>
                <DataGrid.Column name="opt" />
            </DataGrid>
        </div>
    );
});

export default GarplyList;