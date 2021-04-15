import { React } from "react";
import { ViewState, createDomainObject, config, Button, DataGrid, i18n } from "@quinscape/automaton-js";
import { action } from "mobx";
import Q_GraultDetail from "../queries/Q_GraultDetail";
import { Icon } from "domainql-form";
import { ButtonToolbar } from "reactstrap";
import { observer as fnObserver } from "mobx-react-lite";
import GraultDetail from "./GraultDetail";

const GraultList = new ViewState("GraultList", () => ({
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