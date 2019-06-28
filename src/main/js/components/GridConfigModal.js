import React, { useMemo, useState, useEffect, useRef } from "react"
import { action, observable, reaction, toJS } from "mobx"
import { observer as fnObserver } from "mobx-react-lite"

import { ButtonToolbar, Container, Modal, ModalBody, ModalHeader } from "reactstrap"
import { i18n, Icon, GraphQLQuery } from "@quinscape/automaton-js"
import { Field, Form, FieldMode } from "domainql-form"
import Calendar from "react-calendar"

import set from "lodash.set"


const configureColumnsMutation = new GraphQLQuery(
    // language=GraphQL
    `
    mutation configureColumns($gridId: String!, $columns: JSONB!)
    {
        configureColumns(name: $gridId, columns: $columns)     
    }`
);

function convertToMap(columnStates)
{
    const obj = {};

    const objectsUsed = new Set();

    for (let i = 0; i < columnStates.length; i++)
    {
        const {name, enabled} = columnStates[i];

        const pos = name.lastIndexOf(".");
        if (pos < 0)
        {
            obj[name] = enabled;
        }
        else
        {
            const parent = name.substr(0, pos);
            if (!objectsUsed.has(parent))
            {
                obj[parent] = enabled;
                objectsUsed.add(parent);
            }

        }

    }
    return obj;
}


/**
 * Simple FontAwesome Icon component
 */
const GridConfigModal = fnObserver(props => {

    const {isOpen, toggle, gridId, iQuery, requiredColumns} = props;

    /**
     * Form object map with one boolean per column name
     */
    const formObj = useMemo(
        () => observable(
            convertToMap(
                iQuery.columnStates
            )
        )
        ,
        [requiredColumns]
    );

    /**
     * Sync changes in column config back to form object.
     */
    useEffect(
        () => reaction(
            () => {
                return convertToMap(
                    iQuery.columnStates
                );
            },
            map => {
                Object.assign(formObj, map);
            }
        ),
        []
    );


    const choose = formConfig => {

        formConfig.root.submit();

        // deep copy of observable column config
        const columns = {};

        const { columnStates } = iQuery;

        for (let name in formObj)
        {
            if (formObj.hasOwnProperty(name))
            {
                const enabled = formObj[name];

                for (let i = 0; i < columnStates.length; i++)
                {
                    const columnState = columnStates[i];
                    const { name: columnName } = columnState;
                    if (columnName === name || columnName[name.length] === '.' && columnName.indexOf(name) === 0)
                    {
                        columns[columnName] = enabled;
                    }
                }
            }
        }

        configureColumnsMutation.execute({
            gridId,
            columns
        }).then( () => {
            toggle();
            iQuery.update()
        })
    };

    const checkboxes = Object.keys(formObj).map( name => (
        <Field
            key={ name }
            name={ name }
            label={ name }
            type="Boolean"
            mode={ FieldMode.disabledIf( requiredColumns.indexOf(name) >= 0 ) }
        />
    ));

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader
                toggle={toggle}
            >
                {
                    i18n("Configure Grid '{0}'", gridId)
                }
            </ModalHeader>
            <ModalBody>
                <Container fluid={true}>
                    <Form
                        value={ formObj }
                        onSubmit={ choose }
                    >
                        {
                            checkboxes
                        }

                        <ButtonToolbar>
                            <button
                                type="button"
                                className="btn btn-secondary mr-1"
                                onClick={toggle}
                            >
                                <Icon className="fa-cancel"/>
                                {
                                    i18n("Cancel")
                                }
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary mr-1"
                            >
                                <Icon className="fa-ok"/>
                                {
                                    i18n("Configure")
                                }
                            </button>
                        </ButtonToolbar>
                    </Form>
                </Container>
            </ModalBody>
        </Modal>
    );
});

GridConfigModal.propTypes = {};

export default GridConfigModal
