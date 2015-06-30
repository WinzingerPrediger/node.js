var app 	= connect()
				.use(connect.cookieParser('top secret'))
				.use(connect.session())
				.use(connect.bodyParser())
				.use(connect.csrf())
				.use(function(req, res) {
					if (req.method === 'GET') {
						res.write('<form method="post">');
						res.write('<input type="hidden" name="_csrf" value="' + req.session._csrf + '" />');
						res.write('<input type="submit" value="click me!"/></form>');
					} else if (req.method === 'POST') {
						res.write('<h1>Ei Guude, wie?!</h1>');
					}
					res.end();
				})
				.listen(3000);
