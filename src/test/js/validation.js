import assert from "power-assert"

import { matchPath } from "../../main/js/services/validation"


describe("High-Level Rule-based Validation", function () {

    describe("matchPath", function () {

        it("matches paths with array index wildcards", function () {

            assert(matchPath(["name"], ["name"]) === true);
            assert(matchPath(["name"], ["num"]) === false)
            assert(matchPath(["fields.*.name"], ["fields.1.name"]) === true)

        });

    });
});
