var restify = require('restify');
var my_plugin = require('./rest_log_plugin');

var server = restify.createServer();
var i = 0;


// server.use(my_plugin.logger({prefix:'ralph'}));
// server.use(my_plugin.serverstats({url:'/ping'}));

// 50 threads
// 2 Sekunden durchschnittliche Bearbeitung
// -> im Durchschnitt wird alle 40 Millisekunden ein Thread frei, also 25 pro Sekunde
// Puffer: Füllrate 20 pro Sekunde

server.use(restify.throttle({
  burst: 50,
  rate: 10,
  ip: true
}));


server.get('/ping', function(req, res, next) {
  setTimeout(function() {
    res.send(200, {ping:'pong'});
    return next();
  }, 2000);
})

server.get('/reset', function(req, res, next) {
  i = 0;
  res.send("reset");
  return next();
})

server.listen(8080, function (options) {
  console.log('%s listening at %s', server.name, server.url);
});