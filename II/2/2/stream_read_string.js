var fs = require("fs");

var options = {
	encoding: "utf8",
	objectMode: true
}
var inStream = fs.createReadStream("sample.txt", options);

inStream.on("open", function() {
	console.log("starting to read");
});


// inStream.setEncoding("utf8");
inStream.on("readable", function() {
	buffer = inStream.read();
	console.log("buffer-type   : "+typeof(buffer));
	console.log("buffer-content: "+buffer);
});

/*
inStream.setEncoding("utf8");
inStream.on("data", function(buffer) {
	console.log("buffer-type   : "+typeof(buffer));
	console.log("buffer-content: "+buffer);
});
*/

inStream.on("end", function() {
	console.log("eof");
});

inStream.on("error", function(e) {
	console.log("something went wrong: "+e);
});


