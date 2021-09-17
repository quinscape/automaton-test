import { action, observable, makeObservable } from "mobx";
import { InteractiveQueryDefinition, InteractiveQueryEditor, graphql, getFirstValue, getIQueryPayloadType } from "@quinscape/automaton-js";
import IQEditorHome from "./states/IQEditorHome";
import Q_IQEditorExample from "./queries/Q_IQEditorExample";

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return IQEditorHome;
}

export default class IQueryEditorScope {
    @observable
    //definition = new InteractiveQueryDefinition(null, null);
    definition = new InteractiveQueryDefinition(
        Q_IQEditorExample.query,
        Q_IQEditorExample.defaultVars
    );


    //////////////////////////////////// Query Testing ////////////////////////////////////


    @observable
    queryResult = null;
    @observable
    queryId = 0;
    @observable
    fields = new Set();

    constructor() {
        makeObservable(this);
    }

    @action
    setQueryResult(queryResult)
    {
        this.queryResult = queryResult;
        this.queryId++;
    }


    testQuery()
    {

        // retrieve current state as "InteractiveQueryDefinition" instance
        const def = InteractiveQueryEditor.getInteractiveQueryDefinition("my-editor");

        //console.log(toJS(def));

        return graphql({
            query: def.query,
            variables: {
                config: def.queryConfig
            }
        }).then(result => {
            const iQuery = getFirstValue(result);
            this.setQueryResult(iQuery);
        })

    }
}
