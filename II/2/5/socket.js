var express = require('express');

var http = require('http');
var io = require('socket.io');

var app = express();
var server = http.createServer(app);
var ioServer = io.listen(server);
/*
var express = require('express');


var app = express();
var server = require('http').createServer(app).listen(3000);

var io = require("socket.io")(server);
var sio = io.listen(server);
*/
var path = require('path');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found: "'+req.url+'"');
    err.status = 404;
    next(err);
});

ioServer.sockets.on('connection', function(client) {
  console.log('client (re-)connected!');
  client.on('disconnect', function() {
    console.log('client disconnected');
  });
  client.on('newUser', function(data) {
    console.log("new User");
  })
});

server.listen(8080, function(){
    console.log("Express server listening on port " + app.get('port'));
});