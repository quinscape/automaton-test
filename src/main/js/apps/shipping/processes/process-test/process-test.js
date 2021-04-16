import { observable, computed, action } from "mobx";
import ProcessTestHome from "./states/ProcessTestHome";

// noinspection JSUnusedGlobalSymbols
/**
 *
 * @param {Process} process
 * @param {object} scope
 * @return {{startState: string, states: {ProcessTestHome: {"open-sub": {to: string, action: (function(*): *)}}}}}
 */
export function initProcess(process, scope) {
    let target, context;

    context = {
        "accepted": "2017-10-17T22:00:00.000Z",
        "customer": {
            "salutation": null,
            "name": "Lukas Mustermann"
        },
        "id": "d734579f-0b0a-4ab6-9ad5-45f4ee29efb1",
        "number": "B00000001",
        "shippingType": {
            "name": "STANDARD"
        },
        "status": "PAID",
        "num": 12345
    };

    target = ProcessTestHome;
    return target;
}


export default class ProcessTestScope {

    @observable
    currentOrder = null;
}
