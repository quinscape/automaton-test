import { observable } from "mobx";
import { backToParent } from "@quinscape/automaton-js"

// noinspection JSUnusedGlobalSymbols
export function initProcess(process, scope)
{
    // process config

    // return process states and transitions
    return (
        {
            startState: "BackTestHome",
            states: {
                "BackTestHome": {
                    "to-counter": {
                        to: "BackTestCounter"
                    }
                },
                "BackTestCounter": {
                    "increment": {
                        to: "BackTestCounter",
                        action: t => {
                            scope.currentCounter++;
                        }
                    },
                    "decrement": {
                        to: "BackTestCounter",
                        action: t => {
                            scope.currentCounter--;
                        }
                    },
                    "increment-nv": {
                        to: "BackTestCounter",
                        action: t => {
                            scope.nonVersioned++;
                        }
                    },
                    "decrement-nv": {
                        to: "BackTestCounter",
                        action: t => {
                            scope.nonVersioned--;
                        }
                    },
                    "back": {
                        action: t => {
                            t.back();
                        }
                    },
                    "back-2": {
                        action: t => {
                            t.back(2);
                        }
                    },
                    "back-fn": {
                        action: t => {
                            t.back(
                                backToParent(t)
                            );
                        }
                    },
                    "back-home": {
                        to: "BackTestHome"
                    }
                }
            }
        }
    );
};



class Nested {

    @observable
    value = 0;
}

export default class BackTestScope {

    @observable
    currentCounter = 0;

    @observable
    nonVersioned = 0;

    @observable
    nested = new Nested();
}
