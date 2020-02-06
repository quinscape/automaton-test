import { action, observable } from "mobx";

import { FilterDSL, injection } from "@quinscape/automaton-js";

import TreeLayout from "../../../../components/TreeLayout";
import Q_Node from "./queries/Q_Node";
import Q_NodeIndex from "./queries/Q_NodeIndex";
import uuid from "uuid";

// deconstruct FilterDSL methods
const {field, value} = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{
    // process config
    // XXX: fnObservable() messes with our layout component detection, so we use a map with a single default for now
    process.options.layout = { default: TreeLayout };

    // return process states and transitions
    return (
        {
            startState: t => {

                const { name, type, useIndex } = process.input;

                if (useIndex !== undefined)
                {
                    scope.useIndex = useIndex;
                }

                switch(type)
                {
                    case "Node":
                        t.target = "TreeTestNodeDetail";
                        scope.updateCurrent(name);
                        break;
                    case "Baz":
                        t.target = "TreeTestBazDetail";
                        scope.updateCurrent(name);
                        break;
                    case "BazValue":
                        t.target = "TreeTestBazValueDetail";
                        scope.updateCurrent(name);
                        break;
                    default:
                        t.target = "TreeTestHome";
                        break;
                }

            },
            states: {
                "TreeTestHome":
                    {

                    },
                "TreeTestNodeDetail":
                    {

                    },
                "TreeTestBazDetail":
                    {

                    },
                "TreeTestBazValueDetail":
                    {

                    }
            }
        }
    );
}


export default class TreeTestScope {

    @observable
    nodes = injection(Q_Node);

    @observable
    nodesIndex = injection(Q_NodeIndex);

    @observable
    currentName = null;

    @observable
    useIndex = true;

    // used to ensure we get the correct new "Use Index" Form connected to the current scope on refresh (see TreeLayout.js <Form/> definition)
    // (as opposed to the <Tree/> instance itself which remains mounted )
    id = new Date().toISOString();

    @action
    updateCurrent(name)
    {
        this.currentName = name;
    }
}
