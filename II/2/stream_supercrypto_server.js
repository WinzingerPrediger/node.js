var http = require("http");
var mystreams = require("./stream_examples.js");

var server = http.createServer(function (req, res) {
	var supercrypto = mystreams.createSupercryptoStream({rotate:1});

	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.write('<html><body><p>');

    
	req.pipe(supercrypto).pipe(res, {end: false});
	
	
	supercrypto.on('end', function() {
		res.end('</p></body></html>');
	});
});
server.listen(8000);