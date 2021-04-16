import { observable, computed, action } from "mobx";
import { injection } from "@quinscape/automaton-js";
import { DateTime } from "luxon";
import ExtFilterHome from "./states/ExtFilterHome";



// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return ExtFilterHome;
}

export const MIN_DATE = DateTime.fromISO("2018-03-01T00:00:00Z");
export const MAX_DATE = DateTime.fromISO("2019-04-30T00:00:00Z");

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
                    columnStates{
                        name
                        enabled
                        sortable
                    }
                    queryConfig{
                        id
                        condition
                        offset
                        pageSize
                        sortFields
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
            config:
            //     {
            //     sortFields: ["name"],
            //     pageSize: 5,
            // }
                {
                    "pageSize": 5,
                    "sortFields": [
                        {
                            "type": "Operation",
                            "name": "desc",
                            "operands": [
                                {
                                    "type": "Operation",
                                    "name": "add",
                                    "operands": [
                                        {
                                            "type": "Field",
                                            "name": "numa"
                                        }, {
                                            "type": "Field",
                                            "name": "numb"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
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

