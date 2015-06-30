var connect 	= require('connect');

var app 		= connect()
					.use( function(req, res, next) {
						if (req.url !== '/index') {
							var redirectUrl = 'http://' + req.headers.host + '/index';
							res.writeHead( 301, {'Location' : redirectUrl} );
							return res.end();
						}
						// in case oft the URL matching „/index“ call the next // middleware with „next()“
						next();
					})
					.use( function(req, res) {
						res.end( "requested URL: " + req.url);
					})
					.listen(3000);

/*
// custom-middleware.js
exports.redirect	= function(redirectPath) {
	redirectPath 	= redirectPath || '/index';
	if (redirectPath.indexOf('/') !== 0) {
		redirectPath = '/' + redirectPath;
	}
	return function (req, res, next) {
		if (req.url !== redirectPath) {
			var redirectUrl = 'http://' + req.headers.host + redirectPath;
			res.writeHead(301, {'Location' : redirectUrl});
			return res.end();
		}
		next();
	};
};
*/

/*
var connect = require('connect'),
	custom 	= require('./custom-middleware.js');

var app 	= connect()
				.use( custom.redirect('/home') )
				.use(function(req, res) {
					res.end("Pfad der Anfrage: " + req.url);
				})
				.listen(3000);
*/
