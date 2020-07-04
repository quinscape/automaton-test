import {
    observable,
    computed,
    action
} from "mobx";

import TodoInput from "./TodoInput";


export default class TodoListModel {
    @observable todos = [];

    @computed
    get unfinishedTodoCount()
    {
        return this.todos.filter(todo => !todo.finished).length;
    }

    @action
    addTodo(title)
    {
        this.todos.push(new TodoInput(title));
    }
}
