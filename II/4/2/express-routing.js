// curl http://localhost:4000/
app.get( '/users', function(req, res) {
	// ...
});

// curl -X POST -H "Content-type: application/json" -d
// '{"user":"Charles"}' http://localhost:4000/users
// curl -X POST -d "user=Charly" http://localhost:4000/users
app.post( '/users', function(req, res) {
	//...
});

// curl -X PUT -H "Content-type: application/json" -d
// '{"user":"Victor"}' http://localhost:4000/users/1
app.put( '/users/:uid', function(req, res) {
	// ...
});

// curl -X DELETE http://localhost:4000/users/1
app.del( '/users/:uid', function(req, res) {
	// ...
});