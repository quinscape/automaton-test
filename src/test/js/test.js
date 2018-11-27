import assert from "power-assert"

import { get, set, observable, values, toJS } from "mobx"


class Test
{
    @observable value = 1;
}

describe("Testing", function () {

    it("Mocha is integrated", function () {
        const array = test("x");
        const array2 = test("x", 2);

        console.log({array, array2});

    });

    it("mobx ", function () {


        const t = new Test();

        t.value = 12;

        const o = toJS(t);

        console.log(o,typeof o, t);



    });
});
