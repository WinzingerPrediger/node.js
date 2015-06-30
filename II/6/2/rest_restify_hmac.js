var restify = require('restify');
var rest_hmac = require('./rest_hmac.js');

var server = restify.createServer();
var hmac = rest_hmac.createHMAC();

server.use(function(req, res, next) {
  console.log("### incoming request");
  res.header('Node-Book', 'great stuff');
  return next();
});

server.use(function(req, res, next) {
  console.log("hashvalue: "+req.headers["hmac"]);
  console.log("verb     : "+req.method);
  console.log("url      : "+req.url);
  console.log("timestamp: "+req.headers["timestamp"]);
  
  if (hmac.verifyRequest(req)) {
    return next();
  } else {
    res.send(400, new Error('hmac invalid'));
    return next(false);
  }
});

server.get('/some/resource', function (req, res, next) {
  res.send('hello');
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
