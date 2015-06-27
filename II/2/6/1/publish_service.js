var serviceCallback = {
    HelloWorldService: {
        HelloWorldSOAP12port_http: {
            HelloWorld: function(args) {
                var timestamp = new Date().getTime();
                console.log("Hello World Service called - "+timestamp);
                for (attName in args) {
                    console.log("args."+attName+": "+args[attName]);
                }
                for (attName in arguments) {
                    console.log("arguments."+attName+": "+arguments[attName]);
                }
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

// HTTP Server
var http = require('http');
var server = http.createServer(function(request, response) {
                    console.log("incoming (non-webservice) request: "+request.url);
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.end("some content\n");
                  });
server.listen(8080);


var soap = require('soap');
soapServer = soap.listen(server, '/HelloWorldService', serviceCallback, wsdl);

soapServer.log = function(type, data) {
    console.log("type: "+type); // 'replied', 'received'
    console.log("data: "+data);
};