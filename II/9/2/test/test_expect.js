var sequence = require("../sequence.js")
var expect = require('chai').expect


describe("sequence", function() {
    it ("should have a member called 'initialize'", function() {
        expect(sequence).to.have.property('initialize');
        // expect(sequence.initialize).to.not.be.undefined;
        // expect(sequence.initialize).to.exist;
    })
    it (".initialize should be a function", function() {
        expect(sequence).to.respondTo('initialize');
    })
    it ("should have a member called 'foobar'", function() {
        // expect(sequence).to.have.property('foobar');
        expect(sequence.foobar).to.not.be.undefined;
        // expect(sequence.foobar).to.exist;
    })
    it (".foobar should be a function", function() {
        expect(sequence).to.respondTo('foobar');
    })
})
