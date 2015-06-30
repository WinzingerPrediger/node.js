var util = require('util');

var generator;

var setGenerator_internal = function(genImpl) {
	generator = genImpl;
}

var getInitialValue_internal = function() {
	if (generator !== undefined) {
		return generator();
	} else {
	    d = new Date();
        return d.getMilliseconds();
	}
}

module.exports = {
    setGenerator : setGenerator_internal,
    getInitialValue : getInitialValue_internal
}