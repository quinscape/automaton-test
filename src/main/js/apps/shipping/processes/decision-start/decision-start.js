import { Process } from "@quinscape/automaton-js";

import Home from "./states/Home";

/**
 *
 * @param {Process} process
 * @param {object} scope
 * @return {{startState: string, states: {ProcessTestHome: {"open-sub": {to: string, action: (function(*): *)}}}}}
 */
export function initProcess(process, scope) {
    let target, context;
    const _target = process.input.target;


    if (_target)
    {
        context = _target && "Target" + _target.toUpperCase() || Home;
        target = context;
    }
    else
    {
        target = Home ;
    }
    return target;
}


export default class DecisionStartScope
{
    
}
