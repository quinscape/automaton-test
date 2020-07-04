import { observable } from "mobx";


export default class TodoInput {
    /**
     * Unique id
     * @type {number}
     */
    id = Math.random();
    /**
     * Todo title
     * @type {String}
     */
    @observable title;
    /**
     * Is Todo finished?
     * @type {boolean}
     */
    @observable finished = false;

    constructor(title)
    {
        this.title = title || "---";
    }
}
