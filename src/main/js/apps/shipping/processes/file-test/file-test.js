import { observable, computed, action, makeObservable } from "mobx";
import { injection, GraphQLQuery } from "@quinscape/automaton-js";
import Q_FredResource from "./queries/Q_FredResource";
import FileTestHome from "./states/FileTestHome";

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
    return FileTestHome;
}

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

    constructor() {
        makeObservable(this);
    }

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
