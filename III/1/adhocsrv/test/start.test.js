var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var start = require("../lib/start.js");

describe("tests visibility", function() {
  it("fss should not be accessible", function() {
  	expect(start.fss).not.to.be.a("object");
  });
});