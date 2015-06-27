var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var greeting = "Hello, World!";
describe('greeting', function() {
  it("should be a string", function() {
    greeting.should.be.a('string');
  });
  it("should have the value 'Hello, World!'", function() {
    greeting.should.equal('Hello, World!');
  });
});

