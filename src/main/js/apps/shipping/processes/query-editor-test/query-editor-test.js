import { action, makeObservable, observable } from "mobx"
import QueryEditorTestHome from "./states/QueryEditorTestHome";
import QueryTestCases from "../../../../data/condition/test-cases.json"

import {config, QueryEditor, ViewState, createTreeRepresentationForInputSchema, decompileFilter} from "@quinscape/automaton-js";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{
    return QueryEditorTestHome;
}


function getDefaultFieldsForType(rootType)
{
    const inputSchema = config.inputSchema
    const typeDef = inputSchema.getType(rootType)
    if (!typeDef)
    {
        throw new Error("Invalid output type" + rootType);
    }

    const nameFields = inputSchema.getTypeMeta(rootType, "nameFields")
    if (nameFields)
    {
        return nameFields;
    }

    if (typeDef.fields.some( fd => fd.name === "name"))
        return ["name"]

    return []
}


//TODO: create this state in query editor for condition editor, use with useMemo
export default class QueryEditorTest {

    @observable
    rootType = "Foo"

    @observable
    counter = 0

    @observable
    queryConfig = null;


    constructor()
    {
        makeObservable(this)

        this.loadTestcase(QueryTestCases.AppUser)
    }


    @action
    loadTestcase(testCase)
    {

        let {
            rootType,
            fields : select =  getDefaultFieldsForType(testCase.rootType),
            condition : where,
            sort = getDefaultFieldsForType(testCase.rootType)
        } = testCase

        this.rootType = rootType;


        this.queryConfig = {
            select,
            where,
            sort
        }

        this.counter++;
    }


}
