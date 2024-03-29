import { observable, computed, action, makeObservable } from "mobx";

import {
    injection
} from "@quinscape/automaton-js";


export default class Foo {
    @observable id;

    @observable name;

    @observable created;

    @observable num;

    @observable description;

    @observable type;

    @observable flag;

    @observable owner;

    constructor() {
        makeObservable(this);
    }

    @computed get code()
    {
        return this.name + ":" + this.num + ":" + this.type
    }
}
