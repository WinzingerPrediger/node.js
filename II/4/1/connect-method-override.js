// sample request:
// curl -X POST -d "_method=DELETE" http://localhost:3000
var app		= connect()
				.use(connect.bodyParser())
				.use(connect.methodOverride())
				.use(function(req, res) {
					if (req.method == 'DELETE') {
						res.end('HTTP DELETE erfolgte über ein HTTP ' + req.originalMethod);
					} else {
						res.end('HTTP ' + req.method + ' aufgerufen');
					}
				})
				.listen(3000);
