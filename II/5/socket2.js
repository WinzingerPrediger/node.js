var express = require('express');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var io = require('socket.io');
var path = require('path');
var http = require('http');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(3333, function(){
  console.log('Express server listening on port ' + 3333);
});

io.set("authorization", function(handshake, callback) {
  var cookie;
  if (handshake.headers.cookie) {
    // parse cookie & check validity
    // callback( null, true );
    callback("connection rejected")
  } else {
    // session invalid
    callback( "Kein Cookie vorhanden!" );
  }
})

io.sockets.on('connection', function(socket) {
  console.log("client connected")
  socket.emit('news', { hello: 'world' });
  socket.on('newUser', function(data, confirmation) {
    console.log(data);
    confirmation({result:"user '"+data+"' stored"})
  });
});