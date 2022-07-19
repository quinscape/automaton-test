import {makeObservable, observable} from "mobx";
import QueryEditorTestHome from "./states/QueryEditorTestHome";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{
    return QueryEditorTestHome;
}

//TODO: create this state in query editor for condition editor, use with useMemo
export default class QueryEditorTest {

    @observable
    rootType = "Foo"

    @observable
    condition = null;


    constructor()
    {
        makeObservable(this)
    }

}
