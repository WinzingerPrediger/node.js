var express 	= require('express');

var app 		= express()
					.use( express.favicon() )
					.use( express.logger() )
					.get( '/', function(request, response) {
						response.send('<h1>Hello, World!</h1>');
					})
					.listen("4000");
