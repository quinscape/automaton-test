import React from "react";
import { ViewState, createDomainObject, config, i18n, Button, DataGrid, FilterDSL } from "@quinscape/automaton-js";
import Q_GraultDetail from "../queries/Q_GraultDetail";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import GraultDetail from "./GraultDetail";

const {
    field,
    value
} = FilterDSL;

const GraultList = new ViewState("GraultList", (process, scope) => ({
    "new-grault": {
        to: GraultDetail,
        action: t => {
            const newInstance = createDomainObject("Grault");
            newInstance.name = "Unnamed";
            scope.updateCurrent(newInstance)
        }
    },

    "to-detail": {
        to: GraultDetail,
        action: t => {

            const id = t.context;

            return Q_GraultDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(
                                    id
                                )
                            )
                }
            }).then(({iQueryGrault}) => {

                if (iQueryGrault.rows.length === 0)
                {
                    alert("Could not load Grault with id '" + id)
                }

                scope.updateCurrent(
                    config.inputSchema.clone(
                        iQueryGrault.rows[0]
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
                    i18n("Grault List")
                }
                <small>
                    attachment example
                </small>
            </h1>
            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="new-grault">
                    <Icon className="fa-plus-circle mr-1" />
                    New Grault
                </Button>
            </ButtonToolbar>


            <DataGrid
                value={ scope.graults }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        grault => (
                            <Button
                                className="btn btn-secondary"
                                transition="to-detail"
                                context={ grault.id }
                            >
                                <Icon className="fa-edit mr-1" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name"/>
            </DataGrid>
        </div>
    );
});

export default GraultList;