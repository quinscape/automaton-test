import { Field, FieldMode, GlobalErrors, Icon, Select, TextArea, withForm } from "domainql-form"
import React from "react"
import { observer } from "mobx-react-lite";
import {
    AssociationSelector,
    Button,
    CalendarField,
    config,
    FKSelector,
    i18n,
    ScrollTracker,
    useAutomatonEnv
} from "@quinscape/automaton-js"
import { ButtonToolbar } from "reactstrap";

import validation from "../../../../../services/validation"
import Q_AppUser from "../../../queries/Q_AppUser";
import Q_CorgeAssocList from "../queries/Q_CorgeAssocList";


const CorgeForm = props => {

    const env = useAutomatonEnv();

    const { formConfig } = props;

    const { scope } = env;

    //console.log("FOO FORM", root);

    const auth = config.auth;
    //console.log({ auth, root });

    /*
    type Corge {
            created: Timestamp!
            description: String
            flag: Boolean!
            id: String!
            name: String!
            num: Int!
            owner: AppUser!
            ownerId: String!
            type: CorgeType!
            typeId: String!
    }

    type CorgeAssoc {
            description: String
            id: String!
            name: String!
            num: Int!
    }

    type CorgeLink {
            assoc: CorgeAssoc!
            assocId: String!
            corge: Corge!
            corgeId: String!
            id: String!
    }

    type CorgeType {
            id: String!
            name: String!
    }

     */

    return (
        <ScrollTracker formConfig={ formConfig }>
            <h1>
                {
                    i18n("Corge Detail")
                }
            </h1>


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



            <ButtonToolbar>
                <Button className="btn btn-primary mr-1" transition="save">
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

        </ScrollTracker>
    );
};

export default withForm(
    observer(CorgeForm),
    {
        type: "CorgeInput",
        validation: validation("CorgeInput")
    }
)

