import {
    observable,
    computed,
    action,
    runInAction,
    toJS
} from "mobx"

import {
    injection,
    graphql,
    GraphQLQuery,
    config
} from "@quinscape/automaton-js"

import Q_FredResource from "./queries/Q_FredResource"
import Q_FredFile from "./queries/Q_FredFile"
import Q_updateFredResource from "./queries/Q_updateFredResource"
import Q_updateFredFile from "./queries/Q_updateFredFile"

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
            startState: "FileTestHome",
            states: {
                "FileTestHome": {
                    "get-resource": {
                        action: t =>
                            Q_FredResource.execute()
                            .then(
                                ({ getFredResource : fred }) => scope.updateFred(fred)
                            )
                    },
                    "get-file": {
                        action: t =>
                            Q_FredFile.execute()
                            .then(
                                ({ getFredFile : fred }) => scope.updateFred(fred)
                            )
                    },
                    "update-resource": {
                        action: t => Q_updateFredResource.execute({ fred: t.context })
                    },
                    "update-file": {
                        action: t => Q_updateFredFile.execute({ fred: t.context })
                    }
                }
            }
        }
    );
};

export default class FileTestScope {

    /**
     * We use a counter as a key for our form since we have no id and also want to be able to re-query an object
     * @type {number}
     */
    @observable
    counter = 0;

    /** Inject fred via resource mechanism */
    @observable
    currentFred = injection(
        Q_FredResource
    );

    @action
    updateFred(fred)
    {
        this.currentFred = fred;
        this.counter++;
    }

    @action
    addItem()
    {
        this.currentFred.items.push({
            name: "Unnamed Item",
            value: 0,
            flag: false
        })
    }

    @action
    removeItem(index)
    {
        this.currentFred.items.splice(index, 1);
    }
}
