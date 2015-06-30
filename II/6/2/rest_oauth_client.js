var OAuth= require('oauth').OAuth;

var twitterConsumerKey = "abc";
var twitterConsumerSecret = "123";

var twitterAccessToken = "token";
var twitterAccessTokenSecret = "tokenSecret";

oAuth= new OAuth(
  "http://twitter.com/oauth/request_token",
  "http://twitter.com/oauth/access_token", 
  twitterConsumerKey, twitterConsumerSecret, 
  "1.0A", null, "HMAC-SHA1"
);

oAuth.post(
  "http://api.twitter.com/1/statuses/update.json",
  twitterAccessToken, twitterAccessTokenSecret,
  {"status":"Need somebody to love me!"},
  function(error, data) {
    if(error) console.log(require('sys').inspect(error))
    else console.log(data)
  }
);