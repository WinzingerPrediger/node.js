app.use(
	connect.multipart( { uploadDir:'./tmpUploadDir' } );
);

app.use(
	function(req, res) {
		if (req.method === 'POST') {
			res.writeHead( 200, {'Content-Type' : 'text/html'} );
			res.end( 'Filename: ' + req.files.myfile.name );
		} else {
			res.writeHead( 200, {'Content-Type' : 'text/html'} );
			res.end(
				'<form method="post" enctype="multipart/form-data">' +
				'<input type="file" name=" myfile " />' +
				'<input type="submit" value="upload file"/>'+ '</form>'
			);
		}
	}).listen(3000);
