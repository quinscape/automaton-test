import { observable, computed, action } from "mobx";
import { injection, GraphQLQuery } from "@quinscape/automaton-js";
import CRUDList from "./states/CRUDList";

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
export function initProcess(process, scope) {
    return CRUDList;
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
