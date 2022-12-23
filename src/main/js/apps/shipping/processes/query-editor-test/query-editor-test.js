import {makeObservable, observable} from "mobx";
import QueryEditorTestHome from "./states/QueryEditorTestHome";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{
    return QueryEditorTestHome;
}

//TODO: create this state in query editor for condition editor, use with useMemo
export default class QueryEditorTest {

    @observable
    rootType = "Foo"

    @observable
    editorQuery = {
        columns: null,
        condition: null,
        sort: null
    }

    @observable
    queryConfig = {
        "columns": [
            "roles",
            "login",
            "foos.created"
        ],
        "condition": {
            "type": "Condition",
            "name": "or",
            "operands": [
                {
                    "type": "Condition",
                    "name": "containsIgnoreCase",
                    "operands": [
                        {
                            "type": "Field",
                            "name": "foos.name"
                        },
                        // {
                        //     "type": "Field",
                        //     "name": "foos.num"
                        // },
                        {
                            "type": "Value",
                            "scalarType": "String",
                            "value": "gfd"
                        }
                    ]
                },
                {
                    "type": "Condition",
                    "name": "equal",
                    "operands": [
                        {
                            "type": "Field",
                            "name": "login"
                        },
                        {
                            "type": "Value",
                            "scalarType": "String",
                            "value": "gfdsgfdsxg"
                        }
                    ]
                },
                {
                    "type": "Condition",
                    "name": "equal",
                    "operands": [
                        {
                            "type": "Field",
                            "name": "foos.created"
                        },
                        {
                            "type": "Value",
                            "scalarType": "Date",
                            "value": ""
                        }
                    ]
                }
            ]
        },
        "sort": [
            "login",
            "!foos.num"
        ]
    };


    constructor()
    {
        makeObservable(this)
    }



}
