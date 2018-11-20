import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    type
} from "automaton-js";


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "FooList",
            states: {
                "FooList":
                    {
                        "to-detail": {
                            to: "FooDetail",
                            action: t => {
                                scope.currentFoo = t.context;
                            }
                        }
                    }
                ,
                "FooDetail": {
                    "save": {
                        to: "FooList",
                        action: t => {

                            console.log("Transition 'save': ", toJS(t.context))
                        }
                    },
                    "cancel": {
                        to: "FooList",
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
    @type("Foo")
    currentFoo = null;

    /** Current todos */
    @observable
    @type("PagedFoo")
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
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
