var sequence = require("../sequence.js")
var assert = require("assert")

describe("sequence", function() {
	it ("should have a function called 'initialize()'", function() {
        assert.equal(typeof sequence.initialize, 'function', "initialize()-function is missing");
	})
	it ("should have a function called 'foobar()'", function() {
        assert.equal(typeof sequence.foobar, 'function', "foobar()-function is missing");
	})
})