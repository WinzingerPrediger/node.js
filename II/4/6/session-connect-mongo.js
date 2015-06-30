// Verbindung über URL
var option1	= { url: 'mongodb://localhost:27017/ticket' };

// Verbindung über direkte Parameter
var option2	= {
				host:    'localhost',
				port:    27017,
				db:      'ticket'
			  };

// express 3.x
var MongoStore = require('connect-mongo')(express);
app.use( express.session({
	secret:	'secret',
	store: 	new MongoStore(option1)
}));

// express 4.x
var appSession = require('express-session'),
	MongoStore = require('connect-mongo')(appSession);

app.use( appSession({
	secret: '',
	store: 	new MongoStore(option1)
}));
