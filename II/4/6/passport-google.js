var passport         = require('passport'),
	GoogleStrategy   = require('passport-google').Strategy;

passport.use( new GoogleStrategy(
	{
		returnURL:	'http://www.example.com/auth/google/callback',
		realm: 		'http://www.example.com/'
	},
	function( identifier, profile, callback ) {
		User.findOrCreate(
			{ openId: identifier },
			function( err, user ) {
				callback( err, user );
			}
		);
	}
));

app.get(
	'/auth/google/callback',
	passport.authenticate(
		'google', {
			successRedirect: '/',
			failureRedirect: '/login'
		}
	)
);