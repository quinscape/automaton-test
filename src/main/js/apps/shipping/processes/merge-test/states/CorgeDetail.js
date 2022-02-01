import React from "react";

import {
    AssociationSelector,
    FKSelector,
    ViewState,
    MergeOperation,
    deleteDomainObject,
    backToParent,
    useEntity,
    i18n,
    Button,
    DataGrid,
    config
} from "@quinscape/automaton-js";

import {
    field,
    value
} from "@quinscape/automaton-js/filter"

import { DateTime } from "luxon";
import { Form, Field, FieldMode, FormLayout, GlobalErrors, Icon, Select, TextArea, FormContext } from "domainql-form";
import CorgeList from "./CorgeList";
import WorkingSetHelper from "../../../../../components/WorkingSetHelper";
import Q_AppUser from "../../../queries/Q_AppUser";
import Q_CorgeAssocList from "../queries/Q_CorgeAssocList";
import { ButtonToolbar } from "reactstrap";
import Q_CorgeDetail from "../queries/Q_CorgeDetail";

const CorgeDetail = new ViewState("CorgeDetail", (process, scope) => {
    return ({
        "save": {
            to: CorgeList,
            action: t => {

                // update modified field
                scope.workingSet.changes
                    .filter(obj => obj._type === "Corge")
                    .forEach(obj => obj.modified = DateTime.local() )

                //scope.workingSet.addChanges(t.context);

                return scope.workingSet.merge().then(op => {

                    if (op === MergeOperation.STORE)
                    {
                        // we actually did store the merged working set

                        // update list view
                        return scope.corges.update()
                    }
                    else
                    {
                        // we did not store (might be CANCEL, DISCARD or APPLY)
                        // in any case, we're going back into the mask
                        // (everything else that needed to happen already happened)
                        t.target = CorgeDetail
                    }
                })
            }
        },

        "delete": {
            to: CorgeDetail,
            discard: true,
            confirmation: context => `Delete ${context.name} ?`,

            action: t => {
                scope.workingSet.markDeleted(t.context)

                return Q_CorgeDetail.execute({
                    config: {
                        pageSize: 1
                    }
                })
                    .then(({iQueryCorge}) => {

                        const corge = config.inputSchema.clone(iQueryCorge.rows[0])
                        scope.workingSet.registerBaseVersion(corge)
                        scope.updateCurrent(corge)
                    })

            }
        },

        "cancel": {
            discard: true,
            action: t => {

                console.log("Transition 'cancel'")
                t.back(backToParent(t))
            }
        },

        "select": {
            action: t => {

                const id = t.context

                const registered = scope.workingSet.lookup("Corge", id)
                if (registered)
                {
                    scope.updateCurrent(
                        registered.domainObject
                    )
                }
                else
                {
                    return Q_CorgeDetail.execute({
                        config: {
                            condition:
                                field("id")
                                    .eq(
                                        value(
                                            id
                                        )
                                    )
                        }
                    }).then(({iQueryCorge}) => {

                        if (iQueryCorge.rows.length === 0)
                        {
                            alert("Could not load Corge with id '" + t.context)
                        }

                        const corge = config.inputSchema.clone(iQueryCorge.rows[0])

                        scope.workingSet.registerBaseVersion(corge)

                        return scope.updateCurrent(
                            corge
                        )
                    })
                }

            }
        }
    })
}, props => {

    const { env } = props;
    const { scope } = env;

    const entity = useEntity("Corge", scope.currentCorge.id);

    return (
        <React.Fragment>
            <div className="row">

                <div className="col">
                    <Form
                        key={ scope.currentCorge.id }
                        type="Corge"
                        value={ scope.currentCorge }
                        options={{
                            layout: FormLayout.HORIZONTAL
                        }}

                    >
                        {
                            formConfig => {

                                return (
                                    <React.Fragment>
                                        <h1>
                                            {
                                                i18n("Corge Detail")
                                            }
                                        </h1>

                                        <ButtonToolbar>
                                            <Button
                                                className="btn btn-primary mr-1"
                                                transition="save"
                                                disabled={ () => !scope.workingSet.hasChanges}
                                            >
                                                <Icon className="fa-save mr-1" />
                                                Save
                                            </Button>
                                            <Button className="btn btn-danger mr-1" transition="delete">
                                                <Icon className="fa-times mr-1" />
                                                Delete
                                            </Button>
                                            <Button className="btn btn-secondary mr-1" transition="cancel">
                                                <Icon className="fa-times mr-1" />
                                                Cancel
                                            </Button>

                                        </ButtonToolbar>

                                        <GlobalErrors/>
                                        <Field name="id" mode={ FieldMode.PLAIN_TEXT }/>
                                        <Field name="name"/>
                                        <Field name="num"/>
                                        <Field name="num2"/>
                                        <Field name="flag"/>

                                        <FKSelector
                                            name="ownerId"
                                            display="owner.login"
                                            searchFilter="login"
                                            tooltip="Corge Owner"
                                            required={ true }
                                            query={ Q_AppUser }
                                        />

                                        <TextArea name="description"/>

                                        <Select
                                            name="type2"
                                            required={ true }
                                            values={ scope.corgeTypes.rows }
                                            nameProperty={ "name" }
                                            valueProperty={ "id" }
                                        />

                                        <FKSelector
                                            key={ formConfig.root.type.id }
                                            name="typeId"
                                            display="type.name"
                                            searchFilter="name"
                                            tooltip="Corge Type"
                                            required={ true }
                                            query={ scope.corgeTypes }
                                        />

                                        <AssociationSelector
                                            name="corgeLinks"
                                            label="Linked"
                                            display="assoc.name"
                                            value="assoc.id"
                                            helpText="Select associated CorgeLink values"
                                            query={
                                                Q_CorgeAssocList
                                            }

                                        />

                                    </React.Fragment>
                                )
                            }
                        }
                    </Form>
                    <hr/>
                    <DataGrid
                        id="merge-test"
                        value={ scope.corges }
                        isCompact={ false }
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
                                        className="btn btn-secondary mr-1"
                                        context={ corge.id }
                                        transition="select"
                                    >
                                        Select
                                    </Button>
                                )
                            }
                        </DataGrid.Column>
                        <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                        <DataGrid.Column name="num" filter="gt"/>
                    </DataGrid>


                    <Form
                        key={ "f2" + scope.currentCorge.id }
                        type="Corge"
                        value={ scope.currentCorge }
                        options={{
                            layout: FormLayout.HORIZONTAL
                        }}

                    >
                        {
                            formConfig => {
                                return (
                                    <ButtonToolbar>
                                        <Button className="btn btn-primary mr-1" transition="save">
                                            <Icon className="fa-save mr-1"/>
                                            Save
                                        </Button>
                                        <Button className="btn btn-danger mr-1" transition="delete">
                                            <Icon className="fa-times mr-1"/>
                                            Delete
                                        </Button>
                                        <Button className="btn btn-secondary mr-1" transition="cancel">
                                            <Icon className="fa-times mr-1"/>
                                            Cancel
                                        </Button>

                                    </ButtonToolbar>

                                )
                            }
                        }
                    </Form>
                </div>
            </div>

            <WorkingSetHelper workingSet={ scope.workingSet }/>

        </React.Fragment>
    )
});

export default CorgeDetail;
