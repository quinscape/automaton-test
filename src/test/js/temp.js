import { field, not, value, and, component } from "@quinscape/automaton-js/lib/FilterDSL"
import { DateTime } from "luxon"
import { action, computed, observable, toJS } from "mobx";
import get from "lodash.get";

class MyClass
{
    @observable
    field = "bla";

    @action
    myAction(v)
    {
        this.field = v;
    }

    @computed
    get prop()
    {
        return this.field + "bla";
    }
}


const instance = new MyClass();

instance.myAction("blup");



const nonClassInstance = observable({

        field: "bla"
    }
)


console.log(toJS(instance), toJS(nonClassInstance), instance.prop)
