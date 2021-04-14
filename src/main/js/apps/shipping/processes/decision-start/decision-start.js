import { Process } from "@quinscape/automaton-js";

/**
 *
 * @param {Process} process
 * @param {object} scope
 * @return {{startState: string, states: {ProcessTestHome: {"open-sub": {to: string, action: (function(*): *)}}}}}
 */
export function initProcess(process, scope)
{
    // return process states and transitions
    return (
        {
            startState: t => {

                const { target } = process.input;


                if (target)
                {
                    t.context = target && "Target" + target.toUpperCase() || "Home";
                    t.target = t.context;
                }
                else
                {
                    t.target = "Home" ;
                }
            },
            states: {
                "Home": {
                },
                "TargetA": {
                    "back" : { to : "Home" }
                },
                "TargetB": {
                    "back" : { to : "Home" }
                },
                "TargetC": {
                    "back" : { to : "Home" }
                },
            }
        }
    );
}


export default class DecisionStartScope
{
    
}
