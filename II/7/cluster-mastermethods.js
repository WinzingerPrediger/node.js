var cluster = require('cluster');

if (cluster.isMaster) {
   cluster.fork();
} else {
   console.log("isWorker: "+cluster.isWorker);
   console.log("  > fork()       : "+cluster.fork);
   console.log("  > disconnect() : "+cluster.disconnect);
   console.log("  > setupMaster(): "+cluster.setupMaster);
}