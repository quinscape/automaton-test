import {
    action,
    observable
} from "mobx";

import { type } from "automaton-js"

export class AppScope
{
    @observable value = "foo";

}

export class UserScope
{
    @observable value = "bar";

}

// export class SessionScope {
//     @observable value = "baz";
// }
//
//
// export class LocalScope
// {
//     @observable value = "qux";
// }
