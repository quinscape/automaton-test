import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { FormLayout, Icon } from "domainql-form"
import CorgeForm from "./CorgeForm";
import { Button, useEntity, IQueryGrid as DataGrid, i18n } from "@quinscape/automaton-js"


const CorgeDetail = props => {

    const { env } = props;
    const { scope } = env;

    const entity = useEntity("Corge", scope.currentCorge.id);

    return (
        <React.Fragment>
            <div className="row">

                <div className="col">
                    <CorgeForm
                        value={ scope.currentCorge }
                        options={{
                            layout: FormLayout.HORIZONTAL,
                            isolation: false
                        }}
                    />
                    <hr/>
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
                        <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                        <DataGrid.Column name="num" filter="gt"/>
                    </DataGrid>


                </div>
            </div>


        </React.Fragment>
    )
};

export default fnObserver(CorgeDetail)
