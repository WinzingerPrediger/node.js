var http = require("http")
var util = require("util")

var server = http.createServer(function (req, res) {
  console.log("incoming request for "+util.inspect(req.url));
  res.end("Hello, World! This is Node.js!");
})

server.on("error", function(err) {
  console.error("oops, something went wrong: "+err);
})

server.listen(9999, function() {
  console.log("server up & running");
});