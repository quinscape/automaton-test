import React from "react";
import { ViewState, createDomainObject, config, i18n, Button, DataGrid, FilterDSL } from "@quinscape/automaton-js";
import Q_WaldoDetail from "../queries/Q_WaldoDetail";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import WaldoDetail from "./WaldoDetail";

const {
    field,
    value
} = FilterDSL;

const WaldoList = new ViewState("WaldoList", (process, scope) => ({
    "new-meta-config": {
        to: WaldoDetail,
        action: t => {
            const newInstance = createDomainObject("Waldo");
            newInstance.name = "Unnamed";
            scope.updateCurrent(newInstance)
        }
    },

    "to-detail": {
        to: WaldoDetail,
        action: t => {

            const id = t.context;

            return Q_WaldoDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(
                                    id
                                )
                            )
                }
            }).then(({iQueryWaldo}) => {

                if (iQueryWaldo.rows.length === 0)
                {
                    alert("Could not load Waldo with id '" + id)
                }

                scope.updateCurrent(
                    config.inputSchema.clone(
                        iQueryWaldo.rows[0]
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
            <h3>
                {
                    i18n("Meta Config List")
                }
                <small>
                    Meta Field config example. Tests &lt;FieldMetaButton/&gt; configuration
                </small>
            </h3>
            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="new-meta-config">
                    <Icon className="fa-plus-circle mr-1" />
                    New Waldo
                </Button>
            </ButtonToolbar>


            <DataGrid
                value={ scope.waldos }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        waldo => (
                            <Button
                                className="btn btn-secondary"
                                transition="to-detail"
                                context={ waldo.id }
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

export default WaldoList;