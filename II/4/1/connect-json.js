var connect		= require('connect'),
	app 		= connect();

app.use( connect.json() );
app.use( function(req, res) {
		res.end(req.body.greetings + "\n");
	})
	.listen(3000);