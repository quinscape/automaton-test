import { Icon } from "domainql-form"
import React from "react"

import { observer as fnObserver } from "mobx-react-lite";

import { Button, DataGrid, i18n } from "@quinscape/automaton-js"
import { ButtonToolbar } from "reactstrap";


const SubProcessDialogHome = props => {

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
}

export default fnObserver(SubProcessDialogHome)
