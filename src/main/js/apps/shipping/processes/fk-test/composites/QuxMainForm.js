import React from "react"
import { toJS } from "mobx";
import { observer as fnObserver } from "mobx-react-lite";
import { Button, config, i18n, ScrollTracker, CalendarField, FKSelector, GraphQLQuery } from "@quinscape/automaton-js"

import { Field, GlobalErrors, TextArea, withForm, FieldMode } from "domainql-form"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"


const QueryQuxA = new GraphQLQuery(
// language=GraphQL
    `query iQueryQuxA($config: QueryConfigInput!)
    {
        iQueryQuxA(config: $config)
        {
            type
            columnConfig {
                columnStates{
                    name
                    enabled
                    sortable
                }
            }
            queryConfig {
                id
                condition
                currentPage
                pageSize
                sortFields
            }
            rows {
                id
                name
                value
                description
            }
            rowCount
        }
    }`,
    {
        config: {
            pageSize: 5,
            sortFields: ["name"]
        }
    }
);

const QueryQuxB = new GraphQLQuery(
// language=GraphQL
    `query iQueryQuxB($config: QueryConfigInput!)
    {
        iQueryQuxB(config: $config)
        {
            type
            columnConfig {
                columnStates{
                    name
                    enabled
                    sortable
                }
            }
            queryConfig {
                id
                condition
                currentPage
                pageSize
                sortFields
            }
            rows {
                id
                name
                value
                description
            }
            rowCount
        }
    }`,{
        config: {
            pageSize: 5,
            sortFields: ["name"]
        }
    }
);

const QueryQuxC =  new GraphQLQuery(
    // language=GraphQL
    `query iQueryQuxC($config: QueryConfigInput!)
    {
        iQueryQuxC(config: $config)
        {
            type
            columnConfig {
                columnStates{
                    name
                    enabled
                    sortable
                }
            }
            queryConfig {
                id
                condition
                currentPage
                pageSize
                sortFields
            }
            rows {
                id
                name
                value
                description
            }
            rowCount
        }
    }`,
    {
        config: {
            pageSize: 5,
            sortFields: ["name"]
        }
    }
);


const QuxMainForm = props => {

    const { formConfig } = props;

    const { root } = formConfig;

    //console.log("QUX FORM", root);

    const auth = config.auth;
    //console.log({ auth, root });

    return (
        <ScrollTracker formConfig={ formConfig }>
            <h1>
                {
                    i18n("Qux Detail")
                }
            </h1>


            <GlobalErrors/>
            <Field name="name"/>

            <FKSelector
                name="quxAId"
                display={ () => root.quxA.name }
                required={ true }
                query={ QueryQuxA }
            />

            <FKSelector
                name="quxBName"
                targetField="name"
                query={ QueryQuxB }
            />

            <FKSelector
                name="quxCId1"
                display={ () => root.quxC1.name }
                onUpdate={
                    row => formConfig.root.quxC1 = row || {}
                }
                query={ QueryQuxC }
            />

            <FKSelector
                name="quxCId2"
                display={ () => root.quxC2.name }
                onUpdate={
                    row => formConfig.root.quxC2 = row || {}
                }
                query={ QueryQuxC }
            />


            <ButtonToolbar>
                <Button
                    className="btn btn-primary mr-1"
                    transition="save"
                    icon="fa-save mr-1"
                    text="Save"
                />
                <Button
                    className="btn btn-danger mr-1"
                    transition="delete"
                    icon="fa-times mr-1"
                    text="Delete"
                />
                <Button
                    className="btn btn-secondary mr-1"
                    transition="cancel"
                    icon="fa-times mr-1"
                    text="Cancel"
                />

            </ButtonToolbar>

        </ScrollTracker>
    )
};

export default withForm(
    fnObserver(
        QuxMainForm
    ),
    {
        type: "QuxMainInput",
        validation: validation("QuxMainInput")
    }
)

