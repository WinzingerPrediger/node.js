var sequence = require("../sequence.js")

describe("sequence", function() {
	it ("should have a function called 'initialize()'", function() {
		if (!(typeof sequence.initialize == 'function')) {
			throw new Error("initialize()-function is missing")
		}
	})
	describe(".initialize()", function() {
		it ("should not return a value", function() {
			if (typeof sequence.initialize() != 'undefined') {
				throw new Error("initialize() did return a value")
			}
		})
		it ("should do something else")
	})
	it ("should have a function called 'nextval()'", function() {
		if (!(typeof sequence.nextval == 'function')) {
			throw new Error("nextval()-function is missing")
		}
	})
})