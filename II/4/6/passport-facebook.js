var passport           = require('passport'),
	FacebookStrategy   = require('passport-facebook').Strategy;

passport.use( new FacebookStrategy(
	{
		clientID:		FACEBOOK_APP_ID,
		clientSecret:	FACEBOOK_APP_SECRET,
		callbackURL:	"http://www.example.com/auth/facebook/callback"
	},
	function( accessToken, refreshToken, profile, callback ) {
		// lookup user in db
		User.findOrCreate(
			{username: username },
			function(err, user) {
				if (err) {
					return callback( err );
				}
				callback( null, user );
			}
		);
	}
));

app.get( '/auth/facebook', passport.authenticate('facebook') );

app.get(
	'/auth/facebook/callback',
	passport.authenticate(
		'facebook',
		{
			successRedirect: '/',
			failureRedirect: '/login'
		}
	)
);

