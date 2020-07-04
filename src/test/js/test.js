import assert from "power-assert"
import TodoInput from "../../main/js/models/TodoInput";

function test(s, ...args)
{
	return [s,args];
}

describe("Testing", function(){

    it("Mocha is integrated", function()
	{
		const array = test("x");
		const array2 = test("x", 2);

		console.log({array, array2});

	});
});
