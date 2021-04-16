import CollapseHome from "./states/CollapseHome";


/**
 *
 * @param {Process} process
 * @param {object} scope
 * @return {{startState: string, states: {ProcessTestHome: {"open-sub": {to: string, action: (function(*): *)}}}}}
 */
export function initProcess(process, scope) {
    let target;
    const _target = process.input.target;

    target = CollapseHome;
    return target;
}

