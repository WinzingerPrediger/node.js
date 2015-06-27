require('nodetime').profile({
    accountKey: 'XXXXX', 
    appName: 'Node Test-App'
  });

var restify = require('restify');

var server = restify.createServer();
var reqCounter = 0;
var magnifier = 1;
var errmagnifier = 1;

server.get('/sample/request', function(req, res, next) {
	reqCounter++;
	console.log("req# "+reqCounter);

    if (reqCounter > 10000) {
    	magnifier = 5;
    }
    if (reqCounter > 20000) {
    	magnifier = 10;
    	errmagnifier = 10;
    }
    if (reqCounter > 30000) {
    	magnifier = 1;
    	errmagnifier = 1;
    }

	r = Math.random();
	var delay = 10;
	if (r < 0.02*errmagnifier) {
		console.log("error");
		res.send(501, "code 501");
  		return next(false);
	}
	if (r > 0.3) {
		delay = 25*magnifier;
	}
	if (r > 0.9) {
		delay = 250*magnifier;
	}
	if (r > 0.95) {
		delay = 500*magnifier;;
	}

 	var client = restify.createJsonClient({
		url: 'http://127.0.0.1:8888'
	});

    var origResponse = res;
    client.get('/sample/service?delay='+delay, function(err, req, res, obj) {
    	req.end();
      	if (err) {
      		// console.log("ERROR: "+err);
      		origResponse.send(500, {
      			"err":err
      		});
      		next(false);
      	} else {
      		// console.log("OK");
      		origResponse.send({
      			"status":"ok"
      		});
      		next();
      	}
	});
})

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});