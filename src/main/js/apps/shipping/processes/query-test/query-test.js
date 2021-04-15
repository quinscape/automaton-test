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
import Q_BazFoos from "./queries/Q_BazFoos";
import Q_BazWithValues from "./queries/Q_BazWithValues";
import Q_RecursiveNodes from "./queries/Q_RecursiveNodes";

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


import QueryTestHome from "./states/QueryTestHome";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return QueryTestHome;
}

export default class WireTestScope {

    @observable
    bazFoos = injection(
        Q_BazFoos
    );

    @observable
    bazesWithValues = injection(
        Q_BazWithValues
    );

    @observable
    nodes = injection(
        Q_RecursiveNodes
    );

}

