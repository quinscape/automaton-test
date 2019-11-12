import {
    observable,
    action
} from "mobx";

import {
    injection,
    config,
    createDomainObject,

    FilterDSL,
    WorkingSet
} from "@quinscape/automaton-js";
import Q_FooList from "../datagrid-test/queries/Q_FooList";
import Q_FooDetail from "../datagrid-test/queries/Q_FooDetail";
import Q_FooType from "../datagrid-test/queries/Q_FooType";

// deconstruct FilterDSL methods
const {field, value} = FilterDSL;


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "WSTestList",
            states: {
                "WSTestList": {
                    "new-foo": {
                        action: t => {

                            const newObj = createDomainObject("Foo");

                            newObj.name = "Unnamed Foo";
                            newObj.description = "";
                            newObj.num = 0;
                            newObj.flag = false;
                            newObj.created = new Date();
                            newObj.type = "TYPE_A";
                            newObj.ownerId = config.auth.id;

                            scope.workingSet.addNew(newObj);
                            scope.updateCurrent(newObj);

                            //console.log("new-foo", newObj)

                        }
                    },
                    "edit-foo": {
                        action: t => {

                            const id = t.context;

                            //console.log("edit-foo, context = ", id);

                            // Either edit the working set instance...
                            const entry = scope.workingSet.lookup("Foo", id);
                            if (entry)
                            {
                                scope.updateCurrent(entry.domainObject)
                            }
                            else
                            {
                                // ... or query the detail object
                                return Q_FooDetail.execute({
                                    config: {
                                        condition:
                                            field("id")
                                                .eq(
                                                    value(
                                                        "String",
                                                        id
                                                    )
                                                )
                                    }
                                }).then(({iQueryFoo}) => {

                                    if (iQueryFoo.rows.length === 0)
                                    {
                                        alert("Could not load Foo with id '" + t.context)
                                    }
                                    scope.updateCurrent(iQueryFoo.rows[0]);
                                });
                            }

                        }
                    },
                    "revert-foo": {
                        action: t => {
                            scope.workingSet.revert(t.context)
                        }
                    },
                    "delete-foo": {
                        action: t => {
                            scope.workingSet.markDeleted(t.context);

                            if (scope.currentFoo && scope.currentFoo.id === t.context.id)
                            {
                                scope.updateCurrent(null);
                            }
                        }
                    },
                    "save-all": {
                        action: t => {
                            scope.workingSet.persist()
                                .then(() => {
                                    scope.foos.update();
                                });
                        }
                    },
                    "revert-all": {
                        discard: true,
                        confirmation: context => `Revert all changes?`,

                        action: t => {
                            scope.workingSet.revertAll();
                        }
                    }
                }
            }
        }
    );
}


export default class WorkingSetTestScope {

    workingSet = new WorkingSet();

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
        this.foos.rows = this.foos.rows.filter(foo => foo.id !== id);
    }


    @action
    updateCurrent(foo)
    {
        this.currentFoo = foo;
    }
}
