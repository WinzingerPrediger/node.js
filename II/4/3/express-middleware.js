var express 		= require('express'),
	app 			= express(),
	bodyParser 		= require('body-parser'),
	cookieParser 	= require('cookie-parser'),
	favicon 		= require('static-favicon'),
	appSession 		= require('express-session');

app.use( favicon() );
app.use( bodyParser() );
app.use( cookieParser("secret") );
app.use(
	appSession({
		secret: "secret",
		store: store
	})
);