var sequence = require("../sequence.js")

describe("sequence", function() {
	beforeEach(function() {
         console.log("test setup")
	})

    it ("should have a function called 'initialize()'", function() {
        expect(sequence.initialize).not.toBe(undefined);
    })
    xit ("should have a function called 'foobar()'", function() {
        expect(sequence.foobar).not.toBe(undefined);
    })
})