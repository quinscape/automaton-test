import { observable, computed, action, makeObservable } from "mobx";
import { injection, GraphQLQuery } from "@quinscape/automaton-js";
import WireHome from "./states/WireHome";

// language=GraphQL
const WireTestQuery = new GraphQLQuery(`
    mutation testMutation($target: FooInput!, $count: Int!){
        wireTestMutation(input : $target, count: $count)
        {
            id
            created
            check
        }
    }`
);


function mutationError(err)
{
    return {
        id: "ERROR",
        created: new Date(),
        check: String(err)
    };
}


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return WireHome;
}

export default class WireTestScope {
    /** Current todos */
    @observable
    complex = injection(
        // language=GraphQL
            `{
                getFoos(limit: 2){
                    rowCount
                    rows {
                        id
                        name
                        num
                        created
                        type
                    }
                }
            }`
    );

    @observable mutationResult = null;

    @observable
    scalar = injection(
        // language=GraphQL
            `{
                queryWithScalar
            }`
    );

    @observable
    list = injection(
        // language=GraphQL
            `{
                queryWithList
            }`
    );

    @observable
    complexList = injection(
        // language=GraphQL
            `{
                queryWithComplexList{
                    id
                    name
                    num
                    type
                    created
                }
            }`
    );


    constructor() {
        makeObservable(this);
    }


    @action.bound
    updateMutationResult(mutationResult)
    {
        this.mutationResult = mutationResult;
    }
}
