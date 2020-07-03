import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    config,
    storeDomainObject,
    deleteDomainObject,
    GraphQLQuery,
    backToParent
} from "@quinscape/automaton-js";

// language=GraphQL
const CreateFooMutation = new GraphQLQuery(`
    mutation createFoo($name: String!){
         createFoo(name: $name)
         {
             id
             name
             num
             created
             owner{
                 login
             }
             type
             flag

        }
    }
    `
);


// language=GraphQL
const ComplexStoreMutation = new GraphQLQuery(`
    mutation complexStore($container: ComplexContainerInput)
    {
        complexStore(container : $container)
    }
    `
);


// language=GraphQL
const GetFoosQuery = new GraphQLQuery(`
    query getFoos{
        getFoos{
            rows{
                id
                name
                num
                created
                description
                owner{
                    login
                }
                type
                flag

            }
            rowCount
        }
    }
    `
);


// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config
    //process.versioningStrategy = name => false;

    // return process states and transitions
    return (
        {
            startState: "CRUDList",
            states: {
                "CRUDList":
                    {
                        "new-foo": {
                            to: "CRUDDetail",
                            action: t =>
                                CreateFooMutation.execute({
                                    name: "Unnamed Foo"
                                })
                                .then(
                                    ({ createFoo }) =>
                                        scope.updateCurrent(createFoo)
                                )

                        },
                        "to-detail": {
                            to: "CRUDDetail",
                            action: t => {
                                scope.currentFoo = config.inputSchema.clone(t.context);
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
                            .then(() => GetFoosQuery.execute())
                            .then(({getFoos}) => scope.updateFoos(getFoos))
                            .then(() => t.back(backToParent(t)))
                    },
                    "complex-save": {
                        action: t =>
                            storeDomainObject({
                                foo: t.context,
                                other: node
                            })
                            .then(() => GetFoosQuery.execute())
                            .then(({getFoos}) => scope.updateFoos(getFoos))
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
                                    didDelete => didDelete && scope.removeFoo(id)
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
                    description
                    owner{
                        login
                    }
                    type
                    flag
                    
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
