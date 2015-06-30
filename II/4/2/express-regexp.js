app.get( '/users/:id([0-9]{3})', function(req, res) {
	var id = req.params.id;
	// ...
});

// curl http://localhost:4000/users/1-20
app.get( /^\/users\/(\d+)-(\d+)$/, function(req, res) {
	var from 	= req.params[0],
		to 		= req.params[1];

	res.send( "users from:" + from + " to:" + to );
});