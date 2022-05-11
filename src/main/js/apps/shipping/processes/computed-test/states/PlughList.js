import React from "react";
import { ViewState, createDomainObject, config, i18n, Button, DataGrid, FilterDSL } from "@quinscape/automaton-js";
import Q_PlughDetail from "../queries/Q_PlughDetail";
import cx from "classnames";
import { ButtonToolbar } from "reactstrap";
import { Icon, Select } from "domainql-form";
import PlughDetail from "./PlughDetail";


const {
    field,
    value
} = FilterDSL;

const PlughList = new ViewState(
    "PlughList",
    (process, scope) => ({
        "new-plugh": {
            to: PlughDetail,
            action: t => {

                // use empty id to be replaced by a new id server-side (
                const newObj = createDomainObject("PlughInput", "");

                newObj.name = "Unnamed";
                newObj.description = null;
                newObj.num = 0;
                newObj.flag = false;
                newObj.created = new Date();
                newObj.type = "TYPE_A";

                return scope.updateCurrent(newObj);
            }
        },

        "new-plugh-no-ddefaults": {
            to: PlughDetail,
            action: t => {

                // use empty id to be replaced by a new id server-side (
                const newObj = createDomainObject("PlughInput", "");

                // test required
                newObj.name = null;
                // test highlevel validation
                newObj.description = "AAA";
                newObj.flag = false;
                newObj.created = new Date();
                newObj.type = "TYPE_A";

                // XXX: even though we don't set ownerId here, we won't get an
                //      revalidation error because there's no field for it

                return scope.updateCurrent(newObj);
            }
        },

        "to-detail": {
            to: PlughDetail,
            action: t => {

                console.log("to-detail, context = ", t.context);

                return Q_PlughDetail.execute({
                    config: {
                        condition:
                            field("id")
                                .eq(
                                    value(
                                        t.context
                                    )
                                )
                    }
                }).then(({iQueryPlugh}) => {

                    if (iQueryPlugh.rows.length === 0)
                    {
                        alert("Could not load Plugh with id '" + t.context)
                    }
                    return scope.updateCurrent(config.inputSchema.clone(iQueryPlugh.rows[0]));
                });
            }
        }
    }),
    props => {

        const {env} = props;

        const {scope} = env;

        return (
            <React.Fragment>
                <h1>
                    {
                        i18n("CRUD List")
                    }
                </h1>

                <ButtonToolbar>
                    <Button className="btn btn-primary mr-1" transition="new-plugh">
                        <Icon className="fa-save mr-1"/>
                        New
                    </Button>
                    <Button className="btn btn-primary mr-1" action={ () => scope.plughs.update({ condition: null})}>
                        <Icon className="fa-eraser text-success mr-1"/>
                        Clear Filter
                    </Button>
                </ButtonToolbar>

                <DataGrid
                    value={scope.plughs}
                >
                    <DataGrid.Column
                        heading={i18n("Action")}
                    >
                        {
                            plugh => (
                                <Button
                                    className="btn btn-secondary text-nowrap"
                                    transition="to-detail"
                                    context={plugh.id}>
                                    <Icon className="fa-edit"/>
                                    Detail
                                </Button>
                            )
                        }
                    </DataGrid.Column>
                    <DataGrid.Column
                        name="name"
                        filter="containsIgnoreCase"
                    />
                    <DataGrid.Column
                        name="num"
                        filter="between"
                    />
                    <DataGrid.Column
                        name="extra"
                        filter={
                            (fieldName, val) => field("name")
                                .concat(value(':'))
                                .concat(field('num'))
                                .containsIgnoreCase(value(val, 'String'))
                        }
                        sort={ field("name")
                            .concat(value(':'))
                            .concat(field('num'))  }
                    />
                </DataGrid>

            </React.Fragment>
        );
    });

export default PlughList;
