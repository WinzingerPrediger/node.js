var cluster = require('cluster');

if (cluster.isMaster) {
  var procNames = ["mercure", "venus", "earth", "mars", "jupiter"];

  cluster.on("disconnect", function(worker) {
    console.log("worker disconnected: "+worker.process.pid)
  });

  for (i=0; i<5; i++) {
  	var env = {
      id   : i,
      name : procNames[i]
  	}
    cluster.fork(env);
  }
} else {
  console.log("worker started");
  console.log("  id  : "+process.env.id);
  console.log("  name: "+process.env.name);

  cluster.worker.disconnect()
}