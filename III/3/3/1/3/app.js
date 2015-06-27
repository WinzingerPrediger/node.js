var forever = require("forever");

// fp = forever.start("app1.js", {max:2});

forever.list(false, function(err, data) {
  // console.log(data)
})

var emitter		= forever.stopAll(false);
	emitter.on( "stopAll", function(data) {
		console.log(data)
		// Hier sind alle Prozesse beendet
	});

/*
fp.on("restart", function() {
  console.log("process restarted");
})
fp.on("exit", function() {
  console.log("process exited");
})
*/