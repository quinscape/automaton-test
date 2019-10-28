import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { ButtonToolbar } from "reactstrap";
import { Button, i18n, IQueryGrid as DataGrid } from "@quinscape/automaton-js"

const EffectList = props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Effect List")
                }
            </h1>

            <ButtonToolbar>
                <Button
                    className="btn btn-primary mr-1"
                    transition="new-foo"
                    icon="fa-save mr-1"
                    text="New"
                />
            </ButtonToolbar>

            <DataGrid
                id="iquery-test"
                value={ scope.foos }
            >
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        foo => (
                            <Button
                                className="btn btn-secondary text-nowrap"
                                icon="fa-edit"
                                text="Detail"
                                transition="to-detail"
                                context={ foo.id }
                            />
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="description" filter="containsIgnoreCase"/>
                <DataGrid.Column name="owner.login" filter="containsIgnoreCase" heading={ i18n("owner") }/>
            </DataGrid>

        </React.Fragment>
    )
};

export default fnObserver(EffectList);
