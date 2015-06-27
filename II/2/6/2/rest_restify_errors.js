var restify = require('restify');

var server = restify.createServer();

server.on("uncaughtException", function (request, response, route, error) {
  console.log("exception!");
  // default behaviour: response.send(error);
  response.send(new restify.ServiceUnavailableError("Unerwartete Fehlersituation"));
});

server.use(function(req, res, next) {
  console.log("incoming request");
  return next();
});

server.get('/error/simple/0', function (req, res, next) {
  res.send("hello, world!");
  return next(false);
});

server.get('/error/simple/1', function (req, res, next) {
  res.send(401, "code 401");
  return next();
  // code 401 returned, server killed in second common handler
});

server.get('/error/simple/2', function (req, res, next) {
  res.send(401, "code 401");
  return next(true);
  // code 401 returned, server killed in second common handler
});

server.get('/error/simple/3', function (req, res, next) {
  res.send(401, "code 401");
  return next(false);
  // code 401 returned, server ok, second common handler not executed
});

server.get('/error/simple/4', function (req, res, next) {
  res.send(401, "code 401");
  return next({'a':3,'b':2});
  // code 401 returned, server killed in second common handler
});

server.get('/error/simple/5', function (req, res, next) {
  res.send(401, "code 401");
  return next(new Error());
  // code 401 returned, server killed in second common handler
});

server.get('/error/simple/6', function (req, res, next) {
  var err = new Error("code 401");
  err.statusCode=401;
  return next(err);
  // code 401 returned, server ok, second common handler not executed
});

server.get('/error/simple/7', function (req, res, next) {
  return next(new Error());
  // code 500 returned, server ok, second common handler not executed
});

server.get('/error/simple/8', function (req, res, next) {
  return next(false);
  // request handling aborted, no response sent
});

server.get('/error/simple/9', function (req, res, next) {
  res.send();
  return next(false);
  // request handling aborted, empty response sent
});

server.get('/error/simple/10', function (req, res, next) {
  // will be intercepted by on("uncaughtException")-eventhandler
  throw new Error("something happened");
});

server.get('/error/simple/11', function (req, res, next) {
  res.statusCode = 201;
  res.send("created something");
  return next(false);
});

server.get('/error/simple/12', function (req, res, next) {
  return next(new restify.PaymentRequiredError("$99", {amount:99,command:'pay me!'}));
});

server.get('/error/simple/13', function (req, res, next) {
  return next(new restify.MissingParameterError("oops, something's missing"));
});

server.use(function(req, res, next) {
  console.log("setting header - end of request handling");
  res.header('Node-Book', 'great stuff');

  return next();
});

server.listen(8080, function () {  
  // dump all errors
  for (name in restify) {
    if (name.search("Error") >= 0) {
      // console.log(name);  
    }
  }
  console.log('%s listening at %s', server.name, server.url);
});
