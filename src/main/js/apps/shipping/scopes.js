import { action, observable, makeObservable } from "mobx";

export class AppScope
{
    @observable value = "foo";

    constructor() {
        makeObservable(this);
    }
}

export class UserScope
{
    @observable value = "bar";

    constructor() {
        makeObservable(this);
    }
}

// export class SessionScope {
//     @observable value = "baz";
//     constructor() {
//         makeObservable(this);
//     }
// }
//
//
// export class LocalScope
// {
//     @observable value = "qux";
//     constructor() {
//         makeObservable(this);
//     }
// }

export class CommonScope
{
    @observable value = "quux";
    constructor() {
        makeObservable(this);
    }

    init()
    {
        console.log("CommonScope init");
        // can return a promise
        return Promise.resolve()
    }
}
