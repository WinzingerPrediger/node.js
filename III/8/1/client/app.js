var container = require('vertx/container');

container.deployVerticle('sender.js');
container.deployVerticle('pkg/Receiver.java');