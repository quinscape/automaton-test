import assert from "power-assert"

import { get, set, observable, values } from "mobx"

describe("Testing", function () {

    it("Mocha is integrated", function () {
        const array = test("x");
        const array2 = test("x", 2);

        console.log({array, array2});

    });

    it("mobx ", function () {

        const obj = observable.object({
            name : "Foo",
            subs: [{
                name: "Sub #1"
            },{
                name: "Sub #2"
            }]
        });

        console.log(get(obj, "name"));
        console.log(get(obj, ["subs", 0, "name"]));


    });
});
