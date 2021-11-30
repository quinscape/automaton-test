import React from "react";
import { ViewState, i18n, DataGrid, Button, FilterDSL } from "@quinscape/automaton-js";
import { ButtonToolbar, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from "reactstrap";
import { Icon } from "domainql-form";
import AnimalDetail from "./AnimalDetail";

const {
    and,
    field,
    value
} = FilterDSL;

const AnimalGridHome = new ViewState("AnimalGridHome", (process, scope) => ({
    "to-detail": {
        to: AnimalDetail,
        action: t => {
            scope.currentNode = t.context;
        }
    }
}), props => {

    const { env } = props;

    const { scope } = env;

    return (
        <React.Fragment>
            <h1>
                {
                    i18n("Animal Grid Home")
                }
            </h1>

            <ButtonToolbar>

                <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={
                        () => scope.nodes.update({
                            sortFields: ["parent.name", "!name"]
                        })
                    }
                >
                    Sort: parent.name, !name
                </button>

                <button
                    type="button"
                    className="btn btn-success mr-1"
                    onClick={
                        () => scope.nodes.updateCondition(
                            and(
                                field("name")
                                    .containsIgnoreCase(
                                        value(
                                            "b"
                                        )
                                    ),
                                field("parent.name")
                                    .containsIgnoreCase(
                                        value(
                                            "Fish"
                                        )
                                    )
                            ),
                            "animals-grid"
                        )
                    }
                >
                    Filter: 'b, Fish'
                </button>

                <button
                    type="button"
                    className="btn btn-info mr-1"
                    onClick={
                        () => scope.nodes.updateCondition(null, "animals-grid")
                    }
                >
                    Clear Filter
                </button>


            </ButtonToolbar>

            <DataGrid
                id="animals-grid"
                value={ scope.nodes }
            >
                <DataGrid.Column
                    heading={ i18n("Selection") }
                >
                    {
                        node => (
                            <DataGrid.RowSelector
                                id={ node.id }
                                selectedValues={ scope.selectedAnimals }
                            />
                        )
                    }
                </DataGrid.Column>
                <DataGrid.Column name="name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="parent.name" filter="containsIgnoreCase"/>
                <DataGrid.Column name="parent.parent.name" filter="containsIgnoreCase"/>
                <DataGrid.Column
                    heading={ i18n("Action") }
                >
                    {
                        node => (
                            <React.Fragment>
                                <Button className="btn btn-secondary" transition="to-detail" context={ node }>
                                    <Icon className="fa-edit" />
                                    Detail
                                </Button>
                                <DataGrid.RowSelector
                                    id={ node.id }
                                    selectedValues={ scope.selectedAnimals }
                                />
                            </React.Fragment>
                        )
                    }
                </DataGrid.Column>
            </DataGrid>

            <Card color="dark">
                <CardBody>
                    <CardTitle>
                        {
                            i18n("Current Selection")
                        }
                    </CardTitle>
                    <ListGroup>
                        {
                            [ ... scope.selectedAnimals].map( id => (
                                <ListGroupItem
                                    key={ id }
                                    color="light"
                                    size="sm"
                                >
                                    {
                                        id
                                    }
                                </ListGroupItem>
                            ))

                        }
                    </ListGroup>
                </CardBody>
            </Card>
        </React.Fragment>
    );
});

export default AnimalGridHome;
