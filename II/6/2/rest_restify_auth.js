var restify = require('restify');
var fs = require('fs');

options = {
  certificate: fs.readFileSync('server.crt'),
  key: fs.readFileSync('server.key')
};

var server = restify.createServer(options);

server.use(function(req, res, next) {
  console.log("### incoming request");
  res.header('Node-Book', 'great stuff');
  return next();
});

var auth = require('http-auth');

var basic = auth({
    authRealm : "secure stuff",
    // nodeuser/nodepassword
    authList : ['nodeuser:{SHA}u3/O9Eeb95tx3I2OyK3By5hH3yI=']
});

server.use(function(req, res, next) {
  basic.apply(req, res, function(username) {
        console.log(username + " did log in");
        console.log("authenticated request");
        res.header('Node-Book', 'great stuff');
        req.authenticatedUser = username;
        return next();
  });
  console.log("access not granted");
  return next(false);  
});

server.get('/secure/resource', function (req, res, next) {
  res.send('welcome to my private parts, '+req.authenticatedUser);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
