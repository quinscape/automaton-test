import React from "react";
import { ViewState, i18n, Button, DataGrid } from "@quinscape/automaton-js";
import { runInAction } from "mobx";
import { Icon } from "domainql-form";
import { ButtonToolbar } from "reactstrap";
import SubProcessDialogDetail from "./SubProcessDialogDetail";

const SubProcessDialogHome = new ViewState("SubProcessDialogHome", (process, scope) => ({
    "choose" : {
        action: t => process.endSubProcess(t.context)
    },

    "close" : {
        action: t => process.endSubProcess(null)
    },

    "open-dialog": {
        action: t =>
            process.runSubProcess("effect-sub-dialog", t.context)
                .then(
                    result => result && runInAction( () => console.log("RESULT", result, "process =", process))
                )
    },

    "open-full": {
        action: t =>
            process.runSubProcess("effect-sub-full", t.context)
                .then(
                    result => result && runInAction( () => console.log("RESULT", result, "process =", process))
                )
    },

    "pick": {
        to: SubProcessDialogDetail,
        action: t => {

            console.log("pick, context = ", t.context);

            return updateDetail(scope, t.context);
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <div>
            <h3>
                Effects Sub-Process<br/>
                <small className="text-muted">
                    Sub-process
                </small>
            </h3>
            
            <div className="btn-toolbar">
                <Button className="btn btn-danger" transition="close">
                    <Icon className="fa-close" />
                    Close
                </Button>
            </div>

            <DataGrid
                id="iquery-test"
                value={ scope.foos }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        foo => {
                            return (
                                <React.Fragment>
                                <Button className="btn btn-success mr-1" transition="choose" context={ foo }>
                                    <Icon className="fa-clipboard-check" />
                                    Choose
                                </Button>

                                <Button className="btn btn-success mr-1" transition="pick" context={ foo.id }>
                                    <Icon className="fa-forward" />
                                    Open in Detail
                                </Button>
                                </React.Fragment>
                            );
                        }
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="description" filter="containsIgnoreCase"/>
                <DataGrid.Column name="flag" filter="eq"/>
                <DataGrid.Column name="owner.login" filter="containsIgnoreCase" heading={ i18n("owner") }/>
            </DataGrid>
            <ButtonToolbar>
                <Button className="btn btn-secondary mr-1" transition="open-dialog">
                    <Icon className="fa-th-list mr-1" />
                    Open Dialog Sub
                </Button>
                <Button className="btn btn-secondary mr-1" transition="open-full">
                    <Icon className="fa-th-list mr-1" />
                    Open Fullscreen Sub
                </Button>

            </ButtonToolbar>
        </div>
    );
});

export default SubProcessDialogHome;