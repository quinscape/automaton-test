import { observable, toJS } from "mobx";

import { InteractiveQueryDefinition, InteractiveQueryEditor } from "@quinscape/automaton-js";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "IQEditorHome",
            states: {
                "IQEditorHome": {
                    "store": {
                        action: t => {

                            // retrieve current state as "InteractiveQueryDefinition" instance
                            const def = InteractiveQueryEditor.getInteractiveQueryDefinition("my-editor");

                            // XXX: we just log here, replace with actual store
                            console.log("STORE", toJS(def));
                        }
                    }
                }
            }
        }
    );
};

export default class IQueryEditorScope {
    @observable
//    definition = new InteractiveQueryDefinition(null, null);
    definition = new InteractiveQueryDefinition(
            // language=GraphQL
            `
            query Q_CorgeList($config: QueryConfigInput!)
            {
                iQueryCorge(config: $config)
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
                        id
                        name
                        num
                        corgeLinks{
                            assoc{
                                name
                                num
                            }
                        }
                        owner{
                            login
                        }
                    }
                    rowCount
                }
            }
        `,
        {
            "condition": {
                "type": "Condition",
                "name": "or",
                "operands": [
                    {
                        "type": "Condition",
                        "name": "equal",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "owner.login"
                            },
                            {
                                "type": "Value",
                                "scalarType": "String",
                                "value": "admin"
                            }
                        ]
                    },
                    {
                        "type": "Condition",
                        "name": "equal",
                        "operands": [
                            {
                                "type": "Field",
                                "name": "name"
                            },
                            {
                                "type": "Value",
                                "scalarType": "String",
                                "value": "aaa"
                            }
                        ]
                    }
                ]
            },
            "offset": 0,
            "pageSize": 20,
            "sortFields": []
        }
    );
}
