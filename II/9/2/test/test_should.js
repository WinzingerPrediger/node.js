var sequence = require("../sequence.js")
var should = require('chai').should()


describe("sequence", function() {
    it ("should have a member called 'initialize'", function() {
        sequence.should.have.property('initialize');
    })
    it (".initialize should be a function", function() {
        sequence.should.respondTo('initialize');
    })
    it ("should have a member called 'foobar'", function() {
        sequence.should.have.property('foobar');
    })
    it (".foobar should be a function", function() {
        sequence.should.respondTo('foobar');
    })
})
