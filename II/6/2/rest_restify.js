var restify = require('restify');
var fs = require('fs');
var util = require('util');

var csvFormatter = function(req, res, body) {
  res.setHeader('header-strings', 'excluded');
  
  if (body instanceof Object) {
    retval = "";
    for (attName in body) {
      retval += (attName+","+body[attName]+"\r\n");
    }
    return retval;
  }
}

options = {
  formatters: {
    'text/csv': csvFormatter
  },
  // certificate: fs.readFileSync('server.crt'),  // ACHTUNG: hiermit
  // key: fs.readFileSync('server.key')           // erzwingen wir HTTPS!
};

var server = restify.createServer(options);

server.use(restify.bodyParser({rejectUnknown:true}));
server.use(restify.queryParser());

server.use(function(req, res, next) {
  console.log("incoming request");
  res.header('Node-Book', 'great stuff');
  return next();
});

server.get('/employee/:emp_num/expensereport/:rep_num/receipt/:rec_num', function (req, res, next) {
  console.log(req.params.emp_num);
  console.log(req.params.rep_num);
  console.log(req.params.rec_num);
  res.send(req.params);
  return next();
});

server.del('/employee/:emp_num/expensereport/:rep_num/receipt/:rec_num', function (req, res, next) {
  console.log("deleting entry");
  res.send("deleted");
  return next();
});

server.get({url: '/versioned/service', version: '1.0.0'}, function(req, res, next) {
  console.log("versioned service v1");
  res.send("v1");
  return next();
});

server.get({url: '/versioned/service', version: '2.0.0'}, function(req, res, next) {
  console.log("versioned service v2");
  res.send("v2");
  return next();  
});

server.get({url: '/some/data'}, function(req, res, next) {
  console.log("returning some data to show off formatter");
  res.send({
    "attA":"I'm a",
    "attB":"I'm b",
    "attC":"I'm c",
    "attD":"I'm d"
  });
  return next();  
});

// call http://localhost:8080/echo/john?foo=bar
server.get('/echo/:name', function(req, res, next) {
  res.send({name:req.params.name, foo:req.params.foo});
  return next();
})

server.post('/employee', function (req, res, next) {
  console.log("data: "+req.body);
  res.send(201, "created");
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
