import {
    observable,
    computed,
    action,
    toJS
} from "mobx";

import {
    injection,
    config,
    storeDomainObject,
    deleteDomainObject,
    GraphQLQuery,
    backToParent
} from "@quinscape/automaton-js";



// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{

    // process config

    // return process states and transitions
    return (
        {
            startState: "ExtFilterHome",
            states: {
                "ExtFilterHome":
                {
                    "to-detail": {
                        to: "ExtFilterDetail",
                        action: t => {
                            scope.currentBar = t.context;
                        }
                    }

                },
                "ExtFilterDetail":
                {
                    "back": {
                        discard: true,
                        to: "ExtFilterHome",
                        action: t => {
                            console.log("Back to Home");
                        }
                    }

                }
            }
        }
    );
}

export const MIN_DATE = new Date("2018-03-01T00:00:00Z");
export const MAX_DATE = new Date("2019-04-30T00:00:00Z");

export default class ExternalDataGridFilterTestScope {

    @observable
    externalFilter = {
        minCreated: MIN_DATE,
        maxCreated: MAX_DATE
    };

    @observable
    currentBar = null;

    /** Current todos */
    @observable
    bars = injection(
        // language=GraphQL
            `query iQueryBar($config: QueryConfigInput!)
            {
                iQueryBar(config: $config)
                {
                    type
                    columnConfig{
                        columnStates{
                            name
                            enabled
                            sortable
                        }
                    }
                    queryConfig{
                        id
                        condition
                        currentPage
                        pageSize
                        sortOrder{
                            fields
                        }
                    }
                    rows{
                        id
                        created
                        name
                        numa
                        numb
                    }
                    rowCount
                }
            }`,
        {
            config: {
                sortOrder: {fields: ["name"]},
                pageSize: 5,
            }
        }
    );


    @action
    updateBars(bars)
    {
        this.bars = bars;
    }


    @action
    removeBar(id)
    {
        this.bars.rows = this.bars.rows.filter(bar => bar.id !== id);
    }


    @action
    updateCurrent(bar)
    {
        this.currentBar = bar;
    }
}
