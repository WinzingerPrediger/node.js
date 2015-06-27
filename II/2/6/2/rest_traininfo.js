var restify = require('restify');

var htmlFormatter = function(req, res, body) {
    console.log("form");
    return new restify.NotImplementedError("oops, something's missing");
}

options = {
  formatters: {
    'text/html': htmlFormatter
  }
}

var server = restify.createServer(options);

server.use(function(req, res, next) {
  console.log("incoming request");
  return next();
})

server.get({url: '/tt/:bs/tracks', version: '1.0.0'}, function(req, res, next) {
  var tracks = new Array();
  tracks[0] = new Track(17, "37af9");
  tracks[1] = new Track(17, "38af9");
  tracks[2] = new Track(17, "38as1");
  res.send(tracks);
  return next();
})

server.get({url: '/tt/:bs/tracks', version: '2.0.0'}, function(req, res, next) {
  var tracks = new Array();
  tracks[0] = new Track(17, "37af9", "Abschnitt 1");
  tracks[1] = new Track(17, "38af9", "Abschnitt 2");
  tracks[2] = new Track(17, "38as1", "Abschnitt 3");
  res.send(tracks);
  return next();
})

server.listen(8080, function (options) {
  console.log('%s listening at %s', server.name, server.url);
});

// ############

var Track = function(bs, trackId, name) {
  this.bs = bs;
  this.trackId = trackId;
  this.name = name;
}