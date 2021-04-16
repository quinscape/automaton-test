import { observable } from "mobx";
import { InteractiveQueryDefinition } from "@quinscape/automaton-js";
import IQEditorHome from "./states/IQEditorHome";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return IQEditorHome;
}

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
