import assert from "power-assert"

describe("Testing", function () {

    it("Mocha is integrated", function () {
        const array = test("x");
        const array2 = test("x", 2);

        console.log({array, array2});

    });

    it("i18n Proxy", function () {

        const t = {};

        t.toValue = (function () {

            return "A";
        }).bind(t);

        console.log(t)

    });
});
