mocha.setup('bdd');

describe("validation", function() {
    it ("should pass for non-digit, lowercase", function() {
        if (doValidate("abc") != true) {
            throw new Error("validation failed");
        }
    })
    it ("should fail for digits", function() {
        if (doValidate("abc1") != false) {
            throw new Error("validation failed");
        }
    })
    it ("should fail for uppercase", function() {
        if (doValidate("ABC") != false) {
            throw new Error("validation failed");
        }
    })
    it ("should fail for special characters", function() {
        if (doValidate("abc@") != false) {
            throw new Error("validation failed");
        }
    })
})

mocha.run();