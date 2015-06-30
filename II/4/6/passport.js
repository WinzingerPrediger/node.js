var passport	= require("passport"),
	LocalStrat	= require("passport-local").Strategy;

passport.use(
	new LocalStrat(
		function(username, password, callback) {
			// lookup user in db
			User.findOne({username: username }, function(err, user) {
				if (err) {
					return callback( err );
				}
				if (!user) {
					return callback(null, false,
						{message: "user does not exist!"});
				}
				if (!user.validPassword(password)) {
					return callback(null, false,
						{message: "wrong password!"});
				}
				callback( null, user );
			});
		}
	)
);

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser( function( user, callback ) {
	callback( null, user._id );
});
passport.deserializeUser( function( id, callback ) {
	User.findOne( { _id: id }, function( err, user ) {
		callback( err, user );
	});
});

app.post(
	'/login',
	passport.authenticate(
		'local',
		{
			successRedirect:	'/',
			failureRedirect:	'/login',
			failureFlash: 		true
		}
	)
);