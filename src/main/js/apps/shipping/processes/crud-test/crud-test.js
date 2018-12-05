import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    storeDomainObject,
    deleteDomainObject
} from "automaton-js";



// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "CRUDList",
            states: {
                "CRUDList":
                    {
                        "to-detail": {
                            to: "CRUDDetail",
                            action: t => {
                                scope.currentFoo = t.context;
                            }
                        }
                    }
                ,
                "CRUDDetail": {
                    "save": {
                        to: "CRUDList",
                        action: t => storeDomainObject(t.context)
                    },
                    "delete": {
                        to: "CRUDList",
                        discard: true,
                        action: t => {

                            if (confirm(`Delete ${t.context.name} ?`))
                            {
                                const { id } = t.context;

                                return deleteDomainObject("Foo", id)
                                    .then(
                                        didDelete => didDelete && scope.removeFoo(id)
                                    )
                            }
                        }
                    },
                    "cancel": {
                        to: "CRUDList",
                        discard: true,
                        action: t => {

                            console.log("Transition 'cancel'")
                        }
                    }
                }
            }
        }
    );
}

export default class CRUDTestScope {

    @observable
    currentFoo = null;

    /** Current todos */
    @observable
    foos = injection(
        // language=GraphQL
        `{
            getFoos{
                rows{
                    id
                    name
                     num
                    created
                    owner{
                        login
                    }
                    type 
                    
                }
                rowCount
            }
        }`
    );
    
    @action
    updateFoos(foos)
    {
        this.foos = foos;
    }

    @action
    removeFoo(id)
    {
        this.foos.rows = this.foos.rows.filter( foo => foo.id !== id);
    }

    @action
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
