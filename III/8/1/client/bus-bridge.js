var vertx = require('vertx');
var console = require('vertx/console');

var httpServer = vertx.createHttpServer();
var sockJSServer = vertx.createSockJSServer(httpServer);

sockJSServer.bridge({prefix : '/eventbus'}, [{}], [{}] );
httpServer.listen(8080, function() {
	console.log('bridge is now up and running ...')
});