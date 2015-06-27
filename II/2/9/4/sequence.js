var internalCounter = 0;
var sequenceInUse = false;
var initialValue = 0;

var next_internal = function() {
	if (!sequenceInUse) {
		sequenceInUse = true;
	}
	return ++internalCounter;
}

var initialize_internal = function(initialValue) {
	if (sequenceInUse) {
		throw new Error("sequence already in use");
	}
    this.initialValue = initialValue;
	internalCounter = initialValue;
}

var reset_internal = function() {
	internalCounter = initialValue;
}

var useACallback_internal = function(fail, cb) {
	setTimeout(function() {
		if (fail) {
			console.log("about to fail ...");
			throw new Error("callback failed");
		} else {
			cb();
		}
	}, 1000);
}

module.exports = {
  next : next_internal,
  initialize : initialize_internal,
  reset : reset_internal,
  useACallback : useACallback_internal
}