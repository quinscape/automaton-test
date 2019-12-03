import { Field, FieldMode, GlobalErrors, Icon, withForm } from "domainql-form"
import React from "react"
import { observer as fnObserver } from "mobx-react-lite";
import { AssociationSelector, Button, i18n } from "@quinscape/automaton-js"
import { ButtonToolbar } from "reactstrap";
import Q_BazList from "../queries/Q_BazList";


const BazValueForm = props => {

    const { formConfig } = props;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Associate Entity Detail B")
                }
            </h1>


            <GlobalErrors/>
            <Field name="id" mode={ FieldMode.PLAIN_TEXT }/>
            <Field name="name" wrapperColumnClass="col-md-4"/>
            <AssociationSelector
                name="bazLinks"
                label="Associated Values"
                display="baz.name"
                value="baz.id"
                helpText="Select associated bazes"
                query={
                    Q_BazList
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
        </React.Fragment>
    );
};

export default withForm(
    fnObserver(
        BazValueForm
    ),
    {
        type: "BazValueInput"
    }
)

