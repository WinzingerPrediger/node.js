var cluster = require('cluster'),
    http    = require('http'),
    numCPUs = require('os').cpus().length;

// Wenn wir im Hauptprozess sind ...
if (cluster.isMaster) {
   cluster.on("fork", function(worker) {
     console.log("worker forked: "+worker.process.pid)
   });
   cluster.on("online", function(worker) {
     console.log("worker online: "+worker.process.pid)
   });
   // ... Prozesse starten
   for (var i = 0; i < numCPUs; i++) {
     cluster.fork();
   }
} else {
   // Hier kommt die eigentliche Applikation
   http.createServer(function(req, res) {
     console.log("received request");
   }).listen(1080, function() {
     console.log("server-instance started by worker #" + cluster.worker.id);
   });
}