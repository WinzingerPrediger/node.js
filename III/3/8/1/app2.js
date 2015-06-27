var vertx = require('vertx');
var container = require('vertx/container');

container.deployVerticle('pkg/Receiver.java', 4);
vertx.setTimer(2000, function() {
	container.deployVerticle('pkg/Sender.java');
});

