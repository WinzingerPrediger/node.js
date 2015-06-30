var http    = require('http');

http.createServer(function(req, res) {
  console.log("received request");
}).listen(1080, function() {
  console.log("server-instance started by worker #" + cluster.worker.id);
});
