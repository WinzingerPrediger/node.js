var fs = require("fs");
var http = require("http");

var server = http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.write('<html><body><p>');

	inStream = fs.createReadStream("sample.txt");
	inStream.on('error', function (err) {
        res.statusCode = 500;
        res.end(String(err));
    });
	inStream.pipe(res, {end: false});
	inStream.on('end', function() {
		res.end('</p></body></html>');
	});
});
server.listen(8000);