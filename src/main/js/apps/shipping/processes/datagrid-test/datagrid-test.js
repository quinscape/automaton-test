import {
    observable,
    action, isObservable
} from "mobx";

import {
    injection,
    config,
    createDomainObject,
    storeDomainObject,
    deleteDomainObject,
    backToParent,

    FilterDSL
} from "@quinscape/automaton-js";

import Q_FooType from "./queries/Q_FooType";
import Q_FooDetail from "./queries/Q_FooDetail";
import Q_FooList from "./queries/Q_FooList";


// deconstruct FilterDSL methods
const { field, value } = FilterDSL;


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
                        "new-foo": {
                            to: "CRUDDetail",
                            action: t => {

                                // use empty id to be replaced by a new id server-side (
                                const newObj = createDomainObject("FooInput", "");

                                newObj.name = "Unnamed";
                                newObj.description = null;
                                newObj.num = 0;
                                newObj.flag = false;
                                newObj.created = new Date();
                                newObj.type = "TYPE_A";

                                return scope.updateCurrent(newObj);
                            }
                        },
                        "new-foo-no-ddefaults": {
                            to: "CRUDDetail",
                            action: t => {

                                // use empty id to be replaced by a new id server-side (
                                const newObj = createDomainObject("FooInput", "");

                                // test required
                                newObj.name = null;
                                // test highlevel validation
                                newObj.description = "AAA";
                                newObj.flag = false;
                                newObj.created = new Date();
                                newObj.type = "TYPE_A";

                                // XXX: even though we don't set ownerId here, we won't get an
                                //      revalidation error because there's no field for it
                                
                                return scope.updateCurrent(newObj);
                            }
                        },
                        "to-detail": {
                            to: "CRUDDetail",
                            action: t => {

                                console.log("to-detail, context = ", t.context);

                                return Q_FooDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        t.context
                                                    )
                                                )
                                    }
                                }).then(({iQueryFoo}) => {

                                    if (iQueryFoo.rows.length === 0)
                                    {
                                        alert("Could not load Foo with id '" + t.context)
                                    }
                                    return scope.updateCurrent(config.inputSchema.clone(iQueryFoo.rows[0]));
                                });
                            }
                        }
                    }
                ,
                "CRUDDetail": {
                    "save": {
                        action: t =>
                            storeDomainObject({
                                ... t.context,
                                ownerId:  config.auth.id || "",
                            })
                                .then(() => scope.foos.update())
                                .then(() => t.back(backToParent(t)))
                    },
                    "delete": {
                        to: "CRUDList",
                        discard: true,
                        confirmation: context => `Delete ${context.name} ?`,

                        action: t => {
                            const { id } = t.context;

                            return deleteDomainObject("Foo", id)
                                .then(
                                    didDelete => didDelete && scope.foos.update()
                                )
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

    /** Foo iQuery  */
    @observable
    foos = injection(Q_FooList);

    /**
     *  Example for an iQuery being used to drive a <Select/>
     *
     *  We could just as well define the values as constants in this case
     *
     * const FOO_TYPES = [
     *     "TYPE_A",
     *     "TYPE_B",
     *     "TYPE_C",
     *     "TYPE_D"
     * ];
     *  */
    @observable
    fooTypes = injection(
        Q_FooType
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
