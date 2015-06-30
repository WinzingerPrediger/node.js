var sequence = require("../sequence.js")
var chai = require('chai')
var should = require('chai').should()

var functionPlugin = function(chai, utils) {
    var Assertion = chai.Assertion;

    utils.addProperty(Assertion.prototype, 'function', function () {
        this.assert(typeof this._obj == 'function',
          'expected #{this} to be a Function',
          'expected #{this} to not be a Function'
        );
    });
};
chai.use(functionPlugin);

describe("sequence", function() {
    it ("should have a member called 'initialize'", function() {
        sequence.should.have.property('initialize');
    })
    it (".initialize should be a function", function() {
        sequence.initialize.should.be.a.function;
    })
    it ("should have a member called 'someInt'", function() {
        sequence.should.have.property('someInt');
    })
    it (".someInt should be a function", function() {
        sequence.someInt.should.be.a.function;
    })
})

