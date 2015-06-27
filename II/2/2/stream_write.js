var fs = require("fs");
var mystreams = require("./stream_examples.js");

var devnull = mystreams.createDevNullStream({overwriteCount:1});

devnull.on("drain", function() {
	console.log("stream drained");
});
devnull.on("finish", function() {
	console.log("stream written");
});

devnull.write("huhu");
devnull.end("aus und vorbei");

// var inStream = fs.createReadStream("testimage.sparseimage");
// inStream.pipe(devnull);
/*
inStream.on("open", function() {
	console.log("starting to read");
});

console.log("new api");
inStream.on("readable", function() {
	buffer = inStream.read();
	bytes += buffer.length;
});

inStream.on("end", function() {
	console.log("eof. read "+bytes+" bytes");
});
*/
