import { observable, computed, action } from "mobx";
import { injection } from "@quinscape/automaton-js";
import AnimalGridHome from "./states/AnimalGridHome";



// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return AnimalGridHome;
}


export default class AnimalGridTestScope {

    @observable
    currentNode = null;

    @observable
    selectedAnimals = new Set([
        "e67fef00-5940-4449-9913-df9a00973c1b",
        "5c36b60c-7dc7-4df1-a1cb-6e7199db62ba"
    ]);

    /** Current todos */
    @observable
    nodes = injection(
        // language=GraphQL
            `query iQueryNode($config: QueryConfigInput!)
            {
                iQueryNode(config: $config)
                {
                    type
                    columnStates{
                        name
                        enabled
                        sortable
                    }
                    queryConfig{
                        id
                        condition
                        offset
                        pageSize
                        sortFields
                    }
                    rows{
                        name
                        id
                        parent{
                            id
                            name
                            parent
                            {
                                name
                            }
                        }

                    }
                    rowCount
                }
            }`,
        {
            config: {
                pageSize: 5,

                // Example of statically predefining a filter in JavaScript.
                // The static evaluation is too stupid to understand the JavaScript Filter DSL at this point
                //
                condition: {
                    "operands": [
                        {
                            "condition": {
                                "operands": [
                                    {
                                        "operands": [
                                            {
                                                "name": "name",
                                                "type": "Field"
                                            },
                                            {
                                                "scalarType": "String",
                                                "type": "Value",
                                                "value": "b"
                                            }
                                        ],
                                        "name": "containsIgnoreCase",
                                        "type": "Condition"
                                    },
                                    {
                                        "operands": [
                                            {
                                                "name": "parent.name",
                                                "type": "Field"
                                            },
                                            {
                                                "scalarType": "String",
                                                "type": "Value",
                                                "value": "Fish"
                                            }
                                        ],
                                        "name": "containsIgnoreCase",
                                        "type": "Condition"
                                    }
                                ],
                                "name": "and",
                                "type": "Condition"
                            },
                            "id": "animals-grid",
                            "type": "Component"
                        }
                    ],
                    "name": "and",
                    "type": "Condition"
                }

            }
        }
    );


    @action
    updateNodes(nodes)
    {
        this.nodes = nodes;
    }


    @action
    removeNode(id)
    {
        this.nodes.rows = this.nodes.rows.filter(node => node.id !== id);
    }


    @action
    updateCurrent(node)
    {
        this.currentNode = node;
    }
}

