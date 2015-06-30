// sample request:
// curl 'http://localhost:3000?greetings=Hello&to=World'
app.use(
	function(req, res) {
		res.end( req.query.greetings + " " + req.query.to );
	}).listen(3000);