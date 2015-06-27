var util = require("util");
var mystreams = require("./stream_examples.js");

var rs = mystreams.createRandomizerStream({lower:1,upper:10});


rs.on("readable", function() {
	console.log("ready to read");
	/**/
	console.log("reading 10k into buf");
	buffer = rs.read(10000);
	console.log("buf-len: "+buffer.length);
	/*
	for (i=0; i<buffer.length; i++) {
		console.log("::"+buffer.readUInt8(i));
	}
	*/
});

rs.on("warning", function(msg) {
	// console.log("got a warning: "+msg);
});

rs.on("end", function() {
	console.log("ran out of random numbers");
});
