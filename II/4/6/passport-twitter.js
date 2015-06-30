var passport 		= require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

passport.use( new TwitterStrategy(
	{
		consumerKey:    TWITTER_CONSUMER_KEY,
		consumerSecret: TWITTER_CONSUMER_SECRET,
		callbackURL:	"http://www.example.com/auth/twitter/callback"
	},
	function(token, tokenSecret, profile, callback) {
		User.findOrCreate(
			// ... ,
			function( err, user ) {
				if (err) {
					return callback( err );
				}
				callback( null, user );
			}
		);
	}
));

app.get(
	'/auth/twitter/callback',
	passport.authenticate(
		'twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}
	)
);