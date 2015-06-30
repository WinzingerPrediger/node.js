var soap = require('soap');
var util = require('util')
  
var url = 'http://localhost:8080/HelloWorldService?wsdl';
var args = {firstname: 'node', lastname: 'js'};

var startPerflog = function(logName) {
    var name = logName;
    var start = new Date();
    
    var timestamper = function(msg) {
        var now = new Date();
        console.log(name+": ["+now+"] "+msg+" ("+(now.getTime()-start.getTime())+" msec)");
    }
    return timestamper;
}

var testWebservice = function() {
perflog = startPerflog("ws");
options = {
    endpoint:"https://127.0.0.1:8443/HelloWorldService"
}
soap.createClient("hello.wsdl", options, function(err, client) {
    if (!err) {
        perflog("after create");
        client.setSecurity(new soap.WSSecurity('username', 'password'));
        client.HelloWorld(args, function(err, result) {
            if (!err) {
                perflog("after service call");
                console.log("greeting : "+result.greeting);
                console.log("timestamp: "+result.timestamp);
            } else {
                console.log("Error: "+util.inspect(err));
            }
        })
    } else {
        console.log("Error: "+util.inspect(err));
    }
});
}

testWebservice();
/*
setTimeout(testWebservice, 1000);
setTimeout(testWebservice, 2000);
setTimeout(testWebservice, 3000);
setTimeout(testWebservice, 4000);
*/

