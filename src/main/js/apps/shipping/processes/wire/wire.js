import {
    observable,
    computed,
    action,
    runInAction,
    toJS
} from "mobx";

import {
    injection,
    graphql,
    GraphQLQuery,
    config
} from "@quinscape/automaton-js";

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
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "WireHome",
            states: {
                "WireHome": {
                    "test-target": {
                        action: t =>
                            WireTestQuery.execute(
                                {
                                target: {
                                    ...t.context,
                                    ownerId:
                                        config.auth.id || ""
                                },
                                count: 123
                            })
                            .then(
                                ({ wireTestMutation }) => scope.updateMutationResult(wireTestMutation),
                                err => scope.updateMutationResult(mutationError(err))
                            )
                    }
                }
            }
        }
    );
};

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


    @action.bound
    updateMutationResult(mutationResult)
    {
        this.mutationResult = mutationResult;
    }
}
