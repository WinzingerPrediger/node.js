var app 	= connect()
				.use(connect.logger())
				.use(function(req, res) {
					throw new Error("Ooops, something went wrong ...");
				})
				.use(connect.errorHandler())
				.listen(3000);
