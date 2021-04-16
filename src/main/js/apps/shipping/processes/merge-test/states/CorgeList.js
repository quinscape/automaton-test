import React from "react";

import {
    ViewState,
    createDomainObject,
    config,
    useDomainMonitor,
    i18n,
    openDialog,
    Button,
    DataGrid,
    DomainActivityIndicator,
    FilterDSL,
} from "@quinscape/automaton-js";

import Q_CorgeDetail from "../queries/Q_CorgeDetail";
import simpleMergeData from "../../../../../data/merge-test/simple-merge.json";
import fKMergeData from "../../../../../data/merge-test/foreign-key-merge.json";
import manyToManyMergeData from "../../../../../data/merge-test/many-to-many.json";
import nonFKSelectData from "../../../../../data/merge-test/select-field-merge.json";
import timeStampData from "../../../../../data/merge-test/timestamp-merge.json";
import { ButtonToolbar, Container } from "reactstrap";
import { Icon } from "domainql-form";
import MergeDialog from "@quinscape/automaton-js/lib/ui/ChangeConflictDialog";
import CorgeDetail from "./CorgeDetail";

const {
    field,
    value
} = FilterDSL;

const CorgeList = new ViewState("CorgeList", (process, scope) => ({
    "new-corge": {
        to: CorgeDetail,
        action: t => {

            // use empty id to be replaced by a new id server-side (
            const newObj = createDomainObject("CorgeInput", "");

            newObj.name = "Unnamed Corge";
            newObj.desc = "";
            newObj.num = 0;
            newObj.flag = false;
            newObj.created = new Date();
            newObj.type = "TYPE_A";

            return scope.updateCurrent(newObj);
        }
    },

    "to-detail": {
        to: CorgeDetail,
        action: t => {

            console.log("to-detail, context = ", t.context);

            return Q_CorgeDetail.execute({
                config: {
                    condition:
                        field("id")
                            .eq(
                                value(
                                    t.context
                                )
                            )
                }
            }).then(({iQueryCorge}) => {

                if (iQueryCorge.rows.length === 0)
                {
                    alert("Could not load Corge with id '" + t.context)
                }

                const corge = config.inputSchema.clone(iQueryCorge.rows[0]);

                scope.workingSet.registerBaseVersion(corge);

                return scope.updateCurrent(
                    corge
                );
            });
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    const monitor = useDomainMonitor(
        field("domainType")
            .eq(
                value("Corge")
            )
    );

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-4">
                    <h1>
                        {
                            i18n("Corge List")
                        }
                    </h1>

                    <ButtonToolbar>
                        <Button className="btn btn-primary mr-1" transition="new-corge">
                            <Icon className="fa-save mr-1" />
                            New
                        </Button>
                    </ButtonToolbar>
                </div>
                <div className="col-md-8">
                    <h1>
                        {
                            i18n("Merge Demonstrations")
                        }
                    </h1>

                    <ButtonToolbar>
                        <button
                            type="button"
                            className="btn btn-primary mr-1"
                            onClick={ () => {
                                openDialog(
                                    dialog => (
                                        <MergeDialog
                                            dialog={ dialog }
                                            { ...  simpleMergeData }
                                        />
                                    )
                                ).then(result => console.log("RESOLUTION", result))
                            }}
                        >
                            Simple Merge
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary mr-1"
                            onClick={ () => {
                                openDialog(
                                    dialog => (
                                        <MergeDialog
                                            dialog={ dialog }
                                            { ...  fKMergeData }
                                        />
                                    )
                                ).then(result => console.log("RESOLUTION", result))
                            }}>
                            FK Merge
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary mr-1"
                            onClick={ () => {
                                openDialog(
                                    dialog => (
                                        <MergeDialog
                                            dialog={ dialog }
                                            { ... manyToManyMergeData }
                                        />
                                    )
                                ).then(result => console.log("RESOLUTION", result))
                            }}
                        >
                            m-to-n Merge
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary mr-1"
                            title="Example for what happens on a merge when you edit FK relations via SelectField"
                            onClick={ () => {
                                openDialog(
                                    dialog => (
                                        <MergeDialog
                                            dialog={ dialog }
                                            { ... nonFKSelectData }
                                        />
                                    )
                                ).then(result => console.log("RESOLUTION", result))
                            }}
                        >
                            FK w/o FKSelector
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary mr-1"
                            title="Example for a conflict on a timestamp field"
                            onClick={ () => {
                                openDialog(
                                    dialog => (
                                        <MergeDialog
                                            dialog={ dialog }
                                            { ... timeStampData }
                                        />
                                    )
                                ).then(result => console.log("RESOLUTION", result))
                            }}
                        >
                            Timestamp
                        </button>

                        <button
                            type="button"
                            className="btn btn-success mr-1"
                            title="Example of how to use openDialog() and the imperative dialog API"
                            onClick={ () => {
                                openDialog(
                                    dialog => (
                                        <Container fluid={true}>
                                            <div className="row">
                                                <div className="col">
                                                    CHOOSE!
                                                    <ButtonToolbar>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary mr-1"
                                                            onClick={() => dialog.confirm(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary mr-1"
                                                            onClick={() => dialog.confirm("A")}
                                                        >
                                                            Option A
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary mr-1"
                                                            onClick={() => dialog.confirm("B")}
                                                        >
                                                            Option B
                                                        </button>
                                                    </ButtonToolbar>
                                                </div>
                                            </div>
                                        </Container>

                                    ),
                                    {
                                        title: "Imperative Dialog Example"
                                    }
                                ).then(
                                    result => result && alert( "You chose " + result)
                                )
                            }}
                        >
                            Dialog API
                        </button>
                    </ButtonToolbar>

                </div>
            </div>


            <DataGrid
                id="iquery-test"
                value={ scope.corges }
            >
                <DataGrid.Column
                    heading={ i18n("Status") }
                >
                    {
                        corge => (
                            <DataGrid.WorkingSetStatus
                                workingSet={ scope.workingSet }
                                type="Corge"
                                id={ corge.id }
                            />
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        corge => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                transition="to-detail"
                                context={ corge.id }>
                                <Icon className="fa-edit" />
                                Detail
                            </Button>
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="num" filter="gt"/>
                <DataGrid.Column
                    heading={ i18n("Activity") }
                >
                    {
                        corge => (
                            <DomainActivityIndicator
                                key={ corge.id }
                                monitor={ monitor }
                                domainType="Corge"
                                id={ corge.id }
                            />
                        )
                    }
                </DataGrid.Column>
            </DataGrid>

        </React.Fragment>
    );
});

export default CorgeList;