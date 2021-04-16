import { action, observable } from "mobx";
import { computedFn } from "mobx-utils";
import { FilterDSL, injection, WorkingSet } from "@quinscape/automaton-js";
import Q_CorgeType from "./queries/Q_CorgeType";
import Q_CorgeList from "./queries/Q_CorgeList";
import CorgeList from "./states/CorgeList";

// deconstruct FilterDSL methods
const { field, value } = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    return CorgeList;
}

export default class MergeTestScope {

    /**
     * Construct our working set with the merge config.
     *
     * (See Java class de.quinscape.automaton.model.merge.MergeConfig )
     * @type {WorkingSet}
     */
    workingSet = new WorkingSet({
        typeConfigs: [
            {
                name: "Corge",
                mergeGroups: [
                    {
                        fields: ["num", "num2"]
                    }
                ],
                ignored: ["modified"]
            }
        ],

        allowDiscard: true,
        allowApply: true
    });

    @observable
    currentCorge = null;

    /** Corge iQuery  */
    @observable
    corges = injection(Q_CorgeList);

    @observable
    corgeTypes = injection(Q_CorgeType);
    
    @action
    updateCorges(corges)
    {
        this.corges = corges;
    }

    @action
    removeCorge(id)
    {
        this.corges.rows = this.corges.rows.filter( corge => corge.id !== id);
    }

    @action
    updateCurrent(corge)
    {
        this.currentCorge = corge;
    }

    filter = computedFn((process, transition) =>
    {
        return process.scope.currentCorge.name === "AAA"
    })
}
