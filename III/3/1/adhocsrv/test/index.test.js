var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

describe("testing public interface", function() {
  var adhocsrv = require("../lib");
  it("module should be loaded", function() {
  	adhocsrv.should.be.a("object");
  });
  it("dump_info should be present", function() {
  	expect(adhocsrv.dump_info).to.be.a("function");
  });
});
