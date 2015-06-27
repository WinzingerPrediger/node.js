var restify = require('restify');
var util = require('util');

var server = restify.createServer();

server.use(restify.queryParser());

server.use(function(req, res, next) {
  // console.log("incoming request");
  res.header('Node-Book', 'great stuff');
  return next();
});

server.get('/sample/service', function (req, res, next) {
  // console.log("delay: "+req.query.delay);

  setTimeout(function() {
    res.send({
      "delay":req.query.delay
    });
    return next();
  }, req.query.delay);
});

server.listen(8888, function () {
  console.log('%s listening at %s', server.name, server.url);
});