import React from "react";

import {
    ViewState,
    MergeOperation,
    deleteDomainObject,
    backToParent,
    useEntity,
    i18n,
    DataGrid,
} from "@quinscape/automaton-js";

import { DateTime } from "luxon";
import { FormLayout } from "domainql-form";
import CorgeForm from "../composites/CorgeForm";
import CorgeList from "./CorgeList";

const CorgeDetail = new ViewState("CorgeDetail", (process, scope) => ({
    "save": {
        to: CorgeList,
        action: t =>{

            // update modified field
            t.context.modified = DateTime.local();

            //scope.workingSet.addChanges(t.context);

            return scope.workingSet.merge().then(op => {

                if (op === MergeOperation.STORE)
                {
                    // we actually did store the merged working set

                    // update list view
                    return scope.corges.update();
                }
                else
                {
                    // we did not store (might be CANCEL, DISCARD or APPLY)
                    // in any case, we're going back into the mask
                    // (everything else that needed to happen already happened)
                    t.target = CorgeDetail
                }
            });
        }
    },

    "delete": {
        to: CorgeList,
        discard: true,
        confirmation: context => `Delete ${context.name} ?`,

        action: t => {
            const { id } = t.context;

            return deleteDomainObject("Corge", id)
                .then(
                    didDelete => didDelete && scope.corges.update()
                )
        }
    },

    "cancel": {
        discard: true,
        action: t => {

            console.log("Transition 'cancel'")
            t.back(backToParent(t));
        }
    }
}), props => {

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
});

export default CorgeDetail;
