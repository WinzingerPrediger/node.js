var sequence = require("../sequence.js")
// var assert = require("assert")
var assert = require("chai").assert


describe("sequence", function() {
    it ("should have a function called 'initialize()'", function() {
        // assert.equal(typeof sequence.initialize, 'function', "initialize()-function is missing");
        assert.isFunction(sequence.initialize, "initialize()-function is missing")
    })
    it ("should have a function called 'foobar()'", function() {
        // assert.equal(typeof sequence.foobar, 'function', "foobar()-function is missing");
        assert.isFunction(sequence.foobar, "foobar()-function is missing")
    })
})


/*
describe("sequence", function() {
    it ("should have a member called 'initialize'", function() {
        assert.isDefined(sequence.initialize, "initialize-member is missing")
    })
    it (".initialize should be a function", function() {
        assert.isFunction(sequence.initialize, "initialize is not a function")
    })
    it ("should have a member called 'foobar'", function() {
        assert.isDefined(sequence.foobar, "foobar-member is missing")
    })
    it (".foobar should be a function", function() {
        assert.isFunction(sequence.foobar, "foobar is not a function")
    })
})
*/
