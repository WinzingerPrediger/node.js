var sequence = require("../sequence.js")
var assert = require("chai").assert
var sinon = require("sinon")

var ivg = require("../initialValueGenerator.js")

// let's spy on the initial-value-generator-backend

describe.skip("when calling initialize() without arguments", function() {
    beforeEach(function() {
        sinon.spy(ivg, "getInitialValue");
    })
    afterEach(function() {
        ivg.getInitialValue.restore();
        sequence.reset();
    })
    it ("the initial-value-generator-backend should be called", function() {
        sequence.initialize();
        assert.isTrue(ivg.getInitialValue.called, "initial-value-generator-backend was not called");
    })
})

// now let's stub the backend

describe.skip("when calling initialize() without arguments", function() {
    beforeEach(function() {
        sinon.stub(ivg, "getInitialValue", function() {
            return 18773;
        });
        // sinon.stub(ivg, "getInitialValue").returns(18773);
    })
    afterEach(function() {
        ivg.getInitialValue.restore();
        sequence.reset();
    })
    it ("the initial-value-generator-backend should be called", function() {
        sequence.initialize();
        assert.isTrue(ivg.getInitialValue.called, "initial-value-generator-backend was not called");
    })
    it ("we expect the first value to be 18774", function() {
        sequence.initialize();
        assert.equal(sequence.next(), 18774, "sequence was not correctly initialized/inkremented");
    })
})

// last step let's inject a mocked generator

describe.skip("when calling initialize() without arguments and with a mocked generator", function() {
    var mock;

    beforeEach(function() {
        var myGeneratorAPI = {
            createInitialValue: function () {}
        };
        mock = sinon.mock(myGeneratorAPI);
        mock.expects("createInitialValue").once().returns(20770);
        ivg.setGenerator(myGeneratorAPI.createInitialValue);
    })
    afterEach(function() {
        mock.verify();
        sequence.reset();
    })

    it ("we expect the first value to be 20771", function() {
        sequence.initialize();
        assert.equal(sequence.next(), 20771, "sequence was not correctly initialized/incremented");
    })
})

describe("foo", function() {
    var clock;

    beforeEach(function() {
        var y2kNewYearsEve = new Date(Date.UTC(1999, 11, 31, 23, 59, 59, 0));
        clock = sinon.useFakeTimers(y2kNewYearsEve.getTime());
    })

    afterEach(function() {
        clock.restore();
    })

    it ("bar", function() {
        console.log(new Date().toISOString());
        clock.tick(2345);
        console.log(new Date().toISOString());
        clock.tick(-5000);
        console.log(new Date().toISOString());
    })
})