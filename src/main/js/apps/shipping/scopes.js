import {
    action,
    observable
} from "mobx";

import { type } from "automaton-js"

export class AppScope
{
    @type("String")
    @observable value = "foo";

}

export class UserScope
{
    @type("String")
    @observable value = "bar";

}

// export class SessionScope {
//     @type("String")
//     @observable value = "baz";
// }
//
//
// export class LocalScope
// {
//     @type("String")
//     @observable value = "qux";
// }
