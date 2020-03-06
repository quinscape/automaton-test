import React, { useReducer } from "react"
import cx from "classnames"

import { LogoutForm, StyleSwitcher, Tree, FilterDSL, runProcess } from "@quinscape/automaton-js"

import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Row,
    Col
} from "reactstrap"

const {field, value} = FilterDSL;

import CommonNav from "./CommonNav";
import Q_BazList from "../apps/shipping/processes/assoc-entity-test/queries/Q_BazList";
import { Field, Form, Icon, FormLayout } from "domainql-form";
import Q_BazLinkList from "../apps/shipping/processes/assoc-entity-test/queries/Q_BazLinkList";
import Q_ValuesForBaz from "../apps/shipping/processes/tree-test/queries/Q_ValuesForBaz";

import { observer as fnObserver } from "mobx-react-lite";


function getIcon(name, isSelected)
{
    switch(name)
    {
        case "Fish":
            return (
                <Icon className={ cx("fa-fish", isSelected ? "text-white" : "text-primary")}/>
            );
        case "Mammal":
            return (
                <Icon className={ cx("fa-dog", isSelected ? "text-white" : "text-secondary")}/>
            );
        case "Bird":
            return (
                <Icon className={ cx("fa-dove", isSelected ? "text-white" : "text-secondary")}/>
            );
        case "Invertebrate":
            return (
                <Icon className="fa-star"/>
            );
        case "Archaea":
        case "Bacteria":
            return (
                <Icon className="fa-microscope text-danger"/>
            );
        case "Bug":
            return (
                <Icon className={ cx("fa-bug", isSelected ? "text-white" : "text-secondary")}/>
            );
        case "Amphibian":
            return (
                <Icon className="fa-frog text-success"/>
            );
        case "Reptile":
            return (
                <Icon className="fa-turtle text-success"/>
            );
        default:
            //console.log(name);
            return false;
    }
}


const TreeLayout = fnObserver( props => {

    const [ isNavExpanded, toggle ] = useReducer(isNavExpanded => !isNavExpanded, false);

    const { env, children } = props;

    const { scope, config : { contextPath } } = env;

    //console.log({scope, contextPath})

    return (
        <Container
            fluid={ true }
        >
            <Navbar
                id="app-navbar"
                color="primary"
                dark
                expand="md"
            >
                <NavbarBrand
                    href={contextPath + "/"}
                >
                    <i className="brand-icon fab fa-quinscape mr-1"/>
                    Automaton-Test
                </NavbarBrand>
                <NavbarToggler
                    onClick={ toggle }
                />
                <Collapse
                    isOpen={ isNavExpanded }
                    navbar
                >
                    <CommonNav/>
                </Collapse>
            </Navbar>
            <Row>
                <Col md={ 3 }>
                    <Tree
                        id="animal-tree"
                    >
                        {
                            scope.useIndex ? (
                                <Tree.IndexedObjects
                                    values={ scope.nodes }
                                    render={ (row, iSelected) => ( <>{getIcon(row.parent.name, iSelected) } { row.name }</> )}
                                    renderIndex={ letter => ( <b>{ letter + ":" }</b> )}
                                    index={ scope.nodesIndex }
                                    actions={
                                        [
                                            {
                                                label: "Open",
                                                action: row => runProcess("tree-test", {
                                                    type: "Node",
                                                    name: row.name,
                                                    useIndex: scope.useIndex
                                                })
                                            },
                                            {
                                                label: "Action 2",
                                                action: row => console.log("ACTION 2", JSON.stringify(row))
                                            }
                                        ]
                                    }
                                />
                            ) : (
                                <Tree.Objects
                                    values={ scope.nodes }
                                    render={ row => ( row.name )}
                                    actions={
                                        [
                                            {
                                                label: "Open",
                                                action: row => runProcess("tree-test", {
                                                    type: "Node",
                                                    name: row.name,
                                                    useIndex: scope.useIndex
                                                })
                                            },
                                            {
                                                label: "Action 2",
                                                action: row => console.log("ACTION 2", JSON.stringify(row))
                                            }
                                        ]
                                    }
                                />

                            )
                        }
                        <Tree.Folder
                            render={ () => (<React.Fragment> <Icon className="fa-circle text-success mr-1"/>Bazes</React.Fragment>) }
                            query={ Q_BazList }
                            variables={{ config: {}}}
                        >
                            {
                                bazes => (
                                    <Tree.Objects
                                        values={ bazes }
                                        render={ row => ( row.name )}
                                        actions={
                                            [
                                                {
                                                    label: "Open",
                                                    action: row => runProcess("tree-test", {
                                                        type: "Baz",
                                                        name: row.name,
                                                        useIndex: scope.useIndex
                                                    })
                                                },
                                                {
                                                    label: "Action 2",
                                                    action: row => console.log("ACTION 2", JSON.stringify(row))
                                                }
                                            ]
                                        }
                                    >
                                        {
                                            row => (
                                                <Tree.Folder
                                                    query={ Q_ValuesForBaz }
                                                    variables={{
                                                        config: {
                                                            condition: field("bazId").eq(
                                                                value(
                                                                    "String",
                                                                    row.id
                                                                )
                                                            )
                                                        }
                                                    }}
                                                >
                                                    {
                                                        bazValues => (
                                                            <Tree.Objects
                                                                values={ bazValues }
                                                                render={ row => ( row.value.name )}
                                                                actions={
                                                                    [
                                                                        {
                                                                            label: "Open",
                                                                            action: row => runProcess("tree-test", {
                                                                                type: "BazValue",
                                                                                name: row.value.name,
                                                                                useIndex: scope.useIndex
                                                                            })
                                                                        },
                                                                        {
                                                                            label: "Action 2",
                                                                            action: row => console.log("ACTION 2", JSON.stringify(row.value))
                                                                        }
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    }
                                                </Tree.Folder>
                                            )
                                        }

                                    </Tree.Objects>
                                )
                            }
                        </Tree.Folder>
                    </Tree>
                    <hr/>
                    <Form
                        key={ scope.id }
                        value={scope}
                        options={{
                            layout: FormLayout.DEFAULT,
                            isolation: false
                        }}
                    >
                        <Field label="Use Index" name="useIndex" type="Boolean"/>
                    </Form>
                </Col>
                <Col md={ 9 }>
                    {
                        children
                    }
                </Col>
            </Row>
            <hr/>
            <div className="footer">
                <StyleSwitcher/>
                <LogoutForm/>
            </div>
        </Container>
    );
});

TreeLayout.displayName = "TreeLayout";

export default TreeLayout
