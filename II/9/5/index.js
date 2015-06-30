var restify = require('restify');
var sequence = require('./sequence.js');

var server = restify.createServer();
sequence.initialize(20770);

server.get('/sequence/next', function (req, res, next) {
  res.send({
    "number":sequence.next()
  });
  return next();
});

server.listen((process.env.PORT || 8888), function () {
  console.log('%s listening at %s', server.name, server.url);
});
