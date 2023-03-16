import { action, makeObservable, observable } from "mobx"
import QueryEditorTestHome from "./states/QueryEditorTestHome"
import QueryTestCases from "../../../../data/condition/test-cases.json"

import { config } from "@quinscape/automaton-js"
import { Type } from "@quinscape/automaton-js/filter"


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{
    return QueryEditorTestHome;
}


function getFieldsFromCondition(consumer, condition)
{
    const { type, name } = condition;

    if (type === Type.FIELD)
    {
        consumer(name)
    }
    else if (type === Type.CONDITION || type === Type.OPERATION)
    {

        const { operands } = condition;

        for (let i = 0; i < operands.length; i++)
        {
            getFieldsFromCondition(consumer, operands[i])
        }
    }
    else if (type === Type.COMPONENT)
    {
        const { condition : component } = condition;
        getFieldsFromCondition(consumer, condition)
    }
}


function getDefaultFieldsForType(rootType, condition)
{
    const inputSchema = config.inputSchema
    const typeDef = inputSchema.getType(rootType)
    if (!typeDef)
    {
        throw new Error("Invalid output type" + rootType);
    }

    let fields;

    const nameFields = inputSchema.getTypeMeta(rootType, "nameFields")
    const fieldsFromCondition = new Set()

    if (nameFields)
    {
        nameFields.forEach(n => fieldsFromCondition.add(n) );
    }
    else if (typeDef.fields.some( fd => fd.name === "name"))
    {
        fieldsFromCondition.add("name")
    }
    else
    {
        fieldsFromCondition.add("id")
    }

    if (condition)
    {
        getFieldsFromCondition(n => fieldsFromCondition.add(n), condition)
    }

    return Array.from(fieldsFromCondition)
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
            fields : select =  getDefaultFieldsForType(testCase.rootType, testCase.condition),
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
