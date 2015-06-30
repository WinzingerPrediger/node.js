var cluster = require('cluster'),
    http    = require('http'),
    numCPUs = require('os').cpus().length,
    cp      = require('child_process');

ls = cp.spawn("ls");
ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});


for (var i=0; i<3; i++) {
  console.log("master? -> "+cluster.isMaster);
  // console.log("cluster: "+cluster.fork)
  console.log("forking ...");
  cluster.fork();
}

console.log("done");
