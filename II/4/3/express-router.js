app.use( cookieParser() );
app.use( bodyParser() );

// routing will be executed right here
app.get( "/", ... );
app.post( "/data", ... );

// middleware to be executed after routing
app.use(function(req, res, next) {
	// ...
});