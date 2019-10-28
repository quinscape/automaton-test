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
                <Button
                    className="btn btn-danger"
                    icon="fa-close"
                    text="Close"
                    transition="close"
                />
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
                                <Button
                                    className="btn btn-success mr-1"
                                    icon="fa-clipboard-check"
                                    text="Choose"
                                    transition="choose"
                                    context={ foo }
                                />

                                <Button
                                    className="btn btn-success mr-1"
                                    icon="fa-forward"
                                    text="Open in Detail"
                                    transition="pick"
                                    context={ foo.id }
                                />
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
                <Button
                    className="btn btn-secondary mr-1"
                    transition="open-dialog"
                    icon="fa-th-list mr-1"
                    text="Open Dialog Sub"
                />
                <Button
                    className="btn btn-secondary mr-1"
                    transition="open-full"
                    icon="fa-th-list mr-1"
                    text="Open Fullscreen Sub"
                />

            </ButtonToolbar>
        </div>
    )
}

export default fnObserver(SubProcessDialogHome)
