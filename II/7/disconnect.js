var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
   cluster.on("online", function(worker) {
     console.log("worker online: "+worker.process.pid)
   });
   cluster.on("disconnect", function(worker) {
     console.log("worker disconnected: "+worker.process.pid)
   });

   for (var i = 0; i < numCPUs; i++) {
     cluster.fork();
   }

   for (id in cluster.workers) {
     console.log("worker #"+id+" -> "+cluster.workers[id].process.pid);
   }

   setTimeout(function() {
     console.log("now shutting down ...")
     cluster.disconnect(function() {
       console.log("all workers shut down")
     })
   }, 5000)
} else {
   // do nothing
   console.log("PID: "+process.pid)
}