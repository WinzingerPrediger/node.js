var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

describe("testing public interface", function() {
  var fsserver = require("../lib/fsserver.js");
  it("moduleCounter should be present", function() {
  	expect(fsserver.moduleCounter).to.be.a("number");
  });
  it("moduleCounter should initially be 5", function() {
  	expect(fsserver.moduleCounter).to.equal(5);
  });
  it("moduleCounter is different from internalCounter", function() {
    fsserver.moduleCounter++;
  	expect(fsserver.moduleCounter).not.to.equal(fsserver.getModuleCounter());
  });
  it("moduleCounter should be modifiable via function", function() {
    fsserver.incrementCounter();
    fsserver.incrementCounter();
    fsserver.incrementCounter();
  	expect(fsserver.getModuleCounter()).to.equal(8);
  });
});

