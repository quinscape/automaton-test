import React from "react";
import { ViewState, createDomainObject, i18n, Button, DataGrid, FilterDSL } from "@quinscape/automaton-js";
import Q_QuxDetail from "../queries/Q_QuxDetail";
import { ButtonToolbar } from "reactstrap";
import { Icon } from "domainql-form";
import FKTestDetail from "./FKTestDetail";
import FKTestValidate from "./FKTestValidate";

const {
    field,
    value
} = FilterDSL;

const FKTestList = new ViewState("FKTestList", (process, scope) => ({
    "new-qux": {
        to: FKTestDetail,
        action: t => {
            const newObj = createDomainObject("QuxMainInput");

            newObj.name = "Unnamed Qux";
            newObj.desc = "";
            newObj.num = 0;
            newObj.flag = false;
            newObj.created = new Date();
            newObj.type = "TYPE_A";

            return scope.updateCurrent(newObj);
        }
    },

    "to-detail": {
        to: FKTestDetail,
        action: t => {

            console.log("to-detail, context = ", t.context);

            return Q_QuxDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(
                                    t.context
                                )
                            )
                }
            }).then(({iQueryQuxMain}) => {

                if (iQueryQuxMain.rows.length === 0)
                {
                    alert("Could not load Qux with id '" + t.context)
                }
                return scope.updateCurrent(iQueryQuxMain.rows[0]);
            });
        }
    },

    "to-validate" : {
        to: FKTestValidate
    }
}), props => {

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
                <Button className="btn btn-primary mr-1" transition="new-qux">
                    <Icon className="fa-save mr-1" />
                    New
                </Button>

                <Button className="btn btn-secondary mr-1" transition="to-validate">
                    <Icon className="fa-arrow-right mr-1" />
                    To Validate
                </Button>
            </ButtonToolbar>

            <DataGrid
                id="iquery-test"
                value={ scope.quxes }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        qux => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                transition="to-detail"
                                context={ qux.id }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" />
                <DataGrid.Column name="quxA.name" />
                <DataGrid.Column name="quxBName" />
                <DataGrid.Column name="quxC1.name" />
                <DataGrid.Column name="quxC2.name"/>
            </DataGrid>

        </React.Fragment>
    );
});

export default FKTestList;
