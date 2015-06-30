var connect		= require('connect');

var app 	= connect()
				.use( connect.favicon() )
				.use( connect.logger() )
				.use( function( request, response ) {
					response.writeHead(200, {"Content-Type": "text/plain"});
					response.end("Hello, World!\n");
				})
				.listen( "3000" );

