import assert from "power-assert"

import { get, set, observable, values, toJS } from "mobx"

import { parse } from "graphql/language/parser"

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

});
