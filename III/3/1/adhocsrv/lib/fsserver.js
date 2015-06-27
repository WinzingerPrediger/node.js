var fs = require("fs");

var dump_info = function() {
  console.log("used start.js (srv) to execute");
  console.log("program-arguments: "+process.argv);
  console.log("working-dir      : "+process.cwd());
  console.log("skript-dir       : "+__dirname);
  console.log("skript-file      : "+__filename);

  fs.readdir(".", function(err, files) {
    console.log(files);
  })
}

var internalCounter = 5;

var sayHello_internal = function() {
  console.log("Hello, World!");
}

var incrementCounter_internal = function() {
  internalCounter++;
}
var getCounter_internal = function() {
  return internalCounter;
}

module.exports = {
  dump_info : dump_info,
  sayHello : sayHello_internal,
  moduleCounter : internalCounter,
  incrementCounter : incrementCounter_internal,
  getModuleCounter : getCounter_internal
}