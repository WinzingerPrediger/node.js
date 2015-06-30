var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '2'
});

client.get('/tt/17/tracks', function(err, req, res, obj) {
  console.log(JSON.stringify(obj, null, 2));
});