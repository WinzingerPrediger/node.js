var serviceCallback = {
    HelloWorldService: {
        HelloWorldSOAP12port_http: {
            HelloWorld: function(args) {
                var timestamp = new Date().getTime();
                console.log("Hello World Service called - "+timestamp);
                for (attName in args) {
                    console.log(attName+": "+args[attName]);
                }
                // return "hallo, "+args.greet+"! - "+timestamp;
                return {
                    greeting:"hello, "+args.firstname+" "+args.lastname+"!",
                    timestamp:timestamp
                };
            }

        }
    }
}

var fs = require('fs');
var wsdl = fs.readFileSync('hello.wsdl', 'utf8');

// HTTPS Server
var https = require('https');
var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};
var server = https.createServer(options, function(request, response) {
                    console.log("incoming (non-webservice) request: "+request.url);
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.end("some content\n");
                  });
server.listen(8443);

var soap = require('soap');
soapServer = soap.listen(server, '/HelloWorldService', serviceCallback, wsdl);

soapServer.log = function(type, data) {
    console.log("type: "+type); // 'replied', 'received'
    console.log("data: "+data);
};

soapServer.authenticate = function(security) {
  console.log("inside authenticate");

  user = security.UsernameToken.Username;
  password = security.UsernameToken.Password;

  console.log("> "+user);
  console.log("> "+password);

  return true;
};

soapServer.authorizeConnection = function(requestIP) {
  console.log("requesting IP: "+requestIP);
    
  return true;
}
