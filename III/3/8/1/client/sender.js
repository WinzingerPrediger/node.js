var vertx = require('vertx');
var console = require('vertx/console');

var bus = vertx.eventBus;
var greetings = ['hello', 'ola', 'guten tag', 'bonjour', 'hallo', 'buenas dias', 'hi', 'salut'];

vertx.setPeriodic(1000, function() {
	var currentTimestamp = Math.round(Math.round(new Date().getTime() / 1000));
	var index = Math.floor(Math.random() * greetings.length);
	var message = {timestamp:currentTimestamp, text:greetings[index]};
	bus.publish('test.address', message);
    console.log('[SENDER   (JavaScript)] sent message: '+JSON.stringify(message));
})