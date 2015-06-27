var fs = require("fs");

var inStream = fs.createReadStream("testimage.sparseimage");
var bytes = 0;
var useNewApi = true;

inStream.on("open", function() {
	console.log("starting to read");
});

if (useNewApi) {
	// new api
	console.log("new api");
	inStream.on("readable", function() {
		buffer = inStream.read();
		bytes += buffer.length;
	});
} else {
	// old api
	console.log("old api");
	inStream.on("data", function(buffer) {
		buffer = inStream.read();
		bytes += buffer.length;
	});
}

inStream.on("end", function() {
	console.log("eof. read "+bytes+" bytes");
});

