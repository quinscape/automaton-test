import { action, observable, makeObservable } from "mobx";
import { FilterDSL, injection } from "@quinscape/automaton-js";
import Q_Node from "./queries/Q_Node";
import Q_NodeIndex from "./queries/Q_NodeIndex";
import TreeTestNodeDetail from "./states/TreeTestNodeDetail";
import TreeTestBazDetail from "./states/TreeTestBazDetail";
import TreeTestBazValueDetail from "./states/TreeTestBazValueDetail";
import TreeTestHome from "./states/TreeTestHome";
import TreeLayout from "../../../../components/TreeLayout"

// deconstruct FilterDSL methods
const {field, value} = FilterDSL;

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope) {
    let target;

    process.options.layout = { default: TreeLayout };
    
    const name = process.input.name;
    const type = process.input.type;
    const useIndex = process.input.useIndex;

    if (useIndex !== undefined)
    {
        scope.useIndex = useIndex;
    }

    switch(type)
    {
        case "Node":
            target = TreeTestNodeDetail;
            scope.updateCurrent(name);
            break;
        case "Baz":
            target = TreeTestBazDetail;
            scope.updateCurrent(name);
            break;
        case "BazValue":
            target = TreeTestBazValueDetail;
            scope.updateCurrent(name);
            break;
        default:
            target = TreeTestHome;
            break;
    }

    return target;
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

    constructor() {
        makeObservable(this);
    }

    @action
    updateCurrent(name)
    {
        this.currentName = name;
    }
}
